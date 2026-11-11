# Editing the portfolio

## Shared profile

Edit `src/data/profile.ts` to change the contact email, LinkedIn profile, capabilities, or education. Education is September 2024-May 2028, expected. Keep the `updatedAt` label aligned with the actual content update. GitHub and resume links are omitted until supplied. Home's personal portrait and introduction are in `src/components/AboutMe.astro`.

## Add a technical project

Copy `src/content/projects/draft-example.md` and give the new file a lowercase slug, such as `new-project.md`. Fill in its required frontmatter and real case-study prose. The filename becomes `/work/new-project/`. Set `published: true` when the entry is ready; unpublished entries have no public route. Set a unique `order` to control presentation.

Supported status values are `in-progress`, `completed`, and `archived`. Add `currentFocus` to ongoing projects to include them in the shared Current section on Home and Journey. Set `updatedAt` to the actual update date. The Work count comes from the published collection.

Use only real URLs for optional `liveUrl`, `repoUrl`, and `reportUrl`. Leave missing fields out entirely. Do not use empty strings or placeholder links. An optional `role` appears as My contribution; describe individual work accurately. An optional `collaborators` line preserves team attribution. `note` can explain a meaningful demo limitation.

Write long descriptions in Markdown, starting at h2. The page template provides the h1, metadata, live links, imagery, and next-project link. Omit sections whose details are unknown. For evaluation, `metrics` defaults to an empty array. A published metric needs a label, value, context, and supporting evidence URL; authoring-only reported numbers belong in review notes.

## Images

Home's About section sits immediately after the hero and before Projects. Edit `src/components/AboutMe.astro` for the approved personal copy, photo alternative text, caption, and scoped layout. The owner-supplied 960×1280 portrait is in `src/assets/profile/palash-outdoors.jpg`; Astro serves responsive WebP derivatives at 320, 480, 640, and 960px, with lazy loading and reserved dimensions. The full 3:4 composition is preserved. The desktop layout places the portrait left and copy right on aubergine; it stacks below 900px. The section uses silver text and marigold heading emphasis, matching the Beyond the Code band. The hero's scroll hint points here; its primary Work action still goes directly to Projects.

Put real screenshots in `src/assets/projects/`. Import each image in `src/data/media.ts`, then add an entry keyed by the project's slug with `image`, descriptive `alt`, and `caption`. An optional `secondary` image can explain a detail. Astro generates responsive local WebP variants. Without an image mapping, a project gets an intentional typographic fallback rather than a broken image.

Home's hero uses original decorative ribbon artwork, independent of any project. Keep all project entries equally prominent: the same image ratio, frame, heading scale, and action styling. Keep screenshots faithful to the underlying apps. Captions should state the capture date if the interface can change.

The shared `Sculpture.astro` component uses four original parametric renders under `src/assets/art/`, one for each main page. Journey uses the `journey` variant, with burgundy and cream material faces against a sage page. Their authoring source is `scripts/create-artwork.py` (Pillow and NumPy are authoring-only dependencies). Run `python scripts/create-artwork.py journey` to regenerate only that variant, or omit the argument to regenerate all four. The site serves optimized WebP variants without a 3D runtime. These are decorative website assets, not claimed examples of Palash's prior creative work.

## Experience and achievements

Edit `src/data/experience.ts` for the Journey timeline and `src/data/achievements.ts` for the achievement feature. Dates supplied by the resumes are provisional until the owner reviews the content. The FOLIO first-place feature appears on Journey, with recognition also described in its case study. Home keeps equal emphasis on all projects. Keep any prize, event date, organiser endorsement, or team attribution out until confirmed.

## Creative work

Home includes a dismissible **Here for the creative work?** shortcut to `/playground/`. Edit its copy and styling in `src/components/CreativeShortcut.astro`. It appears once per browser-tab session, without moving keyboard focus or blocking the page. Visitors can dismiss it with the close button, the secondary button, or Escape. The header's Playground link remains available after dismissal. Session storage uses `palash-creative-shortcut-seen`; if storage is unavailable, the shortcut works but may reappear on a new Home load. It stays hidden when JavaScript is disabled.

