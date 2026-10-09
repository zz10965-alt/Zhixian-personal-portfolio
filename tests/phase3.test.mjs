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
    if (nested.type === 'object') covered(nested, field.fields, `${path}.${field.name}`);
  }
}
test('visual CMS covers every current field and both upload libraries', () => {
  assert.equal(cms.content.length, Object.keys(contract).length);
  for (const entry of cms.content) {
    assert.equal(entry.type, 'file'); assert.equal(entry.format, 'json');
    assert.equal(entry.path, `src/content/${entry.name}.json`);
    if (contract[entry.name].type === 'array') assert.equal(entry.list, true);
    covered(contract[entry.name], entry.fields, entry.name);
  }
  assert.deepEqual(cms.media.map(media => [media.input,media.output]), [['public/images','/images'],['public/documents','/documents']]);
});
test('CMS omission of empty fields restores rendering defaults without losing real content', () => {
  const project = normalizeContent({id:'sample',title:'Real title',featured:true,displayOrder:7,sections:[{id:'findings',title:'Findings',paragraphs:['An actual finding.']}]}, contract.projects.items);
  assert.equal(project.title,'Real title'); assert.equal(project.featured,true); assert.equal(project.displayOrder,7);
  assert.equal(normalizeContent({url:'https://example.com'},contract.projects.items.properties.resources.items).verified,true);
  assert.equal(normalizeContent({verified:false},contract.projects.items.properties.resources.items).verified,false);
  assert.deepEqual(project.resources,[]); assert.equal(project.cover,'');
  assert.deepEqual(project.sections[0].images,[]); assert.deepEqual(project.sections[0].bullets,[]);
  assert.equal(normalizeContent({},contract.profile).linkedinVerified,false);
});
test('only the isolated temporary preview is packaged for deployment', () => {
  const workflow = readFileSync(new URL('../.github/workflows/preview.yml',import.meta.url),'utf8');
  assert.match(workflow,/PORTFOLIO_PREVIEW: 'true'/);
  assert.match(workflow,/PORTFOLIO_BASE_PATH: '\/Zhixian-personal-portfolio\/preview\/'/);
  const script = readFileSync(new URL('../scripts/package-preview.mjs',import.meta.url),'utf8');
  assert.match(script,/preview-artifact\/preview/); assert.match(script,/final public website has not launched/); assert.match(script,/noindex/);
});
