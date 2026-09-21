# Project rules

## Context
Ricardo Plata is a Digital Designer based in Mexico working across UX/UI, product
design, web design, brand identity, motion graphics, 3D visualization, interactive
experiences, and front-end prototyping. The audience includes recruiters, studios,
agencies, and companies hiring Digital Design, UX/UI, Product Design, Interaction
Design, Motion, 3D, Automotive HMI, and Creative Technology profiles.

## Stack and conventions
- Use React, Vite, JavaScript, React Router, plain CSS, and CSS custom properties.
- Use semantic HTML, reusable functional components, accessible interactions, and
  data-driven content. No TypeScript migration or unnecessary dependencies.
- Do not use Tailwind, Bootstrap, component libraries, GSAP, Three.js, a CMS, or
  placeholder image services at this stage.
- Components and pages use PascalCase .jsx files; hooks/data use .js.
- Follow the existing single-quote, no-semicolon style; obey ESLint.
- Keep routes in src/App.jsx, reusable UI in src/components, pages in src/pages,
  content in src/data, shared behavior in src/hooks, global CSS in src/styles.
- Use stable slugs for project URLs. Handle unknown routes and project slugs.
- Preserve keyboard access, visible focus, skip navigation, meaningful headings,
  labeled controls, contrast, responsive layouts, and reduced-motion preferences.
- Theme colors belong in neutral light/dark custom properties. Light theme is
  the default; only Light and Dark are allowed. Persist selection; never offer System. Storage failure must not break UI.
- Never invent contact details, project claims, results, media, or final copy.
  Label necessary placeholder text as provisional. Empty content is preferable
  to fabricated work. Add supplied media only with appropriate alt text.

## Visual direction and boundaries
The eventual design is minimal, editorial, technological, clean, precise, and
professional, with expression coming from projects. Plan for generous space,
a precise asymmetric grid, large imagery/video, light/dark themes, clear hierarchy,
subtle controlled motion, responsive layouts, and accessible interactions.
Avoid generic templates, excessive gradients, glassmorphism, decorative shadows,
neon-heavy styling, excessive parallax, constant animations, and decorative UI.
No final accent color is approved. Use black, white, and neutral grays.
Header and Hero visual design and Manrope Variable are approved. No final cards, project
animations, fake images, complete case studies, or unapproved visual decisions.
Self-host Manrope Variable via @fontsource-variable/manrope. The project grid remains structural.
Hero uses an approved 12-column editorial grid; project-grid asymmetry remains unapproved.

## Information architecture
Home: Header/theme control, minimal Hero, ProjectIndex (Featured, Projects,
Freestyle), ProjectGrid, compact AboutPreview/personal photo, contact/Footer.
Professional featured projects: AURA Drive, Kokoro, GU-QI, Landing Pages Collection.
The collection groups A+ Hardwood Flooring, Shine Cleaning, and Fisiomóvil.
Freestyle will contain approved motion graphics, CGI, 3D, logo animations,
interface experiments, and personal explorations. Do not invent entries.
Use a reusable ProjectDetail page at /:lang/work/:slug (en and es).

## Workflow
Inspect existing files and report findings before replacing work. Explain proposed
architecture before structural changes. Preserve unrelated user work.
Run npm run lint and npm run build after implementation. Report errors, warnings,
installed packages, files created/modified, routes, and pending approvals.
Never treat a structural implementation as approval for the final visual design.

## Bilingual conventions
- Use i18next and react-i18next. English is the default and fallback; Spanish is
  the alternative. Do not add detector/backend packages without a concrete need.
- All future interface text, accessibility labels, descriptions, calls to action,
  About/contact text, and case study prose must support both en and es.
- Keep common UI strings in src/locales/{en,es}/common.json and project/case study
  prose in projects.json. Use matching semantic keys and i18next pluralization.
  Future approved project-specific prose should use keys grouped by stable slug.
- Keep project/brand/software/technology names and stable slugs untranslated in
  the shared data. Never duplicate React components for individual languages.
- The URL is authoritative: / redirects to /en even if a saved preference is es.
  Valid routes are /en, /es, and /{en,es}/work/:slug.
  Unsupported language prefixes redirect to /en; unknown pages/slugs within a
  supported language render localized NotFound.
- Preserve /projects/:slug with a replace redirect to /en/work/:slug.
- Save the active valid language under ricardo-portfolio-language in localStorage;
  storage is a record of the selection and must not override explicit URL/default
  rules. Storage failures must not break routing or translations.
- Synchronize i18next and html lang with the route, including browser Back/Forward.
- Use textual EN / ES links, no flags. Preserve path, slug, query, and hash when
  switching language. All internal navigation must retain the active language.
- Hero copy is user-approved in both languages. Other section copy remains provisional.
- Verify both Home routes, a project in both languages, switching, refresh, legacy
  redirects, and invalid-language behavior. Vercel must serve index.html for SPA
  deep links; do not deploy or invent production settings as part of localization.

## Approved Header, Hero, and foundation
- The brand is a typographic wordmark, no icon/monogram/lion/graphic logo.
  Read the public name and reusable profile references from src/config/siteConfig.js.
- Use self-hosted Manrope Variable, restrained weights, readable tight tracking,
  fluid sizes/spacing, and a content-width token near 1440px.
- Keep neutral off-white/light cool-gray and deep graphite themes. No accent,
  gradients, glassmorphism, decorative shadows, neon, or excessive pills.
- Theme has only Light/Dark, defaults to Light, persists safely in localStorage,
  and respects reduced-motion. Use CSS transitions only; no GSAP.
- Header: sticky, transparent at top, subtle solid background/border on scroll.
  Desktop: wordmark, Work/About/Contact, theme, EN/ES.
  Mobile: wordmark, language, theme, keyboard-accessible menu; Escape closes it.
- Hero: approved bilingual copy lives in common.json; interpolate the profile name.
  Desktop uses 12 columns, approximately 78svh, lower-aligned editorial content.
  Mobile order: eyebrow, headline, description, profile, editorial links.
  No hero imagery, carousel, 3D, decorative illustration, or unfinished logo.
- Resume and LinkedIn destinations live in siteConfig.links. Keep href null and
  status pending until supplied; render a clearly labeled non-interactive pending
  item. Set status ready with the approved href later. Never invent personal URLs.
- Preserve project filters, data, all localized/legacy routes, and the existing
  ProjectGrid, AboutPreview, ProjectDetail, and Footer layouts.
  Shared foundation tokens/type can apply globally; do not redesign those sections.

## Development responsive review
- /dev/preview is available only under import.meta.env.DEV. Keep it out of
  production navigation, metadata, route definitions, and compiled assets.
- Keep preview components/CSS in src/dev; lazy-load behind the DEV guard.
- Preview Home in 1440x900, 768x1024, 390x844 frames. Internal dimensions stay fixed;
  only the rendered frames scale. Allow workspace horizontal scrolling.
- Language/theme controls reload all frames together. Preview theme overrides
  must not overwrite saved portfolio preferences. Block nested preview pages.
- Verify lint/build, localized routes, theme logic, frame dimensions, and production
  exclusion. Report explicitly when browser-based visual/keyboard checks are blocked.
- Do not commit or push automatically.