On its first appearance, a marigold ring and soft glow highlight the shortcut for 1.5 seconds after its entrance. A large curved marigold arrow points toward it during exactly the same interval: 180px wide beside the popup on desktop, 150px wide above it on mobile. The arrow ignores pointer input, is decorative for assistive technology, and disappears with the glow. The highlight runs once and respects reduced-motion preferences.

Add items to `creativeItems` in `src/data/creative.ts`. Each needs a title, category, role, tools, caption, local image URL, and image alt text. Put public creative assets under `public/creative/` and reference `/creative/filename.webp`. Specify a real `video` URL only for a playable asset; native controls are provided and no audio autoplays. Supply a WebVTT `captions` URL for spoken content. `externalUrl` is optional.

With no items the page intentionally presents a concise creative-practice introduction, with no invented projects or empty gallery tiles. Identify generated media in its caption and preserve collaborators' credits.

## Resume

Put the corrected, public-ready file under `public/resume/`, then set `profile.resume` to its absolute site path, such as `/resume/palash-matani.pdf`. Header/footer links appear automatically. The original resumes were not copied because education dates and project descriptions need updating first.

## Colours and motion

The opening signature screen is in `src/components/SignatureIntro.astro`, with early startup/fail-open logic in `BaseLayout.astro`. It draws **palash matani** in marigold `#EAAA00` on deep aubergine `#3A0F34`, then fades into the portfolio after approximately 2.7 seconds. It runs once per tab session (`palash-signature-seen`), can be skipped with its button or Escape, and is bypassed for reduced-motion preferences. Without JavaScript it stays hidden. The creative shortcut waits for `portfolio:intro-complete`, so its 1.5-second highlight is visible after the intro.

The SVG drawing approach is inspired by [Componentry Signature](https://componentry.dev/docs/components/signature), implemented natively for Astro. Allura is the locally bundled, SIL Open Font License script font; its license is in `docs/licenses/allura-LICENSE.txt`. OpenType.js generates the paths at build time, so no runtime font parser, React, Framer Motion, or external font request is required. Change the `text` constant to edit the signature. `npm test` includes intro lifecycle and popup-sequencing checks using an isolated simulated DOM; these do not replace visual browser testing.

Edit semantic tokens in `src/styles/tokens.css`. The provisional orchid is `#E7B0DE`; the originally supplied seven-digit value was invalid. Keep foreground/background combinations readable. Global responsive styles are in `global.css`; motion is in `motion.css`. Reduced motion is respected. Every element remains visible if JavaScript is disabled.

Every page must visibly use its three-color palette, through deliberate artwork, typography, surfaces, and actions. Playground opens on orchid with eggplant type and orange artwork. The header stays pinned at the top; its measured height controls anchor offsets. The new direction is recorded in `PORTFOLIO_REVISION_PLAN_V2.md`, which supersedes conflicting appearance instructions in the original plan.

Journey's latest owner-approved palette supersedes the original pastels: sage grey `#A5A79B` (page/header), cream beige `#E8D2B5` (education surface and ribbon face), and burgundy `#590907` (text, actions, and ribbon face). The old pastel landscape has been removed.

Home's latest palette is ice silver `#DDE3E8`, deep aubergine `#3A0F34`, and marigold `#EAAA00`. Silver is the page/header canvas, aubergine provides readable text, and marigold appears in the ribbon, actions, heading underline, and popup highlight. The creative teaser inverts to aubergine with silver text. Home-specific tokens leave the other route palettes independent. Its ribbon is the `possibility` variant; the favicon and share image follow the new Home palette.

## Before release

Run `npm run check`, `npm run build`, and `npm test`. Inspect Home, Work, Journey, Playground, and a case study at mobile and desktop widths. Review the missing-input list, confirm the domain, and set the production indexing environment flags deliberately. Publishing is not performed by the build command.
