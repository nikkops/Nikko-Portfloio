# Nikko Portfolio

A game-menu portfolio for Nikko S. Parungao: an ocean-themed site inspired by the Persona 3 Reload menus. Built with React, TypeScript and Vite, hosted on Vercel.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and production build
npm run lint     # oxlint
```

## Structure

- `src/screens` — one component per screen (title, menu, about, projects, skills, leadership, contact)
- `src/components` — shared pieces (layout, background)
- `src/data/content.ts` — site content
- `src/styles` — design tokens and global styles

Routing is client-side; `vercel.json` rewrites all paths to `index.html`.
