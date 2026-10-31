#!/usr/bin/env node
// Pulls posts from the Substack feed into the Writing page.
//   npm run sync            fetch the feed, update src/data/writing.json + src/data/posts/*.html
//   npm run sync -- --soft  same, but a failed fetch only warns (used before builds)
// Posts are merged by slug and never deleted, so posts that drop out of the feed stay.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import sanitizeHtml from 'sanitize-html';

const FEED_URL = 'https://ahumpert.substack.com/feed';
const INDEX_PATH = new URL('../src/data/writing.json', import.meta.url);
const POSTS_DIR = new URL('../src/data/posts/', import.meta.url);
const WORDS_PER_MINUTE = 230;
const soft = process.argv.includes('--soft');

// Reads one tag's text from a block of feed XML, unwrapping CDATA.
function tag(xml, name) {
  const match = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  if (!match) return null;
  const text = match[1].trim();
  const cdata = text.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  return cdata ? cdata[1] : decode(text);
}

function decode(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

const hasClass = (frame, name) => (frame.attribs.class ?? '').split(/\s+/).includes(name);

// Keeps the writing and drops Substack's chrome: subscribe widgets, image
// buttons, inline styles and empty paragraphs.
function clean(html) {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'br', 'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code',
      'strong', 'b', 'em', 'i', 'u', 's', 'sub', 'sup', 'a', 'ul', 'ol', 'li',
      'figure', 'figcaption', 'img', 'div', 'span', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    allowedAttributes: {
      a: ['href', 'id', 'class', 'target', 'rel'],
      img: ['src', 'srcset', 'sizes', 'alt', 'width', 'height', 'loading', 'decoding'],
      div: ['id', 'class'],
      ol: ['start'],
    },
    allowedClasses: {
      a: ['footnote-anchor', 'footnote-number'],
      // The last two are only allowed so exclusiveFilter can see them and drop the element.
      div: ['footnote', 'footnote-content', 'pullquote', 'captioned-image-container', 'subscription-widget-wrap-editor', 'image-link-expand'],
    },
    allowedSchemes: ['https', 'http', 'mailto'],
    exclusiveFilter: (frame) =>
      ['button', 'svg', 'form', 'picture-source'].includes(frame.tag) ||
      hasClass(frame, 'subscription-widget-wrap-editor') ||
      hasClass(frame, 'image-link-expand') ||
      (frame.tag === 'p' && !frame.text.trim() && !frame.mediaChildren.length),
    transformTags: {
      // The image link only opens the full-size file in a new tab — keep the image, drop the link.
      a: (tagName, attribs) => {
        if (hasClass({ attribs }, 'image-link')) return { tagName: 'div', attribs: {} };
        if (attribs.href?.startsWith('#')) return { tagName, attribs: { ...attribs, target: '_self' } };
        return { tagName, attribs: { ...attribs, target: '_blank', rel: 'noopener noreferrer' } };
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: 'lazy', decoding: 'async', alt: attribs.alt ?? '' },
      }),
    },
  }).trim();
}

function words(html) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).split(/\s+/).filter(Boolean).length;
}

function parseItem(xml) {
  const url = tag(xml, 'link');
  const html = clean(tag(xml, 'content:encoded') ?? '');
  const image = xml.match(/<enclosure[^>]+url="([^"]+)"/)?.[1];
  return {
    slug: new URL(url).pathname.split('/').filter(Boolean).pop(),
    title: tag(xml, 'title'),
    subtitle: tag(xml, 'description') || undefined,
    date: new Date(tag(xml, 'pubDate')).toISOString().slice(0, 10),
    url,
    image: image ? decode(image) : undefined,
    author: tag(xml, 'dc:creator') ?? undefined,
    minutes: Math.max(1, Math.round(words(html) / WORDS_PER_MINUTE)),
    html,
  };
}

let feed;
try {
  const res = await fetch(FEED_URL, { headers: { 'User-Agent': 'Mozilla/5.0 (writing-sync)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  feed = await res.text();
} catch (error) {
  const message = `Couldn't fetch the Substack feed (${error.message}).`;
  if (soft) {
    console.warn(`${message} Building with the posts already saved.`);
    process.exit(0);
  }
  console.error(message);
  process.exit(1);
}

const publication = tag(feed.split('<item>')[0], 'title');
const fetched = [...feed.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => parseItem(match[1]));

let saved = [];
try {
  saved = JSON.parse(await readFile(INDEX_PATH, 'utf8'));
} catch {
  // First sync — nothing saved yet.
}

await mkdir(POSTS_DIR, { recursive: true });
const bySlug = new Map(saved.map((post) => [post.slug, post]));
let added = 0;
let updated = 0;

for (const { html, ...post } of fetched) {
  const entry = { ...post, publication };
  const previous = bySlug.get(post.slug);
  const htmlPath = new URL(`${post.slug}.html`, POSTS_DIR);
  const previousHtml = await readFile(htmlPath, 'utf8').catch(() => null);

  if (!previous) added++;
  else if (previousHtml !== html || JSON.stringify(previous) !== JSON.stringify(entry)) updated++;

  bySlug.set(post.slug, entry);
  if (previousHtml !== html) await writeFile(htmlPath, `${html}\n`);
}

const posts = [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date));
await writeFile(INDEX_PATH, `${JSON.stringify(posts, null, 2)}\n`);
console.log(`Synced ${publication}: ${added} new, ${updated} updated, ${posts.length} posts in total.`);
