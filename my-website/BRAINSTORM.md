# Brainstorm

Loose ideas for the site. Nothing here is decided — move an idea into DESIGN.md or CLAUDE.md once it's committed to.

## Annnimate (by Good Fella) — GSAP component library

Spotted 2026-11-16. Production-grade GSAP components for React, Vue and plain HTML/CSS/JS. Free starter pack, one new free component a week, no attribution required.

Worth browsing for "cool experience" moments, e.g.:
- Text reveals for the hero line or essay titles
- Hover interactions on Library cards and Work entries
- Page transitions between sections
- Something tactile for the night-sky layer

Check against DESIGN.md before adopting anything: motion should stay quiet (no bouncing or pulsing, no scroll-triggered entrance animations on content) and respect `prefers-reduced-motion`. Pick one or two signature moments rather than animating everything. GSAP would be a new dependency — weigh its bundle size.
