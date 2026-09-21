# Ricardo Plata portfolio

React, Vite, JavaScript, React Router, i18next/react-i18next, and plain CSS.
Permanent project rules are in AGENTS.md.

## Development
Run commands from this nested ricardo-portfolio directory:
- npm install
- npm run dev
- npm run lint
- npm run build
- npm run preview
- node scripts/verify-localization.js
- node scripts/verify-foundation.js (run after npm run build)

With the development server running, open /dev/preview for responsive review.

## Architecture
- src/components: shared layout and reusable sections; scoped Header/Hero styles
- src/pages: Home, reusable ProjectDetail, NotFound
- src/data: professional project records and empty freestyle collection
- src/config/siteConfig.js: public name, profile translation keys, pending URLs
- src/theme/theme.js and src/hooks/useTheme.js: Light/Dark preference behavior
- src/styles: reset, neutral tokens, shared foundation and existing section layouts
- src/i18n/index.js: bundled resources, English default/fallback
- src/locales/{en,es}/common.json: UI, accessibility, and approved Hero copy
- src/locales/{en,es}/projects.json: provisional project text and plural forms
- src/dev: isolated, development-only preview and frame initialization
- src/App.jsx: existing localized routes plus guarded lazy development route
- vite.config.js: React plugin and centralized static HTML title

## Routes and localization
- / redirects to /en.
- /en and /es render Home.
- /en/work/:slug and /es/work/:slug render ProjectDetail.
- Slugs: aura-drive, kokoro, gu-qi, landing-pages-collection.
- /projects/:slug redirects to /en/work/:slug, preserving query/hash.
- Unsupported language prefixes redirect to /en.
- Unknown paths/slugs under a supported language show localized NotFound.
- EN / ES preserves path, project slug, query, and hash.
- The URL controls the language; / always opens English even if Spanish is saved.
- Active language is recorded in ricardo-portfolio-language in localStorage.
- html lang and the document title follow the active language.
- Project/brand/software/technology names remain untranslated.
- Future case study text goes in projects.json with matching bilingual keys.

## Foundation, Header, and Hero
Manrope Variable is self-hosted through @fontsource-variable/manrope.
No external font URL is used. Neutral off-white and graphite themes share spacing,
surface, border, focus, radius, motion, and container tokens.
Only Light and Dark are supported. Light is the default, including when an old
System preference or invalid value is found. Preferences persist under
ricardo-portfolio-theme; blocked storage does not prevent theme changes.
CSS transitions respect prefers-reduced-motion.

The typographic wordmark reads siteConfig.name, as do the Hero, Footer, and title.
The Header is sticky, transparent at top, and solid with a subtle border on scroll.
Its mobile disclosure has expanded state, focus on opening, Escape dismissal,
outside-click dismissal, and no focus trap.
The Hero uses a 12-column desktop layout at approximately 78svh and a single-column
mobile layout. Its supplied English/Spanish copy is approved; other section copy
remains provisional. Project filters and existing downstream layouts are retained.

Resume and LinkedIn URLs are pending in siteConfig.links. They intentionally render
as labeled non-interactive text. To activate one, supply its approved href and set
status to ready. No personal URLs or contact details have been invented.

## Development-only responsive preview
/dev/preview defaults to English and Light, with three labeled frames:
- Desktop: 1440 x 900
- Tablet: 768 x 1024
- Mobile: 390 x 844

The iframe viewport dimensions remain fixed. A common visual scale lets all three
be compared; Fit/50%/75%/100% controls and horizontal scrolling are available.
Language/theme changes remount all frames with consistent localized Home URLs.
Reload frames resets all three. Preview theme overrides are honored only in
development iframes and do not overwrite saved portfolio preferences.
Nested preview pages are blocked; frame URLs never point to /dev/preview.
Preview components, styles, and initialization are dynamically imported behind
import.meta.env.DEV. They are excluded from production assets and navigation.
In production, /dev/preview follows the existing unsupported-language fallback
to /en; there is no preview route or preview content.

## Verification and limits
Passing commands:
- npm run lint
- npm run build
- node scripts/verify-localization.js
- node scripts/verify-foundation.js

Automated checks cover both Home routes, project pages in both languages,
NotFound, collection names, language-link preservation, translation key parity,
English fallback, pluralization, and fresh HTTP requests.
Foundation checks cover rendered Header/Hero in both themes/languages, Light
default, saved themes, blocked storage, no System option, preview preference
isolation, exact frame dimensions, safe frame URLs, and the development route.
Text colors meet 4.5:1 against neutral backgrounds/surfaces; focus/control border
checks meet 3:1. Production assets contain self-hosted fonts and no preview code,
preview CSS, or preview-theme markers.

No browser surface was available during implementation. Server-rendered markup
and HTTP checks do not verify actual visual layout, browser clicks, sticky/menu
interactions, frame reloading, theme transitions, or real browser refresh.
Before visual sign-off, review /dev/preview at all three sizes in both languages
and themes, and exercise keyboard navigation, Escape, anchors, and reduced motion.
The first build found an unsupported font subset import; the supported package
entry point fixed it. Final lint/build passed without errors or warnings.

## Later Vercel configuration
Use the directory containing package.json as the Root Directory (the nested
ricardo-portfolio directory when deploying its parent), Vite preset, build command
npm run build, and output directory dist. Before deployment, add vercel.json:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
This SPA fallback allows direct localized URLs and refreshes to reach React Router.
Language and legacy redirects remain client-side. Development preview is excluded.
See https://vercel.com/docs/frameworks/frontend/vite for official SPA guidance.
No deployment, commit, or push was performed.
