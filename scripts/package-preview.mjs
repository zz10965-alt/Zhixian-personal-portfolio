import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
// Keep the actual site inside /preview/. The repository root is a review landing page.
mkdirSync('preview-artifact/preview', { recursive: true });
cpSync('dist', 'preview-artifact/preview', { recursive: true });
writeFileSync('preview-artifact/index.html', '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Temporary portfolio preview</title><h1>Temporary portfolio preview</h1><p>The final public website has not launched.</p><p><a href="preview/">Open the complete review preview</a></p></html>');
writeFileSync('preview-artifact/robots.txt', 'User-agent: *\nDisallow: /\n');
writeFileSync('preview-artifact/.nojekyll', '');
