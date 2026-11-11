import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const root = path.resolve('dist');
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
const files = await walk(root);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const required = ['index.html','work/index.html','work/pallify/index.html','work/folio/index.html','work/fler/index.html','journey/index.html','playground/index.html','404.html'];
for (const file of required) assert(files.includes(path.join(root, file)), `Missing route: ${file}`);
assert(!files.some(file => /draft-example|portfolio-content-seed|IMPLEMENTATION_PLAN/.test(file)), 'Authoring files leaked into the build');
let checkedLinks = 0;
let maxInlineJavaScriptGzip = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const executableScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].filter(match => !/application\/ld\+json/.test(match[1])).map(match => match[2]);
  const inlineGzip = executableScripts.reduce((bytes, script) => bytes + (script.trim() ? gzipSync(script).length : 0), 0);
  maxInlineJavaScriptGzip = Math.max(maxInlineJavaScriptGzip, inlineGzip);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Expected one h1: ${file}`);
  assert(!/href=["']#["']/.test(html), `Placeholder link: ${file}`);
  assert(!/sourceIds|sourceIndex|reportedMetricsForReviewOnly|modelCardSnapshotForReviewOnly|C:\\Users|Draft project example|candidateLiveUrl/.test(html), `Private authoring data in ${file}`);
  const routePath = path.relative(root, file).split(path.sep).join('/').replace(/index\.html$/, '');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    const url = new URL(value, `https://portfolio.local/${routePath}`);
    let target = path.join(root, decodeURIComponent(url.pathname));
    let info;
    try { info = await stat(target); } catch { assert.fail(`Missing local target ${value} from ${routePath}`); }
    if (info.isDirectory()) target = path.join(target, 'index.html');
    if (url.hash && target.endsWith('.html')) {
      const destination = target === file ? html : await readFile(target, 'utf8');
      assert(destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor ${value} from ${routePath}`);
    }
    checkedLinks++;
  }
}
const jsFiles = files.filter(file => file.endsWith('.js'));
const jsGzipBytes = (await Promise.all(jsFiles.map(async file => gzipSync(await readFile(file)).length))).reduce((a,b) => a+b, 0);
assert(jsGzipBytes + maxInlineJavaScriptGzip < 80 * 1024, `JavaScript budget exceeded: ${jsGzipBytes + maxInlineJavaScriptGzip} gzip bytes`);
const home = await readFile(path.join(root,'index.html'),'utf8');
assert(!/href="[^\"]*(?:github\.com|\/resume\/)/.test(home), 'Missing profile/resume links should be omitted');
assert(!files.some(file => file.includes('draft-example')), 'Unpublished project received a public route');
console.log(`PASS: ${htmlFiles.length} HTML pages, ${checkedLinks} local links/assets/anchors; unpublished drafts excluded; private notes excluded.`);
console.log(`JavaScript budget: ${jsGzipBytes} external bytes gzip + ${maxInlineJavaScriptGzip} inline bytes gzip on the largest page.`);
