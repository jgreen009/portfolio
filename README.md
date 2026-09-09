# Michael portfolio — foundation

This isolated project preserves the existing estimate-comparison app in the parent directory.

Run `npm run build` to generate seven static routes. Run `npm start` for http://127.0.0.1:5180. Run `npm test` for route and content checks. No build dependencies are required.

## Architecture and content

`src/content.mjs` is the content source for profile, projects, capabilities, services, process, technology groups and testimonials. `src/build.mjs` contains shared layout and page renderers; `src/styles.css` owns responsive design tokens and components. `src/app.js` owns the mobile menu and local enquiry-brief download. Generated, tracked `dist/` assets are the static hosting output. Every route has its own HTML entrypoint and works without client-side routing; a dedicated 404 page covers unknown URLs.

Routes: `/`, `/work`, `/work/plp-estimate-unifier`, `/work/production-order-crm`, `/work/aurelis-estate`, `/about`, `/contact`.

## Design system

Charcoal #171819, warm white #f1efe9, muted gray #a4a6aa, blue action #5268ef, pale blue accent #8c99ff. Space Grotesk display, DM Sans body, system monospace metadata. Google Fonts serves the two open-source fonts with display=swap and fallback fonts. Large typography, fine borders, generous space and restrained orbital system geometry define the identity. Project visuals are concept UI previews, not evidence of actual product screens. Motion is intentionally minimal; reduced motion is respected.

## Content integrity and launch requirements

- The supplied brief ends at `Email: mik`. `profile.email` remains null. The contact form downloads a local text brief and never claims to send it. Confirm the full email and add a server-backed delivery provider with validation, abuse controls and privacy copy before enabling enquiry sending.
- Testimonials are an empty centralized array. The visible section is explicitly marked as an editable placeholder; no quotes, people, ratings, or companies were fabricated. Replace the placeholder only with approved testimonials.
- No dates, clients, performance metrics, financial results, résumé history, or unprovided live links were invented.
- Only Aurelis has a supplied live URL. Its live content could not be verified during this build. Replace the typographic concept with owner-approved real site imagery when available.
- `/resume` is reserved but deliberately not generated or linked. Add it only after verified résumé content is supplied; do not publish an empty résumé page.
- Future case-study depth should be grounded in actual implementation artifacts. Add screenshots, project role, dates, and quantitative evidence only after verification.

## Next-phase interaction architecture

Keep content independent of presentation. Use progressive enhancement for section reveals, project transitions, and the system diagram. Prefer transform/opacity, honor reduced motion, preserve keyboard focus, and keep links usable without JavaScript. Avoid adopting an animation runtime until a concrete interaction requires it. If migrating to React/Next.js, preserve route URLs, tokens and centralized content. Current architecture has no backend, database or secrets.

## Verification

Automated checks verify generated route entrypoints, local navigation targets, metadata, one h1 per page, case study content, and honest contact/placeholder behavior. Browser visual, assistive technology, and real-device testing remain launch checks; no such audit is claimed.
