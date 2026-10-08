# Freya Zhang — Personal Portfolio

An Astro portfolio with an editorial, warm-white and muted-purple design.

Phases 1 and 2 are implemented: About Me, Education, interactive Experience, project categories and case studies with Scroll Spy, and related Dashboards. Phase 2 final refinements are complete; explicit approval is required before Phase 3. CMS and public deployment remain Phase 3 tasks after explicit approval.

## Local development

Requires Node.js 22.12+ (this environment uses Node 24).

```sh
npm ci
npm run dev
```

The development server listens on port 4321. In this cloud environment use `npm --cache /workspace/.npm-cache ci` if the default home cache is unavailable.

```sh
npm test
npm run build
npm run preview
```

## Content and review

Personal introduction, interests, contacts, photos, and education are separated into `src/content/`. Empty media/link fields show honest placeholders; missing resources do not produce fake links. Pages CMS is planned for visual editing in Phase 3; it is not connected yet.

See [the Phase 1 review](docs/phase-1-review.md) for source inventory, proposed project categories, fact-review flags, missing assets, architecture, and approval gates.

Do not add the raw experience archive to this repository: it includes private information. No public deployment or CMS authorization has been performed.

## Phase 2 content and checks

`src/content/categories.json`, `experience.json`, `projects.json`, and `dashboards.json` hold editable records. Every project has one category, flexible ordered sections, optional resources, and a display order. Dashboards reference project IDs and are shared between the gallery and case studies. No raw source archive or confidential reports are included.

Run `npm run test:browser` with the development server running to check all routes, responsive layouts, navigation, experience selection, Scroll Spy, and local resources. This check uses the cloud runtime’s existing Playwright and Chromium; outside this environment, install Playwright and set `CHROMIUM_PATH` to an available Chromium binary. `PORTFOLIO_TEST_URL` can select a different local server and `PORTFOLIO_SCREENSHOT_DIR` can select a screenshot output directory. Screenshots default to an ignored directory under `node_modules/.cache/`.

See `docs/phase-2-review.md` for validation evidence and remaining content/asset limits. No CMS login or editing-to-deployment workflow has been tested or claimed.

## Final content readiness

See [the CMS content audit](docs/cms-content-audit.md) and [field contract](docs/cms-content-schema.json) for every editable field and remaining limitations. Shared page/interface/footer text lives in `site.json`. Projects, experiences and dashboards have `featured` and `displayOrder` fields: Featured first, then ascending Display Order. Public dashboard actions require `publicUrlVerified`; unverified URLs remain metadata only.

## Asset audit

The [comprehensive asset inventory](docs/asset-inventory.md) supersedes older missing-assets lists. It includes a full CSV, all 19 public repository snapshots, recovered media provenance and the exact remaining owner actions. Recovered unverified URLs are retained in content but hidden from public actions; no CMS or deployment has started.
