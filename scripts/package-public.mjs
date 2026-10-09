import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
const artifact = 'public-artifact';
rmSync(artifact, { recursive: true, force: true });
cpSync('dist', artifact, { recursive: true });
const base = process.env.PORTFOLIO_BASE_PATH || '/Zhixian-personal-portfolio/';
function redirectOldPreviews(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) redirectOldPreviews(path);
    else if (entry.name === 'index.html') {
      const route = relative('dist', dirname(path));
      const url = `${base}${route ? `${route}/` : ''}`;
      const target = join(artifact, 'preview', route);
      mkdirSync(target, { recursive: true });
      writeFileSync(join(target, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${url}"><link rel="canonical" href="https://zz10965-alt.github.io${url}"><title>Freya Zhang</title></head><body><a href="${url}">Open Freya Zhang’s website</a></body></html>`);
    }
  }
}
redirectOldPreviews('dist');
writeFileSync(join(artifact, '.nojekyll'), '');
writeFileSync(join(artifact, 'robots.txt'), 'User-agent: *\nAllow: /\n');
