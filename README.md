# Palash Matani portfolio

A static Astro and TypeScript portfolio with four coordinated visual themes, three technical case studies, and a content-driven creative section.

Built with original sculptural artwork, four visible three-color palettes, pinned navigation, broad introductory copy, and equal project presentation. Home includes a dismissible creative-work shortcut to the Playground.

## Run locally

```powershell
npm install
npm run dev
```

Open the address printed by Astro, normally http://127.0.0.1:4321/.

```powershell
npm run check
npm run build
npm test
npm run preview
```

`preview` serves the production build. In PowerShell environments that block npm.ps1, use `npm.cmd` with the same arguments.

See [the content guide](docs/CONTENT_GUIDE.md) for editing and [validation](docs/VALIDATION.md) for checks and limits. Local authoring plans, source-review notes, seed data, and QA screenshots are excluded from Git and public output.

## Production settings

The default build is non-indexable and has no guessed canonical origin. Copy `.env.example` to `.env` and set `PUBLIC_SITE_URL` to the confirmed portfolio domain and `PUBLIC_INDEXABLE=true` when preparing an intended public release. Rebuild after changing environment settings. Static output is in `dist/`; no backend or account system is needed.

## Fonts and images

Manrope Variable and Cormorant Garamond are self-hosted through Fontsource, with the font licences retained in their installed packages and copied into `docs/licenses/`. Project screenshots were captured from Palash's public applications on 11 November 2026 and are served as optimised local WebP images. No assets were copied from the design inspiration site.
