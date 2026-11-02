# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Internship recruiters and hiring managers screening Computer Science students, and employers hiring for entry-level roles once Nikko graduates. They arrive with limited time and are judging whether Nikko is worth contacting for a backend, data or AI position.

## Product Purpose

A personal portfolio for Nikko S. Parungao, a CS student at Holy Angel University (Jun 2023 to present, consistent Dean's Lister). It shows his projects, skills, certifications and student leadership, and gets the right people to reach out.

Success means a visitor emails parungaonikko@gmail.com. Opening or downloading the CV is a secondary outcome.

## Positioning

A CS student working across backend, data and AI who learns by building and shipping: a defended thesis (Codely), a solo app live on Vercel (TrialBite), and team backend work. Leadership roles across CSC-SoC, AWS Learning Club and GDG on Campus sit alongside the technical work. The target is kept broad on purpose (backend, data and AI) instead of narrowing to one specialty.

## Operating Context

- Visitors are likely to come from a CV, application or message link, so they may land directly on any route as well as the title screen.
- The site is built as a game menu: title screen, then a main menu with five screens (About, Projects, Skills, Leadership, Contact). Projects detail and the About arcana reveal are states within their pages.
- Navigation works by mouse, touch and keyboard (arrows, Enter, Q/E, Esc), with real links underneath so screen readers work too.

## Capabilities and Constraints

- Stack: React 19, TypeScript, Vite, React Router; hosted on Vercel at the default address (no custom domain). `vercel.json` rewrites all paths to `index.html`.
- All site content lives in `src/data/content.ts`.
- Contact is email only, with a copy button and a resume link. No form and no other public links for now.
- Menu sounds, if added, are off by default.
- Several content fields are drafts from the CV and marked "review" in `content.ts`.
- Open: mobile layouts for the newer screens were skipped in design and still need doing.

## Brand Commitments

- Name and title: "Nikko S. Parungao", "Beneath the Surface.", with the supporting line "CS student working across backend, data and AI. Learning each day by building."
- The site is an ocean-themed game-menu experience whose style draws on the Persona 3 Reload menus. The inspiration is the style only: all artwork is original and no game assets are copied.
- Menu labels are plain, with themed subtitles: About (Status), Projects (Missions), Skills (Abilities), Leadership (Bonds), Contact (Reach out).
- The About screen uses three arcana cards: The Fool (who I am), The Magician (what I build), The Emperor (where I lead).
- The planning doc (`Nikko Portfolio — Planning Doc.md`) records the locked design decisions.

## Evidence on Hand

- Projects (5): Codely (thesis, defended with minor revisions), TrialBite (solo, live on Vercel, 10+ foods logged and classified), HAUbout That Way? (98 nodes, 22 landmarks, 115 connections), VirtuoHero (top 8 of 32, Create and Conquer, FEU Tech 2025), WattsEnergy (hourly electricity forecasting).
- 12 certifications from CompTIA, freeCodeCamp, AWS Academy, Cisco, IBM SkillsBuild, Google Cloud, Microsoft and LinkedIn, and Simplilearn.
- Five leadership roles, 2023 to 2026.
- Assets: `public/profile.jpg` (portrait), `public/Nikko_Parungao_CV.pdf` (resume).
- Not yet available, and must not be invented: project screenshots, the Codely architecture diagram, demo videos, repo links and TrialBite's live link. There are no testimonials, references or employer endorsements.

## Product Principles

1. Recruiters skim. Every screen should make Nikko's role and the concrete result clear without needing the game to be explained.
2. The game-menu experience is the memorable part, but it must never get in the way of reaching the projects or the email.
3. Only state what's true and on the CV. Use real numbers where they exist, and leave a visible placeholder instead of filling gaps.
4. Show the full range (backend, data, AI and leadership) without claiming expertise beyond a student's actual work.

## Accessibility & Inclusion

Target WCAG AA text contrast. Support reduced motion (the water background goes static). Everything must work by keyboard, touch and screen reader, and the site needs usable mobile layouts.
