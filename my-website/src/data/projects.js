// Side projects shown on /projects, newest first. Thumbnails live in public/projects/.
// `stack` and `learned` render as the two short lines under each story.
export const PROJECTS = [
  {
    slug: 'inbox-genie',
    title: 'Inbox Genie',
    date: '2026-05-22',
    tag: 'Hackathon',
    url: 'https://ikea-brand-voice-auditor-397812137944.europe-west2.run.app',
    image: '/projects/inbox-genie.jpg',
    story:
      'At a hackathon with IKEA, we asked: what if every marketing email got a second read from someone who had memorised the brand book? Inbox Genie is that someone. Drop in a newsletter screenshot and it scores it against a (fake, but very IKEA) tone-of-voice rulebook, pins each problem onto the image, and suggests a gentler rewrite. “!!! PREMIUM MEGA DEAL !!!” becomes “Make room for something new.” It’s a little over-designed for a two-day build, and I still love clicking the hotspots.',
    stack: 'Google AI Studio, Gemini, a made-up IKEA brand book, and a hackathon deadline.',
    learned: 'a model is only as tasteful as the rulebook you hand it.',
  },
  {
    slug: 'polaris-web',
    title: 'Polaris, round two',
    date: '2026-03-29',
    tag: 'Rebuild',
    url: 'https://polaris-web-397812137944.europe-west1.run.app',
    image: '/projects/polaris-web.jpg',
    story:
      'Same idea, a year later. I pulled Polaris out of Streamlit, split it into a real front end and back end, and gave it the interface it always deserved. The headline finally says what I’d been mumbling for a year: find the common ground hidden in diverse opinions. Putting it next to the original is a little embarrassing, in the best way.',
    stack: 'Next.js and React, a Python API, Postgres on Cloud SQL, Cloud Run, and Claude Code doing most of the typing this time.',
    learned: 'the second build is where you find out which parts of the idea were actually the idea.',
  },
  {
    slug: 'infotrail',
    title: 'InfoTrail',
    date: '2025-11-22',
    tag: 'Prototype',
    url: 'https://infotrail-app-397812137944.europe-west1.run.app',
    image: '/projects/infotrail.jpg',
    story:
      'I got a little obsessed with how claims travel: who said it first, who repeated it, where it got bent along the way. So I tried to build a fact-checker that walks the trail backwards. Drop in a PDF, a link or a single sentence, and it tells you what holds up. Looking at it now, it’s a little clunky (peak Streamlit), and I still like it.',
    stack: 'Streamlit, Gemini, and a lot of Cmd+C / Cmd+V between Claude and VS Code.',
    learned: 'the hard part of fact-checking isn’t finding sources. It’s deciding which ones you trust.',
  },
  {
    slug: 'polaris',
    title: 'Polaris',
    date: '2025-03-15',
    tag: 'Prototype',
    url: 'https://polaris-app-397812137944.europe-west1.run.app',
    image: '/projects/polaris-streamlit.jpg',
    story:
      'My first go at building something for democracy. I’d been reading about Audrey Tang and Pol.is, the tool Taiwan uses to find what a whole country quietly agrees on, and wanted to see if I could make a small one. You add a topic, people post opinions and vote agree or disagree, and Polaris sorts voters into blocs and hunts for the “bridge” opinions every bloc likes. The Divide Map, with its little dashed Bridge Zone in the middle, is still my favourite chart I’ve made. It’s dark-mode Streamlit with emoji in the sidebar, and I wouldn’t change a thing.',
    stack: 'Streamlit, scikit-learn clustering, Postgres on Cloud SQL, Gemini for the policy summaries, and lots of copy-paste.',
    learned: 'people agree on more than their feeds suggest. You just have to count differently.',
    writeup: '/writing/demo-polaris-finding-common-ground',
  },
];
