#!/usr/bin/env node
// Runs after `vite build`. Link previews (iMessage, LinkedIn, X…) don't run
// JavaScript, so each post gets its own dist/writing/<slug>/index.html with
// the post's title, description, image and canonical link baked in.

import { mkdir, readFile, writeFile } from 'node:fs/promises';

const DIST = new URL('../dist/', import.meta.url);
const posts = JSON.parse(await readFile(new URL('../src/data/writing.json', import.meta.url), 'utf8'));
const shell = await readFile(new URL('index.html', DIST), 'utf8');

const escape = (text = '') =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

for (const post of posts) {
  const title = `${post.title} — Alexander Humpert`;
  const tags = [
    `<meta name="description" content="${escape(post.subtitle)}" />`,
    `<link rel="canonical" href="${escape(post.url)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:title" content="${escape(post.title)}" />`,
    `<meta property="og:description" content="${escape(post.subtitle)}" />`,
    post.image && `<meta property="og:image" content="${escape(post.image)}" />`,
    `<meta property="article:published_time" content="${post.date}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].filter(Boolean);

  const html = shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>\n    ${tags.join('\n    ')}`);

  const dir = new URL(`writing/${post.slug}/`, DIST);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL('index.html', dir), html);
}

console.log(`Prerendered link previews for ${posts.length} posts.`);
