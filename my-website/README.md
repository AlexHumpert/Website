# Alexander Humpert — Personal Site

Personal portfolio and writing hub. Built with React + Vite + Tailwind CSS.

## Run locally

```bash
npm run dev        # http://localhost:5173
npm run build      # production build
npm run preview    # preview production build
```

---

## Tech stack

| Category   | Technology       | Version    |
|------------|------------------|------------|
| Framework  | React            | ^19.0.0    |
| Build      | Vite             | ^6.1.0     |
| CSS        | Tailwind CSS     | ^4.0.7     |
| Routing    | react-router-dom | ^6.22.0    |
| Icons      | lucide-react     | ^0.475.0   |

## Site structure

| Route               | Description                                       |
|---------------------|---------------------------------------------------|
| `/`                 | Homepage — hero + previews of all four sections   |
| `/writing`          | Writing index (links out to Substack, LinkedIn)   |
| `/work`             | Work index with tag filter                        |
| `/work/:slug`       | Individual case study page                        |
| `/projects`         | Side projects index                               |
| `/projects/:slug`   | Individual project page                           |
| `/community`        | Community index (hackathons, talks, meetups)      |

## Design system

- **Colors:** OKLCH throughout; four orb palettes (hero, writing, work, projects, community)
- **Fonts:** Gloock (hero display only) + Onest variable (everything else)
- **Orbs:** Radial gradient divs, `filter: blur(80px)`, animated with CSS keyframes; one per section, each bleeding off a different edge
- **Tokens:** `src/index.css` root variables — type scale, spacing, z-index, easing

---

## Backlog

### Writing

- [ ] Replace placeholder `href="#"` links with real Substack URLs
- [ ] Build out `/writing` index page with full list of posts
- [ ] Add LinkedIn and Twitter/X as platform badge options alongside Substack
- [ ] Support filtering by platform on the `/writing` page

---

### Work

The work section covers three distinct types of engagements, each tagged:

1. **Internal enablement** — Training and upskilling colleagues to use AI effectively across data, creative, strategy, and value engineering roles
2. **Client work** — End-to-end workflow transformations: process mapping, identifying agentic moments, building and deploying solutions with the Agentic Lab product engineering team
3. **Inspiration sessions** — Forward-looking presentations on the future of customer experiences: generative engine optimization (GEO), branded ChatGPT-powered experiences, branded voice agents

**Planned work page features:**

- [ ] Build `/work` index page with a feed-style list of case studies
- [ ] Add tag system: each item tagged with one of `Internal enablement`, `Client work`, or `Inspiration session`
- [ ] Add three filter buttons at the top of the `/work` page — clicking one filters the feed to that tag only; all three active by default (show all)
- [ ] Build individual `/work/:slug` case study pages with anonymized project details
- [ ] Populate with real (anonymized) projects across all three categories

---

### Projects

- [ ] Build `/projects` index page
- [ ] Build individual `/projects/:slug` pages with product screenshots and demo links
- [ ] Replace placeholder items with real side projects

---

### Community

The community section covers organizing and speaking work, primarily through the Google Guild and VML MAP:

**Google Guild / AI Hackathons (organized four so far at VML MAP):**
1. Hackathon 1 — General onboarding: getting participants hands-on with Google Cloud
2. Hackathon 2 — Process Automation: building automation tools on Google Cloud
3. Hackathon 3 — (details to be filled in)
4. Hackathon 4 — (details to be filled in)

All hackathons share the same goal: hands-on learning with Google Cloud, deploying real applications, and using the AI / Gemini APIs.

The Google Guild itself is a group of Google Cloud enthusiasts who help others learn the technology, get certified, and create videos and presentations showing real-world use cases.

**Planned community page features:**

- [ ] Build `/community` index page with full event list (currently placeholder items on homepage)
- [ ] Build individual `/community/:slug` pages for each hackathon with full descriptions: format, participants, themes, outcomes, what participants built
- [ ] Add a tag system: `Organizer` vs `Speaker` (already on homepage preview; carry forward to index)
- [ ] Add Google Guild as a standing entry with its own description page
- [ ] Link to LinkedIn posts for events that have them
- [ ] Replace all placeholder `href="#"` links with real LinkedIn / event page URLs

---

### Global / infrastructure

- [ ] Set up deployment (Vercel or Netlify recommended for Vite SPA)
- [ ] Add `og:image`, `og:title`, `og:description` meta tags per page for social sharing
- [ ] Add favicon
- [ ] Confirm `npm run dev` works after clean `node_modules` install (rollup optional deps bug — fixed once; may recur after future npm installs)
