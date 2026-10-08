# Phase 2 review

Status: implemented and tested locally; awaiting Phase 2 approval. Review screenshots are shared through GitHub. Website source has not been publicly deployed; Pages CMS and deployment workflows have not been configured.

## What changed

- Kept the approved editorial palette, typography, page navigation, two-column hero, and education timeline.
- Removed the redundant hero Connect button. Resume remains explicitly unavailable. Mobile Resume/contact links now precede the photograph.
- Audited education against the supplied workbook and accompanying records. Study dates, GPA scales, and listed coursework match. Course names are concise English translations. The official English wording of 管理学学士 is not available; the translated bachelor’s title is explicitly marked for review. Hackathon is ongoing and capstone is proposal-stage work.
- Built four reverse-chronological internships with desktop keyboard-operable selectors and a mobile select, updating details without navigation. Employer logos are optional.
- Built 11 projects in exactly three categories (4 Data & Business Analytics, 3 Data Science, 4 Product & AI), without duplicate project records.
- Projects navigation has a separate main-page link and category toggle; desktop hover, keyboard, click, Escape, outside click, and mobile touch are supported.
- All project pages are independent, continuous-scroll case studies. Section lists, content, resources, and Scroll Spy are generated from the actual records. Sections are never replaced as tabs.
- Two dashboard records reference their projects. The same records drive the dashboard gallery, case-study previews and resource links. The Power BI record has a real screenshot fallback; Tableau has an owner-supplied URL and an honestly marked missing preview.

## Structured content

Records live in `src/content/` and are separated from UI components. Categories have stable IDs. Projects support ordering, one category, multiple tags, cover images, role/date/status, flexible ordered sections (paragraphs, bullets, images), and optional resources. Dashboard fields include project ID, platform, preview, screenshot gallery, URL, optional files and verification notes. Experience fields include ordering, dates, contributions, tags and optional logo. All five interest images have editable source, alt text and crop position fields. These are prepared for future visual forms; no CMS functionality is claimed yet.

## Verification performed

- `npm test`: 4 tests passed. Checks cover source bounds, taxonomy, section IDs, relationship integrity, resources and local assets.
- `npm run build`: 19 static routes built successfully.
- Chromium checks exercised all 19 routes at widths 1440, 768, 390 and 320: successful responses, one main heading, correct active navigation, no horizontal overflow.
- Desktop dropdown: hover, keyboard ArrowDown, category-link navigation, Escape and focus return passed. Mobile category toggle/link passed.
- All four internships selected with the current URL unchanged. Arrow-key selection and mobile selection passed.
- Scroll Spy: Overview active on open, every section highlights during scrolling, click-to-scroll works, all content remains in the same DOM, and TOC matches the actual sections.
- Shared Power BI dashboard appears once in the gallery and once in its matching case study, without a duplicate project. Download links and missing-preview states passed.
- Mobile homepage Resume and contact links precede the photograph; social tap targets are at least 44px high.
- Every discovered local resource destination returned HTTP 200. The five notebook URLs map to actual files in the linked Data_Project checkout. Creator2, ai-conversational-agent and starshows-mobile repositories accepted read-only Git operations.
- Browser page-error list was empty. Desktop and mobile screenshots were captured and visually reviewed.
- Live Tableau verification was attempted and blocked by the environment’s network proxy (403 CONNECT). This is not proof of a broken dashboard. Its owner-supplied URL is labeled as not live-verified.
- CMS authentication, editing, media upload, automatic rebuilding and public publication are intentionally unrun Phase 3 work.

## Actual visual assets and provenance

Source repository: `zz10965-alt/Data_Project`, inspected at `07118559df51ddf7251b65be1f95cab9b45ec17c`.

- Original dashboard screenshot: `05-advertising-analytics(AB Test)/Ad AB Testing_01.png`, copied unchanged to `public/images/dashboards/advertising-abtest.png`.
- A 1800px WebP preview is derived only by resizing/compression of that screenshot; the original remains downloadable. No charts or analytical numbers were regenerated.
- E-commerce cover: embedded output of executed notebook cell 26 (purchase-path chart).
- Employee attrition cover: embedded output of executed notebook cell 82 (odds-ratio forest plot).
- EV adoption cover: embedded output of executed notebook cell 33 (regional market-share trends).
- EV battery cover: embedded output of executed notebook cell 31 (precision–recall curve).

No synthetic personal photos or generated analytical data have been used.

## Missing assets and unverified facts

1. Accessible original lifestyle photo, all five interest photographs, resume PDF, LinkedIn URL, real university/employer logos, and six project cover images are still missing. Neutral placeholders are explicit.
2. Official English bachelor’s degree title needs an institution-issued English diploma or transcript. The provided record supports 管理学学士; the current English title is a marked translation. Coursework is from supplied owner records, not an independently authenticated transcript.
3. Tableau screenshot and live availability are unverified because `public.tableau.com` is blocked in this runtime. A supplied screenshot could resolve the preview without remote access.
4. No public interactive Power BI URL, portfolio slides, downloadable analytical PDFs, Medicare/furniture source repositories, or their visual assets were supplied. Missing buttons are hidden.
5. The furniture project’s recalled speed-up has no verified benchmark and is omitted. Course-project designation is marked unresolved in the source and is not asserted.
6. EV battery project narrative is still marked pending owner review; synthetic data and limits are explicit.
7. AI safety proposal: pilots and completed 54-response dataset are not available. No results are invented; proposed deliverables remain future work.
8. Creator Shortlisting is ongoing; awards were pending. Its informal three-friend comparison is not reported as a controlled-study benchmark.
9. StarShow uses scripted/simulated frontend interactions. The conversational agent has no verified performance benchmark.
10. AI Solutions retention-lift claim lacks a sufficiently specified measurement scope in the supplied report and is omitted. Confidential reports are not linked. The original Chinese company name is preserved for the summer marketing placement because no official English company name was supplied.
11. EV adoption uses a course-provided dataset with unspecified original source/generation; no official-market or causal policy claim is made.
12. Source-provided YouTube/GitHub Pages demo URLs were not independently verified here; only verified Git repository resources are shown for those product projects.

## Approval boundary

Stop after Phase 2. Do not configure Pages CMS, add deployment CI, or publish a website until the user explicitly approves Phase 2. Screenshot sharing is already authorized and does not deploy the application. Raw source archives remain outside the website repository.
