# Public website

The owner explicitly authorized public launch. The production URL is https://zz10965-alt.github.io/freya_portfolio/ . The previous `/preview/` URLs redirect to the matching public pages.

The existing Pages CMS, repository, main branch, content JSON and upload directories are unchanged. CMS saves trigger `.github/workflows/publish.yml`, which validates and builds the latest saved content and deploys the public site. No preview notice or noindex directive is included on public pages. Allow the workflow to complete before refreshing to see edits.

Earlier Phase 3 documentation describes the temporary review stage; this document records the subsequently authorized public launch.

The owner renamed the repository to `freya_portfolio`. Deployment paths now derive from the GitHub repository name. Pages CMS continues to use the same repository and main branch; select its new name in the CMS repository picker.
