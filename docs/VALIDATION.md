# Portfolio validation

Validated locally on 11 November 2026. This is a local preview; no public deployment was performed.

## Latest Journey update

Journey now uses the owner's sage grey `#A5A79B`, cream beige `#E8D2B5`, and burgundy `#590907` palette, with a dedicated cream/burgundy ribbon render. The previous pastel landscape and its responsive overrides were removed. The new circle uses the existing shared responsive Sculpture component and intro grid. The header browser-theme color, education surface, timeline markers, footer action, and authoring seed follow the new palette.

The ribbon asset was inspected locally. Latest checks passed: 24 Astro files with zero errors/warnings/hints, all eight pages built, and 134 local link/asset/anchor checks. Browser navigation for this update was blocked by automatic approval review because the previous origin approval/usage-limit gate remained unresolved. Therefore the browser measurements and screenshots below document the earlier V2 design, including the old Journey appearance; they do not verify this latest Journey change. No new browser screenshot is claimed.

## Build and content checks

- `npm run check`: 28 files checked, 0 errors, 0 warnings, 0 hints.
- `npm run build`: all 8 static pages generated successfully, including the 404 page.
- `npm test`: passed 137 local link, image, asset, and anchor references across 8 pages, plus signature-intro lifecycle checks.
- Every generated page has one h1. The unpublished fourth example has no public route or list entry.
- Missing resume and GitHub links are omitted. No placeholder `href="#"` links were found.
- Authoring seed fields, review flags, local source paths, and draft content are excluded from generated HTML.
- Largest page's executable inline JavaScript totals approximately 2141 bytes gzip; no separate JavaScript files are emitted. JSON-LD is excluded from that calculation. The test counts both inline and external executable JavaScript against the 80KB budget.
- Local responsive WebP images were generated from four real project screenshots and four original parametric ribbon renders. The decorative source assets are approximately 36–43KB each; served variants are smaller as appropriate. Artwork dimensions are reserved, decorative images have empty alternatives inside `aria-hidden` containers, and no WebGL runtime or animation loop is used. Fonts are self-hosted, with licences under `docs/licenses/`.

Commands were run with `ASTRO_TELEMETRY_DISABLED=1` in the sandbox because its Astro telemetry configuration directory is outside the writable workspace. Dependency installation and loopback preview checks used authorised network access. These are environment accommodations, not application dependencies.

## Browser checks

The production build was served at http://127.0.0.1:4321/ and checked through the supported in-app browser.

- Revised Home, Work, Pallify, Journey, and Playground checked at 320, 375, 768, 1024, and 1440px: **25 layout combinations**, each with one h1 and a sticky header. Overflow was measured against the document client width, excluding the scrollbar. Journey background overshoot at 320px and 1024px was corrected; both affected widths were verified after their corresponding fixes. The result summary is in `revision-layout-checks.json`; `layout-checks.json` records the older initial implementation.
- FOLIO and Flér deep links and the actual missing-route response checked at 375px; no horizontal overflow.
- All four revised visual themes inspected at desktop and mobile. Home has pearl/lime ribbon artwork on teal, Work has cobalt/acid artwork on black, Journey has blue/lavender atmosphere with peach forms, and Playground opens on orchid with eggplant type and orange artwork. Project images remain faithful to their original apps.
- Home's selected-work anchor reached its intended section below the pinned navigation. At 1440px the header top remained 0px, its height was 76.8px, and the selected-work section settled at approximately 96.4px from the viewport top.
- Home's three project frames measured equal widths and equal image heights at every inspected breakpoint. At 1440px their widths were approximately 381px and image-frame heights 264px; at 1024px widths were 299px and heights 209px. Work rows also share equal frame geometry. No project is used in the hero or receives a featured layout.
- Scrolled Work, Journey, and Playground by bringing lower content into view: the header top remained 0px at observed scroll positions of approximately 1213px, 1198px, and 575px. Pallify's header also stayed at 0px at a scroll position near 2177px.
- Mobile Menu expanded and collapsed with matching `aria-expanded` state. Escape closed it and returned focus to the Menu button.
- Work navigation from the mobile menu and browser Back worked; the menu returned collapsed.
- The mobile Contact link closed the menu and reached the contact section without covering it. The header remained pinned at 0px.
- Pallify's native technical-detail disclosure opened correctly.
- Viewport overrides were reset after testing, and the preview tab was retained.

## Accessibility and measurement limits

Semantic headings, landmark structure, image alternatives, control labels, visible-focus CSS, and a skip link are implemented. The four palettes use the contrasted colour roles documented in the plan; a contrasting header focus token is provided on every page.

Reduced-motion CSS disables animation, transition, image zoom, hover translation, and smooth scrolling; the reveal script also respects the preference. This was reviewed in source. The browser environment did not expose a supported preference-emulation control, so a runtime reduced-motion session was not separately verified.

Escape keyboard handling was verified. The in-app browser's Tab/zoom shortcut forwarding did not provide a verifiable native tab-order or 200% zoom change. Complete keyboard-only traversal and actual browser zoom should be checked in the owner's normal browser. The narrow layouts were tested independently; they are not represented here as an actual zoom test.

