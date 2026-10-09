# Final Phase 2 content audit

> Asset availability has been re-audited. See [the comprehensive inventory](asset-inventory.md) for current statuses; older missing-asset statements below are historical.
The approved layout, navigation destinations and interactions are preserved. Phase 3 preview/CMS implementation is now authorized and configured. See [the setup guide](phase-3-setup.md) for account authorization and live verification steps. Final public launch remains unapproved.

## Editable field inventory

[Machine-readable field contract](cms-content-schema.json) lists every current JSON field, including nested arrays. Each definition corresponds to a file in `src/content/`. Phase 3 should map these fields directly rather than maintain a second content source.

| Content file | Editable content |
| --- | --- |
| `site.json` | Navigation labels and destinations; language and SEO description; page headings, emphasis, descriptions and eyebrow text; all shared interface/placeholder labels; footer text and copyright name |
| `profile.json` | Name, introduction and headline; academic/location/skill highlights; email and social URLs/verification flag; resume document; professional portrait metadata; portrait, alt text, crop and caption; placeholder/sticker copy; interests, icons, images, captions and descriptions |
| `education.json` | University, school, degree, major, location, dates and timeline labels; GPA, coursework, honors, academic highlights; logo/alt text; translation/review notes |
| `categories.json` | Category labels, icons and route IDs |
| `experience.json` | Company, role, team, dates/start, location, summary, contributions, skills/tags, logo/monogram, notes; Featured and Display Order |
| `projects.json` | Title, concise card description and longer case introduction; category, dates, role, skills/tags, status, notes; cover/alt text; ordered sections with editable headings, paragraphs, findings/bullets and visualizations/captions; document/repository/notebook links; Featured and Display Order |
| `dashboards.json` | Title, platform, project reference, description, previews and screenshot gallery/alt text; documents and public URLs, verification status and notes; Featured and Display Order |

`featured` defaults to false for all records, so the approved ordering stays intact. Featured records sort first, then ascending `displayOrder`. Experience dates are a final tie-breaker. Unique order values preserve the current reverse chronological experience sequence; changing order explicitly takes precedence over chronology. Featured affects ordering only, not card decoration.

Cards display an independent concise `cardDescription`, at most four technology tags, uniform image proportions and aligned reading areas. Full tags and longer introductions remain available in the case studies. Sections are entirely record-driven: empty sections are omitted, visualizations retain their source captions, and Resources is added only when there is a usable link or related dashboard. No mandatory methodology/findings/recommendations template or filler was added.

## Hardcoded content audit and boundaries

All rendered user-specific text, dates, skills, media references, documents, external URLs, page copy and footer copy now come from the seven JSON files above. Shared interface labels have also moved into `site.json`. The copyright year is automatically calculated at build time.

The following are **implementation or maintenance settings**, rather than CMS prose fields:

- Route templates, layout, colors, responsive rules, interactions, icon artwork and favicon remain code/static assets. Icon names can be selected in content; drawing new icons requires code.
- The five navigation keys and page route templates remain structural identifiers. Category/project IDs and dashboard project references are editable data but must remain unique and valid; changing an ID changes its URL. Section IDs must be valid and unique for Scroll Spy.
- Assets currently live under `public/`; a CMS upload/media picker and authenticated document workflow are not connected. These belong to Phase 3. Content already has path/URL, alt text and caption fields.
- Source provenance IDs and review notes remain editable metadata. Some profile interest descriptions/labels and education descriptions are retained but are not displayed by the approved layout.
- Repository package metadata, test fixtures and historical review documents contain the portfolio name and historical factual assertions; they are not live website content and are maintained in Git.
- Hosting `site`/`base`, canonical URLs, build configuration and dependency versions are developer settings. No deployment destination is configured yet.

## Missing resources and remaining factual limitations

Empty photographs show the approved neutral placeholders; empty logos use monograms. An unavailable resume is visibly disabled, LinkedIn remains pending, and empty contact links are hidden. Missing optional project links/documents are omitted. Invalid URL schemes are filtered. Local content asset paths are verified by tests so a nonexistent referenced file cannot pass verification.

The Tableau URL is retained as editable source metadata but its public action is now hidden until `publicUrlVerified` is true. Its availability could not be checked through this environment's network policy; this is not a claim that the dashboard is broken. The Power BI screenshot and notebook visualizations are real supplied artifacts.

Still needed: original portrait and interest photos, resume PDF, LinkedIn URL, optional institution/company logos, some project covers, optional reports/slides/demo links and Tableau preview. Official English bachelor's degree wording and the battery project's narrative remain owner-review items. Existing source-review notes preserve ongoing/proposal/synthetic-data limitations. No confidential employer report, raw archive, family/identity record or credential is included.

## Validation and phase boundary

Run `npm test`, `npm run build` and `npm run test:browser` (with a local server and the browser prerequisites in README). These cover content relationships, media/link integrity, CMS contract coverage, ordering fields, all 19 routes, responsive layouts and the approved interactions. The committed source is also built from a clean checkout before delivery.

Stop here. No Pages CMS integration, authorization, CI or public website deployment has been started.
