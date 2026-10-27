#!/usr/bin/env node
// Adds a video, article or book to the Library page.
//   npm run add -- <url> ["optional one-line note"]
//   npm run add -- --book "<title>" "<author>" ["optional one-line note"]
// YouTube links use oEmbed; everything else is read from the page's Open Graph tags.

import { readFile, writeFile } from 'node:fs/promises';

const DATA_PATH = new URL('../src/data/library.json', import.meta.url);
const args = process.argv.slice(2);
const isBook = args[0] === '--book';
const [url, note] = isBook ? [] : args;

if (isBook ? !args[1] || !args[2] : !url) {
  console.error('Usage: npm run add -- <url> ["note"]\n       npm run add -- --book "<title>" "<author>" ["note"]');
  process.exit(1);
}

function youtubeId(link) {
  const match = link.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|live\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  return match?.[1] ?? null;
}

function metaTag(html, key) {
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${key}["']`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decode(match[1]);
  }
  return null;
}

function decode(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

async function fromYouTube(id) {
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`);
  if (!res.ok) throw new Error(`YouTube oEmbed failed (${res.status})`);
  const data = await res.json();
  return {
    type: 'video',
    title: data.title,
    source: data.author_name,
    url: watchUrl,
    youtubeId: id,
  };
}

async function fromArticle(link) {
  const res = await fetch(link, { headers: { 'User-Agent': 'Mozilla/5.0 (library-bot)' } });
  if (!res.ok) throw new Error(`Fetching article failed (${res.status})`);
  const html = await res.text();
  const host = new URL(link).hostname.replace(/^www\./, '');
  const title = metaTag(html, 'og:title') ?? decode(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? host);
  return {
    type: 'article',
    title,
    source: metaTag(html, 'og:site_name') ?? metaTag(html, 'author') ?? host,
    url: link,
    excerpt: metaTag(html, 'og:description') ?? metaTag(html, 'description') ?? undefined,
    image: metaTag(html, 'og:image') ?? undefined,
  };
}

function fromBook(title, author) {
  return {
    type: 'book',
    title,
    source: author,
    url: `https://www.goodreads.com/search?q=${encodeURIComponent(`${title} ${author}`)}`,
  };
}

const id = isBook ? null : youtubeId(url);
const entry = isBook ? fromBook(args[1], args[2]) : id ? await fromYouTube(id) : await fromArticle(url);
entry.date = new Date().toISOString().slice(0, 10);
const entryNote = isBook ? args[3] : note;
if (entryNote) entry.note = entryNote;

const items = JSON.parse(await readFile(DATA_PATH, 'utf8'));
if (items.some((item) => item.url === entry.url)) {
  console.error(`Already in the library: ${entry.title}`);
  process.exit(1);
}
items.unshift(entry);
await writeFile(DATA_PATH, JSON.stringify(items, null, 2) + '\n');
console.log(`Added ${entry.type}: ${entry.title} — ${entry.source}`);
