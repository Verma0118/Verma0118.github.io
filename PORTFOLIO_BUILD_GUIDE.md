# Engineering Portfolio: Build Guide

Hand this file to Claude Code and say: "Build me a portfolio like this, but with my content." Everything needed to recreate the site is below: stack, design system, structure, every feature, the 3D model pipeline, the deploy setup, and the mistakes to avoid. Replace the content (name, projects, photo, resume) with your own.

Live reference: https://verma0118.github.io
Source: https://github.com/Verma0118/Verma0118.github.io

---

## 1. What the site is

A static single-page engineering portfolio for an aerospace student. Recruiters and engineers land on it, so the goals were:

1. Show real CAD work as interactive 3D models people can rotate, not screenshots.
2. Load fast and cost nothing to host (GitHub Pages).
3. Keep all content in one data file so updating is a five-minute edit.
4. Look calm and technical, not like a template.

Sections on the home page, in order: Hero, Hardware Design (featured), Engineering Projects (grid), Software Projects, Simulation and Analysis, About, Contact. A second page, Class Projects, holds a grid of coursework CAD models.

## 2. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 + TypeScript | Familiar, typed content |
| Build | Vite 6 | Instant dev server, tiny config |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) | No PostCSS config needed in v4 |
| Motion | `framer-motion` | Scroll reveals, carousel state |
| Routing | `wouter` | 2 KB router, two routes only |
| Forms | `react-hook-form` + `zod` | Validated contact form |
| Icons | `lucide-react` | Already in the project, one icon family |
| 3D | Google `<model-viewer>` web component, loaded from CDN | Drag-to-rotate GLB viewer with no WebGL code to write |
| Contact backend | Web3Forms (free API key, public by design) | Static site, no server |
| Hosting | GitHub Pages, deployed by GitHub Actions | Free, deploys on every push to `main` |

Scaffold command:

```bash
npm create vite@latest portfolio -- --template react-ts
cd portfolio
npm i framer-motion wouter react-hook-form @hookform/resolvers zod lucide-react clsx tailwind-merge class-variance-authority
npm i -D tailwindcss @tailwindcss/vite @tailwindcss/typography tw-animate-css @types/node
```

`vite.config.ts` needs the React plugin, the Tailwind plugin, and an `@` alias to `src`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
  build: { outDir: "dist", emptyOutDir: true },
});
```

Add the same alias to `tsconfig.json` (`"paths": { "@/*": ["./src/*"] }`).

## 3. File structure

```
index.html                         model-viewer CDN script, fonts, SPA redirect snippet, meta tags
public/
  404.html                         GitHub Pages SPA fallback (see section 9)
  photo.jpg                        about-section portrait
  resume.pdf, Aarav_Verma_Portfolio.pdf
  glb/                             every 3D model
src/
  main.tsx                         React root
  App.tsx                          router: "/" and "/class-projects"
  index.css                        Tailwind import, theme tokens, global styles
  data/portfolio.ts                ALL content lives here
  pages/home.tsx                   the whole home page
  pages/class-projects.tsx         coursework model grid
  components/layout/public-layout.tsx   fixed nav, mobile menu, footer
  components/ui/model-viewer-wrapper.tsx   one 3D viewer with loading and error states
  components/ui/project-carousel.tsx       featured card whose viewer cycles through several models
  components/ui/scroll-fade.tsx            reveal-on-scroll wrapper
  components/ui/fractal-background.tsx     hero canvas animation
.github/workflows/deploy.yml       build and publish to Pages
```

Rule: no content strings inside components if they can live in `portfolio.ts`. Components map over the arrays.

## 4. Design system

### Feel
Calm, technical, editorial. Dark olive hero, alternating light and dark sections, one serif display font against a clean sans body, sharp corners, thin borders, almost no shadows. It should feel like an engineering drawing set, not a SaaS landing page.

### Palette (CSS variables in `index.css`, HSL)
| Role | Hex | Use |
|---|---|---|
| Background | `#1a1e16` | Page and dark sections (deep olive) |
| Card | `#232820` | Raised surfaces on dark |
| Border | `#2e3328` | All hairlines on dark |
| Foreground | `#f5f4f0` | Text on dark, primary buttons (cream) |
| Muted text | `#8a8f84` | Secondary text on dark |
| Light section bg | `#eeecea` | Light sections |
| Light card | `#e4e2de` | Cards on light |
| Light border | `#d0cec9` | Hairlines on light |
| Light text | `#111110` / `#6b6966` | Headings / body on light |
| Accent | `#e8a33d` | Amber, pulled from the drone propellers in the 3D model. Used only for active states, arrows, focus rings |

