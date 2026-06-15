# Implementation Plan: Recreating Notion Site with Astro, Tailwind, & Svelte

We will build a responsive, modern, and highly polished portfolio website based on the provided reference site, using **Astro**, **Tailwind CSS**, and **Svelte**. The site will be hosted on **GitHub Pages**.

## Key Decisions & Architecture

1. **Astro Framework**:
   - Ideal for content-focused websites like portfolios due to its zero-JS-by-default footprint.
   - Use Astro Content Collections (`src/content/projects/`) to store case studies in Markdown format, separating content from layout code.
   - Use Astro routing for dynamic project page generation.

2. **Tailwind CSS & Styling**:
   - Integration via `@astrojs/tailwind`.
   - Implement the custom color palette (Cream, Ink, Ink-muted, Vermillion, and various Notion-like tag pill colors) in `tailwind.config.mjs` as theme extensions.
   - Maintain the clean, minimalist Notion-like typography and layout while enhancing interactive states with subtle micro-interactions and smooth transitions.

3. **Svelte Integration**:
   - Integration via `@astrojs/svelte`.
   - Svelte will be used for interactive UI components where state management is beneficial (e.g., project filters or dynamic animations).

4. **GitHub Pages Hosting**:
   - Follow the naming convention for a User/Organization site: repository named `outruigeous.github.io`.
   - Configure Astro with `base: '/'` and `site: 'https://outruigeous.github.io'` in `astro.config.mjs` for root-level domain hosting.
   - Create a GitHub Actions workflow `.github/workflows/deploy.yml` to build and deploy the site automatically on push to the main branch.

---

## Content Migration Plan

We will extract the text, images, and structures from the `reference/` files and migrate them:
- **Pages**:
  - `reference/index.html` -> `src/pages/index.astro`
  - `reference/about.html` -> `src/pages/about.astro`
  - `reference/process.html` -> `src/pages/process.astro`
- **Projects**:
  - Migrate all projects from `reference/projects/*.html` to Markdown files in `src/content/projects/*.md`.
  - Copy reference images (e.g., `reference/process-diagram.png` and any project images) to `src/assets/` or `public/`.

---

## Step-by-Step Implementation

### Phase 1: Project Setup & Initialization
- Initialize Astro project in the workspace.
- Install Astro integrations: `@astrojs/tailwind` and `@astrojs/svelte`.
- Configure `tailwind.config.mjs` with colors, typography, and standard resets.
- Setup layout components (`src/layouts/Layout.astro` and `src/layouts/ProjectLayout.astro`).

### Phase 2: Content Parsing & Migration
- Create Markdown content files for all 6 projects (Service Design, Sanctuary, SearchSG Portal, Research Ops, IT Asset, Snack Chat) preserving their structures (meta fields, section headings, list items, callouts).
- Convert `process.html` to Astro page with step-by-step styling.
- Convert `about.html` to Astro page.

### Phase 3: UI Design & Svelte Components
- Design a premium, Notion-like home page, adding visual enhancements (nice transitions, animated tags, custom SVG decorations).
- Use Svelte to create interactive cards or animations.
- Ensure 100% responsiveness on mobile, tablet, and desktop screens.

### Phase 4: Verification & GitHub Actions Setup
- Add a GitHub Actions deployment workflow file (`.github/workflows/deploy.yml`).
- Test build locally with `npm run build` to verify there are no compilation or routing issues.
