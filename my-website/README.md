# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Run App Locally
```console
npm run dev
```

---

## Codebase Summary

### Overview
Personal portfolio website for Alexander Wolfgang Humpert, featuring essays, products, and interviews focused on democracy, technology, and social issues.

### Project Structure
```
my-website/
├── src/
│   ├── App.jsx              # Main app with React Router routes
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles
│   ├── components/
│   │   ├── HeroSection.jsx  # Landing page with navigation
│   │   ├── Essays.jsx       # Essays listing page
│   │   ├── Products.jsx     # Products listing page
│   │   ├── Interviews.jsx   # Interviews listing page
│   │   └── essays/
│   │       ├── EssayTemplate.jsx  # Reusable essay layout
│   │       └── content/      # Individual essay components
│   │           ├── ACalltoDefendDemocracy.jsx
│   │           ├── AlgorithmsOfMassDivision.jsx
│   │           ├── DemocraTech.jsx
│   │           ├── DistortionMachine.jsx
│   │           └── PostPlatformSocialInternet.jsx
│   └── assets/              # Essay images and assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.cjs
└── postcss.config.cjs
```

### Tech Stack
| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | ^19.0.0 |
| Build Tool | Vite | ^6.1.0 |
| CSS | Tailwind CSS | ^4.0.7 |
| Routing | react-router-dom | ^6.22.0 |
| Icons | lucide-react | ^0.475.0 |
| Linting | ESLint | ^9.19.0 |

### Pages & Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HeroSection | Landing page with tagline and main navigation |
| `/Essays` | Essays | List of 5 published essays |
| `/Essays/a-call-to-defend-democracy` | ACalltoDefendDemocracy | Essay on defending democracy |
| `/Essays/algorithms-of-mass-division` | AlgorithmsOfMassDivision | Essay on social division algorithms |
| `/Essays/democraTech:-rebuilding-the-bridge-between-citizens-&-policy` | DemocraTech | Essay on democracy and technology |
| `/Essays/distortion-machine` | DistortionMachine | Essay on information distortion |
| `/Essays/post-platform-social-internet` | PostPlatformSocialInternet | Essay on post-platform social internet |
| `/Products` | Products | List of products (Polaris consensus platform) |
| `/Interviews` | Interviews | List of interviews (YouTube links) |

### Key Features
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS
- **Dynamic Routing**: React Router for SPA navigation
- **Consistent Styling**: Playfair Display font family throughout
- **Hover Effects**: Subtle color transitions on interactive elements
- **Back Navigation**: Arrow icons for returning to previous pages

### Available Scripts
```console
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```