Accent discipline: exactly one accent, used sparingly. Everything else is neutral olive and cream.

### Type
- Display: Cormorant Garamond, weight 400 only. Used for all headings, project titles, the name in the hero.
- Body: Inter, 300 to 600.
- Headings are large and light (`text-4xl md:text-5xl`), never bold. Body copy is `text-sm` or `text-base` with `leading-relaxed` and a max width of about 50 to 65 characters.
- Tailwind v4 font setup lives in `@theme inline { --font-display: 'Cormorant Garamond', serif; --font-sans: 'Inter', sans-serif; }`, and a base-layer rule applies `font-family: var(--font-display)` to `h1`..`h6`.

### Shape and spacing
- Radius is 0 for cards, buttons and viewers. Hotspot and loading elements are the only round things.
- Section padding `py-28 md:py-32`. Content container `container mx-auto px-6`.
- Cards are separated by borders or 1px gaps (`gap-px` over a border-colored background), not shadows.

### Things deliberately avoided (the "clean" rules)
These make the site look designed instead of generated. Keep them:
- No em dashes, en dashes, or `|` and `·` separators in visible text. Use commas, periods, line breaks, or spacing. Date ranges read "Feb 2026 to Present".
- No small uppercase tracked "eyebrow" labels above every heading. The heading alone is enough.
- No decorative dots, vertical accent bars, scroll cues, or fake status badges.
- No three-equal-cards feature rows. The software section uses an asymmetric layout (one large dark card, three stacked light cards).
- No gradient text, glow effects, or purple.
- No emoji.

## 5. Page by page

### Hero
Full-viewport, dark. A canvas particle network (`FractalBackground`) sits behind, with a radial vignette gradient over it so text stays readable. Centered stack, max four text elements:
1. Small line: "Aerospace Engineer and Startup Founder"
2. Name in Cormorant, `clamp(4rem, 11vw, 8rem)`
3. Affiliation line, three items spaced apart with no separators: NOBE, UAV@Illinois, Incoming L3Harris Intern
4. Two buttons: "View Projects" (solid cream) and "Resume" (outlined)

Entry animation is a staggered fade-up with `framer-motion`.

`FractalBackground`: a `<canvas>` with about a hundred drifting particles on a jittered grid, thin cream lines drawn between nearby particles, and a mouse-repulsion force. It runs on `requestAnimationFrame`, cleans up on unmount, and should pause or reduce for `prefers-reduced-motion`.

### Hardware Design (featured, light section)
Two large cards, each a 50/50 grid: 3D viewer on a dark panel, text panel beside it. The second card is mirrored (`order` swap) so the pair is not a plain repeat.

The first card is the carousel (section 7). The second is a normal single-model card.

### Engineering Projects (dark, 2x2 grid)
Four project cards separated by 1px borders. Each has a 340px viewer, three tag chips, org and date as two plain lines, title, description.

### Software Projects (light)
Bento layout on a 12-column grid:
- Left, 7 columns: one large dark card for the lead project (a browser interceptor simulation). It shows the control sequence as words joined by arrow icons (Detect, Stabilize, Track, Guide) and a "View on GitHub" link.
- Right, 5 columns: three stacked light cards, each with a kind label, title, description, tag chips, and an arrow-up-right icon linking to GitHub.

Data comes from `softwareProjects` in `portfolio.ts`. `githubUrl: null` means no link is rendered.

### Simulation and Analysis (dark)
Three cards for MATLAB and Simulink work, each with an icon tile, category, title, description, and chips. No 3D, no repo.

### About (light)
12-column grid: portrait (3 cols), bio plus education, focus, organizations, and two download buttons (4 cols), then skills grouped in three clusters with chips (5 cols).

### Contact (dark)
Two panels: contact links (email, LinkedIn, GitHub) and a validated form. Form labels sit above inputs, errors appear below with `role="alert"`, the submit button shows a spinner while sending, and a toast confirms success or failure. Submission posts JSON to `https://api.web3forms.com/submit` with a Web3Forms access key.

### Class Projects page
A grid of GLB viewers grouped by course, with a count per course.

