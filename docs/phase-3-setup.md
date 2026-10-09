# Temporary online preview and visual CMS

Phase 3 is authorized. A temporary review preview and the CMS configuration are implemented. **The final public launch is not authorized and has no deployment workflow.** The owner enabled GitHub Pages. Live browser checks also passed on all 19 routes at widths 1440, 768, 390 and 320, covering the dropdown, experience switching, Scroll Spy, mobile menu and content order. All 27 internal destinations returned HTTP 200. In this cloud runtime the browser test trusted the already curl-validated proxy TLS path, and curl was used for resource requests because the Node request client lacks the proxy DNS route. The temporary preview is now live at https://zz10965-alt.github.io/Zhixian-personal-portfolio/preview/ . All 19 routes and 14 media/style/favicon resources returned HTTP 200; the preview notice and noindex metadata were verified. Authenticated CMS authorization and save/upload verification remain pending. The earlier Pages-configuration failure has been resolved.

## 1. Enable the online preview

1. Open [this repository's Pages settings](https://github.com/zz10965-alt/Zhixian-personal-portfolio/settings/pages).
2. Under **Build and deployment → Source**, select **GitHub Actions**. If already selected, leave it selected.
3. Open [Temporary portfolio preview](https://github.com/zz10965-alt/Zhixian-personal-portfolio/actions/workflows/preview.yml). If the latest run did not succeed before Pages was enabled, click **Run workflow → main → Run workflow**. If GitHub prompts to enable Actions for the repository, enable it first. A green build alone is insufficient: the **preview** deployment job must also be green.
4. Open **https://zz10965-alt.github.io/Zhixian-personal-portfolio/preview/** after that successful deployment.

This is a temporary public review URL, not the final website. It includes the complete 19-page site and interactions, an explicit review notice, and noindex metadata. The repository root is only a preview landing page; the website artifact lives under `/preview/`. No custom domain, root portfolio launch, or final-site workflow has been configured. Search indexing instructions are advisory, not access control.

Every subsequent CMS save to `main` starts the same **preview-only** build. A failed content check stops replacement of the previous successful preview. Remove or change the temporary hosting only after a separate decision; final launch requires explicit approval.

## 2. Authorize the visual CMS

1. Open [Pages CMS](https://app.pagescms.org) and sign in with your GitHub account.
2. If prompted, install/authorize its GitHub App for **only `zz10965-alt/Zhixian-personal-portfolio`**. Use the account that can manage this repository. No password, private key or personal access token needs to be pasted into this chat or committed.
3. Select this repository and branch **main**. Its `.pages.yml` configuration supplies seven visual editors: About Me & Contacts; Page Headings, Navigation & Footer; Education; Experience; Project Categories; Projects & Case Studies; Dashboards.
4. Edit a small piece of copy, such as the footer text, and click **Save**. Wait for the preview workflow to finish; refresh the online preview and confirm your edit. This is the first authenticated end-to-end check and is not claimed complete merely because the config is committed.
5. Upload a test photo using **Photos, Logos & Project Images** (or the relevant photo field); select it, set alt text and save. Verify that it appears in the preview. Upload an approved resume/PDF/PPTX using **Resume, PDFs & Slides**. The resume picker directly assigns the download. For project resources, copy the uploaded `/documents/...` path into the resource URL field and mark it Verified after checking it.

CMS saves are Git commits. Use Save for normal edits; no code changes are required. GitHub **Revert** can undo an unwanted content commit if needed. Do not rename/delete an in-use media file without changing its references; content checks catch broken local paths.

## Editable fields and media

The configuration covers every field in [the content contract](cms-content-schema.json), including nested project sections, images/captions, documents, links, tags, dates, headings and footer text. The existing root-array JSON format is supported by Pages CMS `list: true`; no duplicate content source or migration was added. Folded repeatable rows let you add, remove and reorder records/sections.

Featured and Display Order control projects, experiences and dashboards. Category labels are editable; keep the three stable category IDs unless all dependent records/configuration are updated together. New project IDs must be unique lowercase slugs; section IDs must be unique within a case study. A dashboard's Project Id must match a project. Optional metadata such as provenance and the separate professional headshot is editable but does not force a visible layout slot.

Blank optional fields stay hidden or show existing neutral placeholders. The renderer restores empty-array/string defaults after Pages CMS removes empty fields. Tests validate structure and references rather than locking editable copy, dates, GPA or uploads to historical literal values. Existing proposal/synthetic-data/review limits are preserved in the content; update them only when the underlying facts change.

Uploaded images are stored once in `public/images` and saved as `/images/...` paths. Documents go into `public/documents` and `/documents/...`. Preview builds prefix these paths with the GitHub repository and `/preview/`, so media and downloads work in that subdirectory. Original source records, raw experience archives and credentials remain outside the CMS media libraries.

The site structure, styling and interactions remain code. They are outside the CMS editing scope, while user-facing content and favicon are configurable. The current field configuration is validated against the upstream Pages CMS configuration schema at commit `6f4e860a35d934406580287e7042e5e111e207a1`; hosted service authorization is separate.

## Verification and remaining account steps

Locally verified: all content fields have CMS editors; the upstream CMS config schema accepts `.pages.yml`; nine tests pass; the preview build produces all 19 routes; local browser checks use the exact repository/preview prefix to verify navigation, category dropdown, experience switching, Scroll Spy, responsive layouts and local media/documents. The preview artifact contains no final-site deployment.

Remote build verified in [the first GitHub Actions run](https://github.com/zz10965-alt/Zhixian-personal-portfolio/actions/runs/37864777157). Its deployment failed because the repository has no enabled Pages site. The configure-pages action documents that automatic enablement requires an owner/admin token other than the workflow GITHUB_TOKEN; use the owner-side settings step above instead.

Live deployment verified in [the successful preview run](https://github.com/zz10965-alt/Zhixian-personal-portfolio/actions/runs/37869041425). GitHub API access and live endpoint checks now work; the hosted CMS sign-in page returns HTTP 200. The account installation list currently has no Pages CMS app. Still pending: owner CMS sign-in/repository installation and a real CMS save/upload-to-preview round trip. No final-site launch was performed.

A cloud-environment draft adds `zz10965-alt.github.io`, `app.pagescms.org`, `pagescms.org` and `api.github.com` to the existing network presets so future agent sessions can verify hosting/CMS endpoints. Review/save the draft in environment settings and publish the **cloud environment** to apply it. This step is separate from website deployment and does not authorize the final website. It is not needed for you to open the preview/CMS in your own browser.

### Overview editing and readability refinement

Projects now have an ordered **Overview — Text, Images, Video & Links** block list in Pages CMS. Add a Text, Image, Video, or Links block; edit, remove, or reorder blocks independently. Image uploads use `public/images`; MP4/WebM uploads use `public/videos`. Video URLs support YouTube/Vimeo embeds, uploaded video playback, or a hyperlink fallback. Links accept custom labels and URLs; disable or delete individual entries. Empty blocks are omitted. Existing project links and supplied screenshots have been migrated into Overview; there is no separate Resources section. Other meaningful project sections remain editable.

The preview also uses larger, darker text, a wider desktop container, and more compact Education spacing. Contact details display the user-confirmed email `freyazhang968@nyu.edu` and LinkedIn profile. These changes update the temporary preview only; final launch still requires approval. Authenticated Pages CMS saves and uploads still require the repository owner's CMS authorization.
