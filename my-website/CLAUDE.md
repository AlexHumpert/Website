# Personal Portfolio Website — CLAUDE.md

## Project Overview

Personal portfolio site for Alexander Humpert. A landing page that previews three sections, each with its own dedicated page. Editorial voice, not political. Built with React + Vite + Tailwind.

## Tech Stack

- **Framework:** React 19 + React Router v6
- **Build:** Vite
- **Styling:** Tailwind CSS (v4) + PostCSS
- **Icons:** lucide-react
- **Typography:** Playfair Display (serif, Google Fonts)
- **Deploy:** TBD

## Site Structure

### `/` — Homepage
Single scrolling landing page with:
- Hero section (name, short editorial tagline — placeholder for now)
- Preview section: Writing
- Preview section: Work
- Preview section: Side Projects

### `/writing` — Writing & Notes
A unified feed of all public writing across platforms. Each item is a card that links out to the original post — no content is hosted here. Sources:
- Substack (long-form essays — the existing 5 essays will be migrated to Substack links)
- Twitter/X
- LinkedIn

Cards show: title/excerpt, platform badge, date, external link.

### `/work` — Work Portfolio
Case studies of professional projects, made platform/company-agnostic. Each project gets its own page (`/work/[slug]`). Format: consultant-style write-up + product screenshots/demos.

### `/projects` — Side Projects
Personal and entrepreneurial side projects. Each gets its own page (`/projects/[slug]`). Format similar to work portfolio.

## Design Direction

- **Voice:** Editorial, curious, personal — not political
- **Feel:** Clean, typographic, high taste — inspired by impeccable + Emil Kowalski design philosophy
- **Color:** Start minimal (black/white/off-white), accent color TBD
- **Typography:** Playfair Display for headings, clean sans-serif for body
- **Animations:** Subtle, purposeful — hover states, transitions, nothing gratuitous

## Content Policy

All content is placeholder text during initial build. Real content will be added per section:
- Writing: Substack/Twitter/LinkedIn links (no content stored in repo)
- Work: Anonymized case studies with placeholder copy and screenshots
- Side Projects: Placeholder copy and links

## What Was Here Before

The old site had:
- A centered hero with "A democracy, if we can keep it" headline
- Three nav links: Essays, Products, Interviews
- 5 essays stored as full JSX components (to be replaced by Substack links in /writing)
- Products and Interviews pages (stub/empty)

These are being replaced wholesale. The essay JSX components under `src/components/essays/` can be deleted once the /writing section is live.

## Development Notes

- Inline styles are used inconsistently throughout the old code — migrate everything to Tailwind classes
- Route casing was inconsistent (`/Essays` vs `/essays`) — use lowercase routes going forward
- `console.log('App is rendering')` in App.jsx should be removed
