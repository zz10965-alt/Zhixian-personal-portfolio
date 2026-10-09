import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalizeContent } from '../src/lib/normalize-content.mjs';
const contract = JSON.parse(readFileSync(new URL('../docs/cms-content-schema.json', import.meta.url))).$defs;
const read = name => normalizeContent(JSON.parse(readFileSync(new URL(`../src/content/${name}.json`, import.meta.url))), contract[name]);
test('profile and education records remain usable after CMS edits', () => {
  const profile = read('profile');
  assert.ok(profile.name && profile.headlineLead && profile.introduction);
  assert.ok(Array.isArray(profile.interests));
  for (const entry of read('education')) {
    assert.ok(entry.id && entry.university && entry.degree && entry.start && entry.end);
    if (entry.gpa) assert.match(entry.gpa, /\d.*\/.*\d/);
    assert.ok(Array.isArray(entry.coursework));
  }
});
