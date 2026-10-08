import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = name => JSON.parse(readFileSync(new URL(`../src/content/${name}.json`, import.meta.url)));
const projects = read('projects');
const categories = read('categories');
const dashboards = read('dashboards');
const experiences = read('experience');
const unique = items => assert.equal(new Set(items).size, items.length);
const asset = path => { if (path) assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), `Missing local asset: ${path}`); };
test('project taxonomy, section anchors, resources and assets are consistent', () => {
  assert.deepEqual(categories.map(item => item.label), ['Data & Business Analytics', 'Data Science', 'Product & AI']);
  unique(projects.map(item => item.id)); unique(projects.map(item => item.sourceId));
  for (const project of projects) {
    assert.equal(typeof project.category, 'string');
    assert.ok(categories.some(category => category.id === project.category));
    assert.equal(project.sections[0].id, 'overview');
    unique(project.sections.map(section => section.id));
    for (const section of project.sections) { assert.match(section.id, /^[a-z][a-z0-9-]*$/); for (const image of section.images) { asset(image.src); assert.ok(image.alt); } }
    asset(project.cover);
    for (const resource of project.resources) { if (resource.url.startsWith('/')) asset(resource.url); else assert.equal(new URL(resource.url).protocol,'https:'); assert.ok(resource.label); }
  }
});
test('dashboards reference shared projects and show only supplied media/resources', () => {
  unique(dashboards.map(item => item.id));
  for (const dashboard of dashboards) {
    assert.ok(projects.some(project => project.id === dashboard.projectId));
    asset(dashboard.preview);
    for (const shot of dashboard.screenshots) { asset(shot.image); assert.ok(shot.alt); }
    if (dashboard.publicUrl) assert.equal(new URL(dashboard.publicUrl).protocol, 'https:');
    for (const file of dashboard.files) { assert.ok(file.url && file.label); }
  }
  assert.equal(dashboards.find(item => item.id === 'advertising-abtest').publicUrl, '');
});
test('experience and source-review states preserve factual limits', () => {
  unique(experiences.map(item => item.id));
  for (const experience of experiences) { assert.ok(experience.contributions.length >= 2 && experience.contributions.length <= 4); assert.match(experience.start,/^\d{4}-\d{2}$/); }
  const capstone = projects.find(item => item.sourceId === 'PROJ-04');
  assert.equal(capstone.status, 'Proposal stage');
  assert.match(capstone.sections.map(section=>section.paragraphs.join(' ')).join(' '), /planned deliverable, not a completed result/);
  assert.equal(projects.find(item => item.sourceId === 'PROJ-10').status, 'Content review pending');
  assert.match(read('education')[0].reviewNote, /official diploma wording needs confirmation/);
});