The final landscape-menu observation was blocked by automatic approval review because the account reached its usage limit. The 812×375 page had no horizontal overflow, but the menu's expanded state was not verified in that landscape session. No alternate browser-control path was used. A fresh final console review, full keyboard traversal, actual 200% zoom, and runtime reduced-motion emulation remain unverified. Source review confirms the intended menu, focus, anchor-height, and reduced-motion behavior; it does not replace those runtime checks.

No automated accessibility certification, Lighthouse score, or field Core Web Vitals result is claimed. The site has no field performance dataset yet. The build budget check is a static size measurement, not a real-user latency measurement.

## Screenshots

- `screenshots/v2-home-desktop.jpg`: revised Home at a 1440px browser viewport.
- `screenshots/v2-home-mobile.jpg`: revised Home at 375px.
- `screenshots/v2-projects-desktop.jpg`: equal Home project entries with pinned navigation.
- `screenshots/v2-work-desktop.jpg`: black/cobalt/acid Work opening.
- `screenshots/v2-journey-desktop.jpg` and `v2-journey-mobile.jpg`: pastel Journey.
- `screenshots/v2-playground-desktop.jpg` and `v2-playground-mobile.jpg`: orchid/eggplant/orange Playground.

The browser capture API returned JPEG bytes; filenames use `.jpg`. Captured image dimensions differ slightly from the CSS viewport because of browser capture scaling and scrollbar exclusion. Older unprefixed screenshots document the initial implementation.

Screenshots and raw layout checks remain source-workspace documentation and are not included in the website's public output.

## Remaining content inputs

See `CONTENT_REVIEW.md`. A corrected resume, GitHub links, detailed personal contributions, shareable creative pieces, FAD date confirmation, and the final domain can be added later. They do not block use of the local site. Public indexing is deliberately disabled until the intended domain and release settings are selected.

## Home creative shortcut update

Added a Home-only, nonmodal popup headed “Here for the creative work?” with an “Explore the Playground” link and two dismissal buttons. It appears once per tab session, handles unavailable session storage, does not autofocus or lock scrolling, supports Escape without interfering with the open mobile menu, and restores focus when dismissed from within the popup. Responsive maximum height permits internal scrolling on short viewports; global reduced-motion rules disable its entrance animation.

The current type check, build, and all 135 local references pass. Static output inspection confirmed Home-only inclusion, the hidden no-JavaScript fallback, and the session key. Runtime popup interaction and visual placement remain unverified because browser access is still subject to the unresolved automatic approval restriction recorded above. No browser access was retried for this update.

## Home palette update

Home now uses ice silver #DDE3E8, deep aubergine #3A0F34, and marigold #EAAA00, including the header, hero, body typography, creative teaser, footer action, ribbon materials, creative shortcut highlight/arrow, favicon, and share image. The three other page themes retain their own colors. Aubergine text is used on silver and marigold surfaces; marigold is decorative or paired with aubergine rather than used for body text on silver.

The regenerated ribbon/share artwork was inspected locally. Type checking passed for all 25 files; all eight pages built and all 135 local references passed. Browser visual verification remains unavailable under the previously recorded automatic approval restriction; older Home screenshots do not represent this palette.

## Signature intro update

Added a full-viewport aubergine/marigold signature intro, inspired by the supplied Componentry Signature reference, using build-generated Allura SVG paths. The drawing takes approximately 2.4 seconds before a 320ms fade. The intro runs once per tab session on any entry route, has a Skip button and Escape handling, isolates background controls while active, and restores page interaction afterward. Reduced-motion visitors bypass it. A 4.5-second bootstrap fallback releases the page if the later script fails; no JavaScript means no blocking screen.

The creative shortcut now waits for intro completion before appearing or recording its session flag. Its glow and pointer therefore start after the overlay is gone.

Build, 135 local references, and type checks pass. `scripts/verify-intro.mjs` exercises the actual client scripts in an isolated VM with a simulated DOM: completion, popup sequencing, Skip, Escape, changed reduced-motion preference, previously-seen session, bfcache recovery, and storage/script fallback. These are lifecycle unit checks, not browser animation/focus/contrast certification. Visual browser verification remains subject to the unresolved approval restriction described above.

## Personal About section update

Added Home's personal section immediately below the hero, before Projects, with the approved “Away from the keyboard, still exploring.” heading and “never afraid to try or learn something new” addition. It uses the same aubergine/silver/marigold treatment as the creative band, a photo-left/copy-right desktop arrangement, and a stacked layout below 900px. The owner-supplied portrait retains its full 3:4 composition; no location, event, or photography credit was inferred. The caption is “Touching grass, whenever possible.” Home's sections are renumbered, and the scroll hint targets About while the Work CTA remains direct.

All 28 checked files pass without errors/warnings/hints, all eight pages build, all 137 local references pass, and intro lifecycle checks pass. Static HTML inspection verifies the hero → About → Projects order and the approved new sentence. Four responsive WebP derivatives were generated: 320px (11,574 bytes), 480px (21,556 bytes), 640px (30,494 bytes), and 960px (53,840 bytes); none contains EXIF metadata. The portrait is lazy-loaded with reserved dimensions and appropriate alternative text. Browser visual verification remains unavailable under the earlier approval restriction; no new page screenshot or cross-device visual certification is claimed.
