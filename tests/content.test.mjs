import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = name => JSON.parse(readFileSync(new URL(`../src/content/${name}.json`, import.meta.url)));
test('Phase 1 content preserves documented education and missing-resource states', () => {
  const profile = read('profile');
  const education = read('education');
  assert.equal(profile.name, 'Freya Zhang');
  assert.deepEqual(profile.interests.map(item => item.title), ['Photography', 'Travel', 'Gaming', 'Video Creation', 'Vibe Coding']);
  assert.equal(profile.resume, '');
  assert.equal(profile.linkedin, '');
  assert.equal(education.length, 2);
  assert.equal(education[0].gpa, '3.48 / 5.0');
  assert.equal(education[1].gpa, '3.92 / 4.0');
  assert.match(education[1].end, /expected/);
  for (const entry of education) assert.ok(entry.coursework.length > 0);
});