### Nav and footer
Fixed top bar, 64 to 72px tall, one line on desktop, translucent with backdrop blur that tightens after 50px of scroll. Links: CAD and Simulation, Software, Class Work, About, Contact, and a solid Resume button. Anchor links smooth-scroll with an 80px offset. If you are on another route, the target hash is stored in `sessionStorage` and the home page scrolls to it after navigating. Mobile gets an animated dropdown menu. Footer is one quiet line plus three icon links.

## 6. The data file

Everything editable is in `src/data/portfolio.ts`:

```ts
export const personalInfo = { name, title, bio, skills: { cadSimulation: [], software: [], manufacturing: [] }, education, currentFocus, organizations: [], resumeUrl, portfolioPdfUrl, email, githubUrl, linkedinUrl };

export const cadProjects = [{ id, title, organization, role, dateRange, location, description, tags: [], glbFileUrl, slides?: [...] }];
export const softwareProjects = [{ id, title, kind, description, githubUrl: string | null, tags: [], steps?: [] }];
export const simulationProjects = [{ id, title, category, dateRange, description, tags: [] }];
export const classProjects = [{ id, code, name, models: [{ id, name, glbFileUrl }] }];
```

A `cadProjects` entry with a `slides` array renders through `ProjectCarousel` instead of the plain card. Each slide has `label`, `title`, `description`, `tags`, `glbFileUrl`.

Writing rules for copy: first person, concrete verbs, real numbers only when they are real, no filler words such as "seamless" or "elevate". Never claim what you did not do.

## 7. The 3D system

### Viewer
`ModelViewerWrapper` renders `<model-viewer>` with:
`camera-controls auto-rotate rotation-per-second="15deg" interaction-prompt="none" shadow-intensity="0.5" exposure="1.2" tone-mapping="neutral"`
It listens for the `load`, `error` and `progress` events and shows a spinner overlay while loading and an error message if the file fails. A hover hint says "Drag to rotate, scroll to zoom". With no `src` it shows an empty-state placeholder.

The script is added once in `index.html`:

```html
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
```

TypeScript needs a declaration so JSX accepts the tag:

```ts
declare global { namespace JSX { interface IntrinsicElements { "model-viewer": any } } }
```

### Carousel (`ProjectCarousel`)
Same card layout as a normal featured card. The viewer panel gets:
- Left and right arrow buttons (44px, centered vertically on each side)
- A tab strip at the bottom with one tab per model (Interceptor, Electronics, Camera); the active tab is cream with dark text
- `key={slide.glbFileUrl}` on the viewer so each model remounts cleanly

The text panel on the right swaps with the slide (title, description, tags) and is `aria-live="polite"`. Arrows wrap around. The container has `aria-roledescription="carousel"`.

### Getting models web-ready (important)
CAD exports are huge. The interceptor export was 48 MB and the electronics mount 16 MB. They are single merged meshes with vertex colors and no separate parts, which also means you cannot highlight individual parts by node name. Compress with Draco and they drop to about 2 MB and 0.4 MB with no visible loss:

```js
// npm i @gltf-transform/core @gltf-transform/functions @gltf-transform/extensions draco3dgltf
import { NodeIO } from "@gltf-transform/core";
import { KHRONOS_EXTENSIONS } from "@gltf-transform/extensions";
import { weld, prune, draco } from "@gltf-transform/functions";
import draco3d from "draco3dgltf";

const io = new NodeIO().registerExtensions(KHRONOS_EXTENSIONS).registerDependencies({
  "draco3d.encoder": await draco3d.createEncoderModule(),
  "draco3d.decoder": await draco3d.createDecoderModule(),
});
const doc = await io.read("in.glb");
await doc.transform(weld({ tolerance: 1e-4 }), prune(),
  draco({ method: "edgebreaker", quantizePosition: 14, quantizeNormal: 10, quantizeColor: 8 }));
await io.write("out.glb", doc);
```

Notes learned the hard way:
- Mesh simplification did almost nothing on these files (the tessellation is fragmented), so Draco alone is the win.
- `<model-viewer>` decodes Draco automatically; no extra setup.
- Keep each file under about 5 MB. Anything near 50 MB will stall mobile.
- Do not put scripts or tools inside the folder containing downloaded GLBs; work in a separate directory.
- Export from Fusion or SolidWorks to GLB (or STEP then convert). A single tiny model like the camera mount (77 KB) needs no compression.

## 8. Accessibility (non-negotiable)

