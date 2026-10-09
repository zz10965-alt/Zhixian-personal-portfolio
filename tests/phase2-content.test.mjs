import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const document = name => JSON.parse(readFileSync(new URL(`../src/content/${name}.json`, import.meta.url)));
import { normalizeContent } from '../src/lib/normalize-content.mjs';
const contract = JSON.parse(readFileSync(new URL('../docs/cms-content-schema.json', import.meta.url))).$defs;
const read = name => normalizeContent(document(name), contract[name]);
const projects = read('projects');
const categories = read('categories');
const dashboards = read('dashboards');
const experiences = read('experience');
const unique = items => assert.equal(new Set(items).size, items.length);
const asset = path => { if (path) assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), `Missing local asset: ${path}`); };
test('project taxonomy, section anchors, resources and assets are consistent', () => {
  unique(categories.map(item => item.id));
  assert.ok(categories.every(item => item.id && item.label));
  unique(projects.map(item => item.id)); unique(projects.map(item => item.sourceId).filter(Boolean));
  for (const project of projects) {
    assert.equal(typeof project.category, 'string');
    assert.ok(categories.some(category => category.id === project.category));
    assert.ok(project.title && project.summary);
    assert.ok(project.sections.length > 0);
    unique(project.sections.map(section => section.id));
    for (const section of project.sections) { assert.match(section.id, /^[a-z][a-z0-9-]*$/); for (const image of section.images ?? []) { if (!image.src) continue; asset(image.src); assert.ok(image.alt); } }
    asset(project.cover);
    for (const resource of project.resources ?? []) { if (!resource.url) continue; if (resource.url.startsWith('/')) asset(resource.url); else assert.equal(new URL(resource.url).protocol,'https:'); assert.ok(resource.label); }
  }
});
test('dashboards reference shared projects and show only supplied media/resources', () => {
  unique(dashboards.map(item => item.id));
  for (const dashboard of dashboards) {
    assert.ok(projects.some(project => project.id === dashboard.projectId));
    asset(dashboard.preview);
    for (const shot of dashboard.screenshots ?? []) { asset(shot.image); assert.ok(shot.alt); }
    if (dashboard.publicUrl) assert.equal(new URL(dashboard.publicUrl).protocol, 'https:');
    for (const file of dashboard.files ?? []) { assert.ok(file.url && file.label); }
  }

});
test('experience identifiers and sortable dates remain valid after CMS edits', () => {
  unique(experiences.map(item => item.id));
  for (const experience of experiences) { assert.ok(experience.company && experience.role); assert.match(experience.start, /^\d{4}-\d{2}$/); }
});
