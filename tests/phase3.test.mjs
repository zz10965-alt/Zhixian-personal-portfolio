import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalizeContent } from '../src/lib/normalize-content.mjs';
const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url)));
const contract = read('../docs/cms-content-schema.json').$defs;
const cms = read('../.pages.yml');
function covered(definition, fields, path) {
  const properties = definition.type === 'array' ? definition.items.properties : definition.properties;
  assert.deepEqual(fields.map(field => field.name).sort(), Object.keys(properties).sort(), `CMS coverage: ${path}`);
  for (const field of fields) {
    const definition = properties[field.name];
    if (definition.type === 'array') assert.ok(field.list, `${path}.${field.name}`);
    const nested = definition.type === 'array' ? definition.items : definition;
    if (nested.type === 'object') {
      if (field.type === 'block') {
        assert.deepEqual(field.blocks.map(block => block.name), nested.properties.type.enum);
        const union = new Map(field.blocks.flatMap(block => block.fields).map(field => [field.name,field]));
        union.set('type',{name:'type'}); covered(nested,[...union.values()],`${path}.${field.name}`);
      } else covered(nested, field.fields, `${path}.${field.name}`);
    }
  }
}
test('visual CMS covers every current field and all upload libraries', () => {
  assert.equal(cms.content.length, Object.keys(contract).length);
  for (const entry of cms.content) {
    assert.equal(entry.type, 'file'); assert.equal(entry.format, 'json');
    assert.equal(entry.path, `src/content/${entry.name}.json`);
    if (contract[entry.name].type === 'array') assert.equal(entry.list, true);
    covered(contract[entry.name], entry.fields, entry.name);
  }
  assert.deepEqual(cms.media.map(media => [media.input,media.output]), [['public/images','/images'],['public/documents','/documents'],['public/videos','/videos']]);
});
test('CMS omission of empty fields restores rendering defaults without losing real content', () => {
  const project = normalizeContent({id:'sample',title:'Real title',featured:true,displayOrder:7,sections:[{id:'findings',title:'Findings',paragraphs:['An actual finding.']}]}, contract.projects.items);
  assert.equal(project.title,'Real title'); assert.equal(project.featured,true); assert.equal(project.displayOrder,7);
  assert.equal(normalizeContent({url:'https://example.com'},contract.projects.items.properties.overviewBlocks.items.properties.links.items).enabled,true);
  assert.equal(normalizeContent({enabled:false},contract.projects.items.properties.overviewBlocks.items.properties.links.items).enabled,false);
  assert.deepEqual(project.overviewBlocks,[]); assert.equal(project.cover,'');
  assert.deepEqual(project.sections[0].images,[]); assert.deepEqual(project.sections[0].bullets,[]);
  assert.equal(normalizeContent({},contract.profile).linkedinVerified,false);
});
test('public deployment uses the stable root and redirects old previews', () => {
  const workflow = readFileSync(new URL('../.github/workflows/publish.yml',import.meta.url),'utf8');
  assert.match(workflow,/PORTFOLIO_PREVIEW: 'false'/);
  assert.match(workflow,/PORTFOLIO_BASE_PATH: '\/Zhixian-personal-portfolio\/'/);
  assert.match(workflow,/path: public-artifact/);
  const script = readFileSync(new URL('../scripts/package-public.mjs',import.meta.url),'utf8');
  assert.match(script,/http-equiv="refresh"/);
  assert.match(script,/preview/);
});
test('CMS primitive lists add a scalar item rather than appending an empty array', () => {
  let count = 0;
  function check(fields) {
    for (const field of fields) {
      if (field.list && !['object','block'].includes(field.type)) {
        assert.ok(!Array.isArray(field.default), `Invalid new-item default: ${field.name}`);
        count++;
      }
      check(field.fields ?? []);
      for (const block of field.blocks ?? []) check(block.fields ?? []);
    }
  }
  cms.content.forEach(entry => check(entry.fields));
  assert.ok(count >= 9);
});
