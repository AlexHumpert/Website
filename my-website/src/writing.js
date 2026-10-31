import writing from './data/writing.json';

// Synced from Substack with `npm run sync` (also runs before every build).
export const POSTS = [...writing].sort((a, b) => b.date.localeCompare(a.date));

// Post bodies are loaded on demand, so the index pages don't ship every essay.
const BODIES = import.meta.glob('./data/posts/*.html', { query: '?raw', import: 'default' });

export function loadPostHtml(slug) {
  const load = BODIES[`./data/posts/${slug}.html`];
  return load ? load() : Promise.resolve(null);
}

export const postDate = (date, options = { day: 'numeric', month: 'long', year: 'numeric' }) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', options);
