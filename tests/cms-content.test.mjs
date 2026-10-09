import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const document = name => JSON.parse(readFileSync(new URL(`../src/content/${name}.json`, import.meta.url)));
const read = name => document(name).items ?? document(name);
const schema = JSON.parse(readFileSync(new URL('../docs/cms-content-schema.json', import.meta.url)));
function check(value, definition, path) {
  if (Array.isArray(value)) { assert.equal(definition.type, 'array', path); value.forEach((item, index) => check(item, definition.items, `${path}[${index}]`)); }
  else if (value && typeof value === 'object') {
    assert.equal(definition.type, 'object', path);
    for (const [key, item] of Object.entries(value)) { assert.ok(definition.properties[key], `Unmapped CMS field ${path}.${key}`); check(item, definition.properties[key], `${path}.${key}`); }
    for (const key of definition.required ?? []) assert.ok(key in value, `${path}.${key}`);
  } else {
    assert.equal(typeof value, definition.type === 'integer' ? 'number' : definition.type, path);
    if (definition.enum) assert.ok(definition.enum.includes(value), path);
    if (definition.maxLength) assert.ok(value.length <= definition.maxLength, path);
    if (definition.minimum !== undefined) assert.ok(value >= definition.minimum, path);
  }
}
test('CMS contract covers all content fields and presentation controls', () => {
  for (const name of ['site','profile','education','categories','experience','projects','dashboards']) check(document(name), schema.$defs[name], name);
  for (const name of ['experience','projects','dashboards']) for (const item of read(name)) { assert.equal(typeof item.featured, 'boolean'); assert.ok(Number.isInteger(item.displayOrder)); }
});
test('all content media and document references are present; links use safe schemes', () => {
  const mediaKeys = new Set(['photo','image','logo','cover','preview','src','resume','professionalPortrait','favicon']);
  function walk(value, key = '') {
    if (Array.isArray(value)) return value.forEach(item => walk(item));
    if (value && typeof value === 'object') return Object.entries(value).forEach(([name,item]) => walk(item,name));
    if (typeof value !== 'string' || !value) return;
    if (mediaKeys.has(key) || ['url','publicUrl','github','linkedin'].includes(key)) {
      assert.ok(/^https:\/\//.test(value) || /^\/(?!\/)/.test(value), `Unsafe resource: ${value}`);
      if (value.startsWith('/')) assert.ok(existsSync(new URL(`../public${value}`, import.meta.url)), `Missing asset: ${value}`);
    }
  }
  for (const name of ['profile','education','experience','projects','dashboards']) walk(read(name));
  walk(read('site').favicon,'favicon');
});