- Semantic HTML first: `button` for actions, `a` for navigation, one `h1` per page, no skipped heading levels.
- Every interactive element reachable by keyboard with a visible focus ring (`focus-visible:outline-2 outline-offset-2`).
- Touch targets at least 44px (carousel arrows, tabs, icon links).
- Text contrast 4.5:1 or better. Muted text `#8a8f84` on `#1a1e16` passes.
- Images and models carry descriptive `alt`.
- Form: visible labels, `aria-invalid`, `aria-describedby`, errors announced with `role="alert"`.
- Carousel: labelled group, tab roles, live region for the changing text.
- Motion should respect `prefers-reduced-motion`.

## 9. Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist` to GitHub Pages:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Setup steps:
1. Name the repo exactly `<your-username>.github.io` so it serves at the root domain.
2. Repo Settings, Pages, Source: GitHub Actions.
3. Push to `main`. The site is live a minute or two later. Hard-refresh to bust cache.

### SPA routing on GitHub Pages
Pages has no server rewrite, so deep links like `/class-projects` would 404. The fix is two small pieces:
- `public/404.html` stores `location.href` in `sessionStorage.redirect` and meta-refreshes to `/`.
- A script in `index.html` reads `sessionStorage.redirect` on load and calls `history.replaceState` to restore the original path before React mounts.

## 10. Build order for Claude

1. Scaffold Vite + React + TS, install dependencies, set the alias and Tailwind v4.
2. Write `index.css` with the palette variables, fonts, and base heading rule.
3. Write `portfolio.ts` with placeholder content shaped like section 6.
4. Build `ModelViewerWrapper`, `ScrollFade`, then `PublicLayout`.
5. Build the home page section by section in the order of section 5. Check each in the browser before moving on.
6. Add `ProjectCarousel` and the `slides` branch for the featured card.
7. Add the Class Projects page and routes.
8. Compress all GLBs, drop them in `public/glb`.
9. Add the deploy workflow and `404.html`, push, enable Pages.
10. Run an accessibility pass (keyboard only, then a screen reader or axe).

## 11. Customizing for a new person

Replace: name, title, bio, skills, organizations, education, email and social links, `photo.jpg`, `resume.pdf`, all project entries and GLBs, the Web3Forms key (free at web3forms.com), the hero affiliation line, and the page title and meta tags in `index.html`. If you pick a different palette keep the structure: one dark base, one light neutral, one accent. If you have no 3D models, use a clean photo or screenshot per project in the same card layout.

## 12. Pitfalls we hit

- Huge GLBs: compress before committing (section 7).
- Private repos: a link from a public site returns a 404 to visitors. Make the repo public first, or show the project without a link.
- Eyebrow labels, em dashes and `·` separators crept back in repeatedly. Search the codebase for them before shipping.
- `h-screen` jumps on mobile Safari; use `min-h-[100dvh]` for full-height sections.
- Do not mix animation libraries in one component tree.
- Never track continuous values (mouse position) in React state; use refs or motion values.
- Do not commit API secrets. The Web3Forms access key is meant to be public, nothing else here is.
- A hotspot-style "highlight the parts" feature needs a model with separate nodes. Single-mesh exports cannot do it without positioning markers by hand.

## 13. Reference images for software and simulation projects

Every software and simulation card carries a real image, never a mock-up. How they were made:

- Browser sims (Three.js and Vite): run the project locally, drive it with `puppeteer-core` and system Chrome (`--use-angle=swiftshader --enable-unsafe-swiftshader` for headless WebGL), press the sim's start key, and screenshot at a few moments (mid-run, result screen). Export as JPEG around 1400px wide.
- MATLAB and Simulink: run `matlab -nodisplay -batch "run('script.m')"`. Style figures to match the site (card background `[35 40 32]/255`, cream text, amber line) and export with `exportgraphics(..., 'Resolution', 200, 'BackgroundColor', bg, 'Padding', 30)`. Model diagrams need display mode: `print('-sModelName','-dpng','-r200',file)` fails with `-nodisplay`. Invert the white diagram with Pillow and `ImageChops.screen` onto the card color so it sits on dark.
- FEA mesh failures: if `generateMesh` refuses a STEP file, show the stress result from a model that meshes, a drawing exported from CAD (`sips -s format png drawing.pdf --out drawing.png` on macOS), or a plot of the generating data.
- UI: `ImageTabs` renders one image or tabs between several views (Response / Block diagram, FEA result / Drawing). Images live in `public/projects/` and use `loading="lazy"` with descriptive `alt` text.
