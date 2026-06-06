# Design

## Theme

Light. Pure white background — no warm tint, no cream. The orbs carry all the warmth. Visitor context: someone sitting at a desk, ambient daylight, curious and calm. Light mode is correct; the white surface lets the gradient orbs glow.

Color strategy: **Committed.** The warm gradient orbs occupy 30–60% of visible space on each section. Background and typography are neutral so the orbs read clearly.

## Color Palette

All values in OKLCH.

```css
:root {
  /* Base */
  --bg:        oklch(1.000 0.000 0);       /* pure white — orbs carry all warmth */
  --surface:   oklch(0.975 0.000 0);       /* barely-off-white, cards / subtle panels */
  --border:    oklch(0.900 0.000 0);       /* light gray dividers */

  /* Text */
  --ink:       oklch(0.180 0.008 27);      /* near-black with faint coral warmth */
  --muted:     oklch(0.500 0.008 27);      /* secondary text — ≥3.5:1 vs --bg */

  /* Brand (used for interactive elements, not orbs) */
  --primary:   oklch(0.620 0.185 27);      /* coral-red — links, CTAs */
  --primary-fg: oklch(1.000 0.000 0);      /* white text on primary fills */

  /* Orb palette — each section gets one orb */
  /* Orbs are radial-gradient blobs, blurred, positioned absolutely */

  /* Hero orb: coral → warm orange (Meridian reference) */
  --orb-hero-inner:   oklch(0.600 0.200 22);
  --orb-hero-outer:   oklch(0.720 0.175 50);

  /* Writing orb: amber → warm yellow */
  --orb-writing-inner: oklch(0.760 0.170 55);
  --orb-writing-outer: oklch(0.840 0.135 80);

  /* Work orb: deep red → coral */
  --orb-work-inner:   oklch(0.540 0.185 15);
  --orb-work-outer:   oklch(0.680 0.165 35);

  /* Projects orb: purple-mauve → coral (art festival reference) */
  --orb-projects-inner: oklch(0.540 0.135 320);
  --orb-projects-outer: oklch(0.670 0.160 30);
}
```

## Typography

One family: **Onest** (variable, Google Fonts). Weight contrast carries all hierarchy. No secondary typeface except the hero display heading, which uses **Gloock** (Google Fonts, contemporary editorial serif) for a single high-impact moment.

```css
/* Google Fonts import */
/* @import url('https://fonts.googleapis.com/css2?family=Gloock&family=Onest:wght@100..900&display=swap'); */

:root {
  --font-display: 'Gloock', Georgia, serif;      /* hero heading only */
  --font-body:    'Onest', system-ui, sans-serif; /* everything else */

  /* Type scale — fluid, clamp(), 1.333 major-third ratio */
  --text-xs:   clamp(0.694rem, 0.67rem + 0.12vw, 0.75rem);
  --text-sm:   clamp(0.833rem, 0.80rem + 0.17vw, 0.938rem);
  --text-base: clamp(1rem,     0.95rem + 0.25vw, 1.125rem);
  --text-lg:   clamp(1.200rem, 1.14rem + 0.30vw, 1.375rem);
  --text-xl:   clamp(1.440rem, 1.36rem + 0.40vw, 1.688rem);
  --text-2xl:  clamp(1.728rem, 1.62rem + 0.54vw, 2.063rem);
  --text-3xl:  clamp(2.074rem, 1.93rem + 0.72vw, 2.563rem);
  --text-4xl:  clamp(2.488rem, 2.30rem + 0.94vw, 3.188rem);
  --text-hero: clamp(3.2rem,   5vw + 1rem, 5.5rem); /* Gloock display — hero only */
}

/* Font weight tokens */
/* Thin: 100, Light: 300, Regular: 400, Medium: 500, Semibold: 600, Bold: 700 */
```

**Usage rules:**
- Hero h1: Gloock, var(--text-hero), weight 400 (the serif carries weight visually)
- Section headings (h2): Onest, var(--text-3xl), weight 300 (light — the orb is the visual mass)
- Subsection headings (h3): Onest, var(--text-xl), weight 500
- Body / card body: Onest, var(--text-base), weight 400, max 68ch line length
- Labels / metadata: Onest, var(--text-xs), weight 500, NO all-caps for body labels
- Nav links: Onest, var(--text-sm), weight 400

## Orb Component

The orbs are the brand. Each is an absolutely-positioned div, 500–700px diameter, `border-radius: 50%`, radial gradient from inner to outer color (both defined above), `filter: blur(80px)`, `opacity: 0.85`, `pointer-events: none`.

Orbs animate with a slow drift: `@keyframes orbFloat` translates X/Y ±20px over 8–12s, `ease-in-out`, infinite alternate. `@media (prefers-reduced-motion: reduce)` removes the transform animation, keeps the static orb in place.

Orb positioning is asymmetric per section — never centered. Typical positions: top-right, bottom-left, right-center. Orbs bleed off-screen edges intentionally.

Each section wrapper has `position: relative; overflow: hidden` to contain the orb within the section bounds.

## Layout & Spacing

```css
:root {
  /* Spacing scale */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Container */
  --container-max: 1200px;
  --container-pad: clamp(1.5rem, 5vw, 6rem);

  /* Z-index scale */
  --z-base:    0;
  --z-orb:    -1;   /* orbs sit behind content */
  --z-content: 1;
  --z-nav:    10;
  --z-modal:  50;
  --z-toast:  60;
}
```

**Layout rules:**
- Max content width: 1200px, centered, fluid padding
- Single-column narrative sections, not grid cards
- Section min-height: 100vh for hero, 70–80vh for content sections
- Generous vertical rhythm: sections separated by var(--space-32) minimum
- Text blocks max 68ch, positioned left-of-center with orb occupying right side (or inverse)

## Motion

Primary animation: orb drift. Slow, continuous, barely perceptible.

```css
@keyframes orbFloat {
  from { transform: translate(0, 0); }
  to   { transform: translate(20px, -20px); }
}

@media (prefers-reduced-motion: reduce) {
  .orb { animation: none; }
}
```

Secondary animations:
- Page transitions: opacity 0→1, 300ms ease-out
- Link/nav hover: color transition 150ms ease-out
- Card hover (if cards are used): subtle translateY(-2px), 200ms ease-out

No scroll-triggered entrance animations on content — content is visible by default. The orb drift is the only continuous motion on the page.

## Components

### Navigation
Fixed top nav. Minimal: name left, three links right (Writing, Work, Projects). Transparent bg with subtle backdrop when scrolled. No border, no shadow — the nav floats above content.

### Writing feed items
Not cards. A horizontal rule between items, title in Onest medium, platform badge (small pill: "Substack", "Twitter", "LinkedIn") inline with the date, external link arrow icon. No image thumbnails.

### Work / Project entries (index)
Large typography titles, brief one-line description, year. Click through to full case study page. No card borders or shadows.

### Case study pages (/work/[slug], /projects/[slug])
Minimal nav back to parent. Own orb (carries the section's orb color). Title large, then prose sections. Screenshots presented full-width or in a simple 2-column grid when comparing states.

## Anti-patterns to avoid

- Warm/cream background tint — bg is pure white only
- Gradient text (background-clip: text) — orbs are the gradient, text is solid --ink
- Cards with drop shadows or border-radius stacks
- Eyebrow labels above every section heading
- Numbered section markers (01 / 02 / 03)
- Orbs centered — they should always bleed off one edge
