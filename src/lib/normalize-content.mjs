// Pages CMS removes empty fields when saving. Restore neutral defaults at render time.
export function normalizeContent(value, schema) {
  if (schema.type === 'array') return (value ?? []).map(item => normalizeContent(item, schema.items));
  if (schema.type === 'object') return Object.fromEntries(Object.entries(schema.properties).map(([key, definition]) => [key, key === 'verified' && value?.[key] == null ? true : normalizeContent(value?.[key], definition)]));
  if (value != null) return value;
  if (schema.type === 'boolean') return false;
  if (schema.type === 'integer' || schema.type === 'number') return 0;
  return '';
}
