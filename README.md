# Ricardo Plata portfolio

Neutral structural foundation: React, Vite, JavaScript, React Router, plain CSS,
i18next, and react-i18next. Permanent conventions are in AGENTS.md.

## Development
Run commands from this nested ricardo-portfolio directory:
- npm install
- npm run dev
- npm run lint
- npm run build
- npm run preview
- node scripts/verify-localization.js

## Structure
- src/components: shared layout and reusable Home sections
- src/pages: Home, reusable ProjectDetail, NotFound
- src/data: unchanged professional records and empty freestyle collection
- src/hooks: theme preference behavior
- src/styles: reset, neutral light/dark tokens, structural base styles
- src/i18n/index.js: bundled resources, English default/fallback
- src/locales/{en,es}/common.json: interface and accessibility strings
- src/locales/{en,es}/projects.json: project placeholder text and plurals
- src/App.jsx: route configuration
- scripts/verify-localization.js: render, link, translation, and HTTP checks

## Routes and language
- / redirects to /en.
- /en and /es render Home.
- /en/work/:slug and /es/work/:slug render ProjectDetail.
- Slugs: aura-drive, kokoro, gu-qi, landing-pages-collection.
- /projects/:slug redirects to /en/work/:slug, preserving query/hash.
- Unsupported language prefixes redirect to /en.
- Unknown pages and project slugs under en/es render localized NotFound.
- EN / ES links preserve path, project slug, query string, and fragment.
- The URL determines the language, including on direct entry or refresh.
- The active language is saved to ricardo-portfolio-language in localStorage.
  It is a record of the preference, not a redirect override: / always opens English.
- html lang tracks the active language; storage failures are safely ignored.
- Project/brand/software/technology names are never translated.
- Future case study text belongs in projects.json, grouped by stable project slug.
  Add matching keys in both languages and use useTranslation; do not duplicate UI.

All supplied professional projects are Featured. Freestyle is intentionally empty.
Theme still supports System, Light, and Dark with its separate saved preference.
The EN/ES content remains provisional; no final copy or visual design is approved.

## Verification scope
The verification script renders both Home routes, AURA Drive in both languages,
collection names, localized NotFound, and language links (including query/hash).
It checks matching translation keys, English fallback, Spanish pluralization,
the root redirect configuration, and fresh HTTP requests to localized routes.
It uses only installed React/Vite tooling and Node built-ins.
Server rendering does not run browser effects. Live clicks, html lang updates,
localStorage, Back/Forward, and an actual browser refresh still require browser QA.
No browser surface was available in the implementation session.

## Later Vercel configuration
Choose the directory containing package.json as the Vercel Root Directory
(the nested ricardo-portfolio directory if deploying its parent).
Use the Vite preset, npm run build, and output directory dist.
Add vercel.json in that root before deployment with:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
This SPA fallback lets direct requests/refreshes reach React Router, including
localized deep links and old project links. The app handles language/legacy
redirects client-side; no production deployment or server redirect was added.
See https://vercel.com/docs/frameworks/frontend/vite for the official SPA guidance.
After deployment, verify direct /es/work/aura-drive requests and refreshes.

## Design status
CSS, theme colors, project data, and assets are unchanged by localization.
No final typography, cards, asymmetry, accent, images, animations, or case study
copy has been added. Starter assets remain unused.
