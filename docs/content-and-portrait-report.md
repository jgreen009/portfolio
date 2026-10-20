# Portfolio content and portrait phase — Michael

Date: 11 September 2026
Status: Complete for local review. Nothing has been deployed.

## Work completed

This phase expanded the portfolio from three to eight projects, integrated screenshots from the six supplied websites, and added Michael’s portrait. The existing design and Phase 2 motion system remain in place. No new animation system was introduced.

### Project content

| Project | Confirmed tools | Update |
| --- | --- | --- |
| Aurelis Estate | Custom code, AI-assisted coding, Claude Code | Updated existing case study with tool credits and real screenshots |
| Forge Fitness | Custom code, AI-assisted coding, Claude Code | Added concept-website case study |
| RISE Hydration | Custom code, AI-assisted coding, Claude Code | Added product-experience case study |
| Key Tapper | Lovable | Added browser-game case study; retains rhythm-flash URL slug |
| SVIP | Framer | Added multi-page security experience-center case study |
| CapyCustomPC | Base44 | Added gaming-PC showcase case study |

Michael confirmed that he built each complete site. The original PLP Estimate Unifier Lite and Production Board and Order CRM case studies remain available, bringing the total to eight. Four projects are featured on the homepage; all eight appear in the work archive.

Descriptions cover observed interfaces and supplied facts. No clients, project dates, testimonials, metrics or measured business results were invented. Forge is identified as a concept website. Some CapyCustomPC builder entry points are acknowledged as coming soon.

### Screenshots and galleries

- Captured the supplied sites with Edge and Playwright following explicit authorization.
- Selected 17 screenshots, including desktop compositions, mobile views, membership content, property listings and calculator, and an active Key Tapper game board.
- Excluded incomplete animation frames and blank or broken imagery from the selected set.
- Prepared local WebP assets with meaningful alt text, captions and intrinsic dimensions.
- Added responsive case-study galleries with links to the full screenshots.
- Kept source captures and local review images in ignored audit-results folders.
- Regenerated nine social share images: one general portfolio image and eight project images.

No source-site enquiry, subscription, purchase, account registration or game score was submitted. Review findings describe visible interfaces rather than verified backend reliability.

### Personal portrait and headshot

Replaced the About page’s decorative monogram with Michael’s supplied photograph. The original JPEG is stored locally without retouching. Following Michael’s request, the displayed image was changed to a square head-and-shoulders crop using CSS. The source image remains intact. The image has descriptive alt text and reserved layout dimensions.

## Site structure

The application remains inside the portfolio directory. It uses Next.js App Router, TypeScript, Tailwind CSS, custom styling, Motion and static export.

| Route | Content |
| --- | --- |
| / | Homepage, capabilities, four featured projects, workflow and contact invitation |
| /work/ | Eight-project archive |
| /work/plp-estimate-unifier/ | PLP case study |
| /work/production-order-crm/ | Production CRM case study |
| /work/aurelis-estate/ | Aurelis case study |
| /work/forge-fitness/ | Forge case study |
| /work/rise-hydration/ | RISE case study |
| /work/rhythm-flash/ | Key Tapper case study |
| /work/svip/ | SVIP case study |
| /work/cappy-custom-pc/ | CapyCustomPC case study |
| /about/ | Michael’s introduction, headshot and approach |
| /contact/ | Direct contact and locally prepared project brief |

There are twelve application routes, plus the custom 404, robots and sitemap output. Existing responsive navigation, footer, reduced-motion support and local contact behavior remain in place.

## Files and reusable content structure

| File or folder | Responsibility |
| --- | --- |
| src/content.mjs | Original project records and shared profile content; imports added projects |
| src/website-projects.mjs | Five additional website/game records |
| src/project-media.json | Six projects’ screenshot paths, dimensions, alt text and captions |
| lib/content.ts | Typed project data, readiness states and featured selection |
| components/portfolio.tsx | Shared project cards and case-study/gallery layouts |
| app/work/page.tsx | Full work archive |
| app/about/page.tsx | About content and portrait |
| app/phase-two.css | Archive, gallery and headshot styling alongside existing styles |
| public/projects/ | Optimized screenshots |
| public/images/michael-portrait.jpg | Original supplied portrait |
| public/og/ | Nine project/portfolio share cards |
| tests/portfolio.spec.ts | Browser checks with data-driven project routes |
| src/site.test.mjs | Export and content regression checks |
| docs/project-capture-review.md | Source review, attribution and screenshot-selection notes |
| docs/content-readiness.md | Remaining optional content |

Projects and media can be updated through these local records without rebuilding individual page layouts. Missing optional content remains unpublished.

## Validation and scope of evidence

- TypeScript and production builds passed for the content integration.
- Eight export/unit regression tests passed.
- All 38 Playwright checks passed after project integration, covering twelve routes at five viewport widths, navigation, keyboard behavior, reduced motion, contact behavior, compression/404 responses and mobile/desktop axe scans.
- All 17 selected media records were checked for matching intrinsic dimensions and nonempty alt text.
- Loaded project images and a mobile gallery were reviewed locally.
- The final Forge screenshot/caption replacement was followed by another successful build and eight passing export tests.
- The portrait loaded at mobile and desktop widths without horizontal overflow. Its subsequent headshot crop was visually inspected, adjusted to give more space above the head, and followed by a successful production build.

The full 38-check suite predates the portrait/headshot edits; it was not rerun for those small changes. No new Lighthouse score, physical-device test or screen-reader audit is claimed. The previous Lighthouse dependency-download limitation remains documented in the Phase 3 report.

## Local preview and remaining content

Production preview: http://127.0.0.1:5180/

Run npm run build and then npm start from the portfolio directory to regenerate and serve the local export. Development preview uses npm run dev on port 5181.

Remaining material for a later phase:

- Real screenshots for the two original application case studies, which still use labeled concept illustrations.
- Social profile URLs and optional résumé/full professional name.
- Project dates, optional client identities and permissions.
- Deeper architecture, process and challenge narratives where supplied.
- Supported outcomes and genuine testimonials, if available.
- Physical-device, browser and assistive-technology checks; optional scored Lighthouse audit.

Hosting, a final production origin and direct form delivery remain outside this completed local phase. Earlier reports are retained in docs/phase-1-report.md, docs/phase-2-report.md and docs/phase-3-report.md.
