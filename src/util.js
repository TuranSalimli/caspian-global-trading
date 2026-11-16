// Returns text for the current language; plain strings are returned as-is.
export const tx = (v, lang) => (v && typeof v === 'object' ? v[lang] || v.en || '' : v ?? '')
