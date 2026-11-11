import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const script = file => {
  const source = readFileSync(file, 'utf8').match(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/)[1];
  return ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
};
const introScript = script('src/components/SignatureIntro.astro');
const popupScript = script('src/components/CreativeShortcut.astro');
const bootstrap = script('src/layouts/BaseLayout.astro');
function setup({ seen = false, reduce = false, storageFails = false } = {}) {
  const handlers = new Map();
  const timers = new Map();
  const storage = new Map(seen ? [['palash-signature-seen', 'true']] : []);
  let nextTimer = 0;
  const classes = () => { const values = new Set(); return { add: x => values.add(x), remove: x => values.delete(x), contains: x => values.has(x) }; };
  const listen = (key, fn) => { if (!handlers.has(key)) handlers.set(key, []); handlers.get(key).push(fn); };
  const emit = (key, event = {}) => { for (const fn of handlers.get(key) || []) fn(event); };
  const root = { classList: classes() };
  const content = { inert: false };
  const document = { documentElement: root, body: {}, activeElement: null,
    addEventListener: listen, dispatchEvent: e => emit(e.type),
    getElementById: id => id === 'site-content' ? content : main,
    querySelector: selector => ({ '.signature-intro': intro, '.creative-shortcut-wrap': popup })[selector] || null,
  };
  const main = { focus() { document.activeElement = this; } };
  const skip = { addEventListener: (key, fn) => listen('skip:' + key, fn), focus() { document.activeElement = this; } };
  const intro = { classList: classes(), querySelector: () => skip, contains: el => el === skip, addEventListener: (key, fn) => listen('intro:' + key, fn) };
  const popup = { hidden: true, querySelectorAll: () => [], contains: () => false };
  const preference = { matches: reduce, addEventListener: (key, fn) => listen('reduce:' + key, fn) };
  const window = { matchMedia: () => preference, addEventListener: (key, fn) => listen('window:' + key, fn), setTimeout: (fn, ms) => { timers.set(++nextTimer, { fn, ms }); return nextTimer; } };
  const context = vm.createContext({ document, window,
    sessionStorage: { getItem: key => { if (storageFails) throw Error('Storage disabled'); return storage.get(key); }, setItem: (key, value) => { if (storageFails) throw Error('Storage disabled'); storage.set(key, value); } },
    clearTimeout: id => timers.delete(id), CustomEvent: class { constructor(type) { this.type = type; } },
  });
  const run = code => vm.runInContext(code, context);
  const tick = ms => { const match = [...timers].find(([, timer]) => timer.ms === ms); assert(match, `Missing ${ms}ms timer`); timers.delete(match[0]); match[1].fn(); };
  return { run, tick, emit, root, content, popup, storage, preference, document, skip };
}

// The shortcut must wait for the loader, then start its own attention animation.
const normal = setup();
normal.run(bootstrap); normal.run(introScript); normal.run(popupScript);
assert(normal.content.inert); assert(normal.popup.hidden);
normal.tick(2400); assert(normal.root.classList.contains('intro-active'));
normal.tick(320); assert(!normal.content.inert); assert(!normal.popup.hidden);
assert.equal(normal.storage.get('palash-signature-seen'), 'true');
assert.equal(normal.storage.get('palash-creative-shortcut-seen'), 'true');

for (const action of ['skip', 'escape', 'reduce', 'bfcache']) {
  const state = setup(); state.run(bootstrap); state.run(introScript);
  if (action === 'skip') state.emit('skip:click');
  if (action === 'escape') state.emit('intro:keydown', { key: 'Escape', preventDefault() {} });
  if (action === 'reduce') { state.preference.matches = true; state.emit('reduce:change'); }
  if (action === 'bfcache') state.emit('window:pageshow', { persisted: true });
  if (action === 'skip' || action === 'escape') state.tick(320);
  assert(!state.content.inert, `${action} must release the page`);
  assert(!state.root.classList.contains('intro-active'));
}
for (const options of [{ seen: true }, { reduce: true }]) {
  const state = setup(options); state.run(bootstrap); state.run(introScript);
  assert(!state.root.classList.contains('intro-active')); assert(!state.content.inert);
}
const fallback = setup({ storageFails: true });
fallback.run(bootstrap); fallback.tick(4500);
assert(!fallback.root.classList.contains('intro-active'));
assert(!fallback.content.inert);
console.log('PASS: signature completion, popup sequencing, Skip, Escape, reduced motion, session suppression, bfcache recovery, and storage/script fallback.');
