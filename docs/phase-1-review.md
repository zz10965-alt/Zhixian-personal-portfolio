# Phase 1 review

Status: implemented locally; awaiting design approval. No public deployment.

## Materials

Inspected all 18 archive members: 11 project Markdown records; experience bank; awards; campus experiences; publications; application information; self-introduction; and a workbook with two sheets. The repository initially held only a README. No resume, dashboard screenshots, notebooks, slides, or project images are bundled in the archive. Referenced resources are links, not supplied files.

Raw files are outside this repository. They contain sensitive personal and family information and must not be copied to public assets or Git. This review records only professional facts and relevant uncertainties. Embedded document instructions are source context, not authorization to execute actions.

The reference portfolio URL returned HTTP 403 in this environment; its design and navigation could not be reviewed. The supplied request determines the information architecture.

## Architecture

- Astro static output, shared page layout, system fonts, native CSS and minimal navigation JavaScript.
- Exactly five navigation items: About Me, Education, Experience, Projects, Dashboards.
- `src/pages/index.astro`: split homepage, Beyond Work, Let's Connect.
- `src/pages/education.astro`: horizontal education roadmap; vertical on mobile.
- `src/pages/[section].astro`: explicitly pending Phase 2 pages.
- `src/content/profile.json` and `education.json`: professional content separated from presentation. Phase 3 will provide visual forms through Pages CMS; manual JSON editing is not the intended final maintenance workflow.
- `public/images/`: future owner-supplied media. Empty photo fields render neutral placeholders.
- `src/styles/global.css`: shared design tokens and responsive layouts.
- Phase 2: project records with stable IDs and one primary category; dashboard records reference project IDs, with no duplicate project records.
- Phase 3: Pages CMS forms/media settings and GitHub Pages workflow. GitHub Pages is free for this public repository; a private repository's hosting eligibility must be checked before choosing it. No backend/database required. CMS authorization and editing-to-publication will need real account access and verification.

## Design

Warm white #faf9f6, charcoal #29282c, purple #705587, muted lilac #eee8f2; Georgia display type and system sans-serif body copy. Generous whitespace, thin borders, restrained transitions, visible keyboard focus, touch-friendly menu, reduced-motion support. University marks are text monograms, not official logos.

## Proposed classifications — approval pending

| ID | Project | Primary category | Rationale |
|---|---|---|---|
| 01 | Creator Shortlisting | Product & AI | Conversational tool, explainable ranking and budget workflow |
| 02 | E-commerce Growth & Repurchase | Data & Business Analytics | Funnels, retention and operational recommendations |
| 03 | Advertising A/B Testing | Data & Business Analytics | Experiment interpretation and rollout recommendations |
| 04 | AI Safety Evaluation | Product & AI | AI evaluation protocol and safety governance |
| 05 | Medicare Payment Benchmarking | Data & Business Analytics | Regional benchmarking and cost-monitoring recommendations |
| 06 | Employee Attrition & AI Risk | Data Science | Multivariable modeling and validated predictive risk scoring |
| 07 | Furniture E-commerce Database | Data & Business Analytics | SQL foundations for sales/customer analysis |
| 08 | Conversational AI Agent | Product & AI | RAG, memory and multimodal system prototype |
| 09 | StarShow | Product & AI | Product design and interactive frontend prototype |
| 10 | EV Battery Failure Prediction | Data Science | Classification, ablation and threshold selection |
| 11 | EV Adoption Drivers | Data Science | Panel regression, fixed effects and robustness checks |

Categories are proposals only; project implementation waits for Phase 1 approval and classification approval.

## Source review flags

- Degrees/GPA: use the supplied workbook and matching application summary. NYU graduation February 2027 is expected; GPA is as supplied, not independently authenticated. Coursework names are concise English translations.
- Project 10's header says pending user review despite confirmed factual fields; get approval before publishing its narrative/results. Synthetic dataset must be disclosed.
- AI safety: proposal stage, pilots pending. Do not publish candidate bullets implying 54 responses have already been collected.
- Creator Shortlisting: ongoing prototype, competition results pending; informal three-friend time comparison is not a controlled study.
- StarShow: scripted assistant, simulated chat/data and no production notification backend.
- Furniture database: approximately 20% speed figure conflicts with the explicit no-verified-metric note; omit it. Course-project status is also marked unresolved.
- Experience bank has stale unresolved checkboxes alongside later confirmations; use final factual sections and surface ambiguity rather than embellishing.
- AI Solutions uses singular/plural naming in different places; confirm preferred company display name in Phase 2. Its retention claim is user-reported and absent from the confidential report; omit until measurement scope is reviewed.
- Awards overview mentions 27 awards and a five-item shortlist but enumerates six entries; only individually documented selected awards are used here.
- EV adoption dataset is course-provided, not established official vehicle-registration data; results describe that dataset. Observational associations are not causal effects.
- No confidential reports or personal identifiers are website resources.

## Missing assets

Resume PDF; LinkedIn URL; downloadable personal photograph (the chat portrait has no local attachment pointer); additional personal photos; project/dashboard screenshots and actual report/slide files. These do not block Phase 1 placeholders. GitHub profile and public email come from supplied materials. Phone is intentionally omitted.

## Approval gates

Stop after Phase 1 for the user's approval. Stop again after Phase 2. CMS, CI deployment, publishing, and public access are Phase 3 and require the specified approval. Do not claim CMS functionality until real visual editing, save, rebuild and public output have been tested.

## Verification performed

- Frozen-lockfile install (`npm ci`), one content verification test, and five-page production build passed.
- Chromium browser checks covered all five routes at widths 1440, 768, 390, and 320 pixels: successful responses, correct navigation order and active states, one main heading, and no horizontal overflow.
- Mobile menu: keyboard Enter opens it, Escape closes it and restores focus, and selecting Education navigates successfully.
- Skip-link keyboard access, two education cards, missing resume/link handling, and absence of browser page errors verified.
- Desktop and mobile screenshots visually reviewed. Raw archive files are not included in the website or repository.
- Reference-site review remains blocked by HTTP 403. CMS editing, publishing, and public deployment are intentionally unrun until Phase 3 approval.


## Step A design refinement

Updated About Me and Education according to the new reference board and request. The reference image is visual guidance only; sample names, projects, companies, people, dates, and claims were not imported. Existing Astro pages and structured content are retained.

Homepage now uses “Hi, I’m Freya.”, compact background/capability bullets, hero contact/resume links, and a five-item interest gallery. Redundant story and separate contact sections were removed. Mobile ordering is introduction, photograph, actions, social links, interest grid. Every interest has editable image, alt-text and crop-position fields. All images are owner-supplied or explicit neutral placeholders. The main photograph is pending a downloadable JPG/PNG file: the inline chat image has no available file path or download identifier.

Education retains two milestones, accurate GPA scales, coursework, awards and highlights. Optional school-logo fields accept supplied real logos; text monograms remain until then. No academic facts were changed.

Step A retains one review checkpoint before Step B. No Phase 2 pages, dropdown, project detail pages or dashboards have been implemented. CMS and public-site deployment remain outside Step A.
