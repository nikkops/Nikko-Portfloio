# Nikko Portfolio — Planning Doc

Oct 28, 2026 · @Lance

## Summary

We are building a game-menu portfolio for Nikko S. Parungao: an ocean-themed site inspired by the Persona 3 Reload menus, built in React and hosted on Vercel. The design phase is complete as of Oct 29, 2026: every screen is mocked up on the design canvas, and the build is next.

Decisions locked so far:

- Direction A: a full game-menu experience, with original artwork and no copied game assets.
- Title screen: text only, with "Beneath the Surface.", the sentence "CS student working across backend, data and AI. Learning each day by building.", and click anywhere to enter. A photo may be added later.
- Main menu: five items with plain labels and themed subtitles: About (Status), Projects (Missions), Skills (Abilities), Leadership (Bonds), Contact (Reach out).
- About: a dialogue box plus a face-down deck; "Reveal the Arcana" deals three arcana cards (The Fool, The Magician, The Emperor) that flip to text.
- Projects: one page with two states, a list of mission bars with a live preview, and a detail view with sections and a screenshot collage.
- Skills: a tilted quest-log table with six tabs; certifications live in the sixth tab instead of their own page.
- Leadership: a tilted journey map from 2023 to 2026 with two lanes for overlapping roles.
- Contact: email only (parungaonikko@gmail.com), with copy and resume buttons.
- Dropped: the Simple view, the separate Certifications page, and the game-label menu variant.
- Stack: React on Vercel on the default Vercel address; animation libraries are chosen at build time.

## Design direction

The look is a Persona 3 Reload-style game menu: slanted shapes, bold italic type, and an underwater scene that gets darker with depth. The inspiration is the style, not the assets.

| Element | Decision |
| --- | --- |
| Background | Water gradient: `#6FE3FA` at the top through `#2BB4EE`, `#1A78E0` and `#0F45C4` to `#0A2794` at the bottom |
| Surface pattern | Posterized noise in three tones (`#1468D6`, `#7FE4FB`, `#DDFBFF`) at reduced opacity, large near the top and fading with depth |
| Motion | Water surface cross-fades through 12 noise frames over 15 seconds plus slow drift; expanding rings and rising bubbles; static for reduced-motion users |
| Panels and bars | Navy `#03163E` with a hard offset shadow, slanted 12 degrees; selected items are white with navy text |
| Text | Navy `#031A47` on the bright top half, white on the dark lower half; big titles have no outline |
| Headings | Barlow Condensed, bold italic, uppercase |
| Body and tags | Inter for reading text, JetBrains Mono for tags and key hints |
| Arcana cards | Dark cobalt frame (`#2A5FB8` to `#071D5A`), arched stained-glass mosaic, solid silhouette emblem, numeral plaque; shared moon-and-star back |
| Game screens | Skills and Projects use a tilted slab, a ghost title and pill tabs between big Q and E letters; Leadership tilts its timeline |
| Controls | Bottom-right guide prompt ("Where do you want to go?") with small key hints; screens with a detail box in that corner show the hints bottom-left instead |

Earlier versions (the original dark look, the bright ocean, the shard-photo title, the game-label menu and others) are saved as backups and can be restored.

**Production note:** in the mockup the water is 12 pre-drawn frames (about 500 KB per screen). In the real build it should be a live shader so it moves continuously and stays light.

## Sitemap and screens

&#91;embedded content: sitemap · title, menu, 6 screens, 2 levels under Projects\]

The title screen opens the main menu, which leads to five screens; About, Projects and Skills each open one level deeper in place.

| Canvas board | Screen | Status |
| --- | --- | --- |
| 1 | Title screen | Designed |
| 2 | Main menu | Designed |
| 4 | Mobile menu | Designed |
| 3 and 5 | Projects: list and detail (Codely) | Designed; detail template reused for the other four projects |
| 6, 6b, 6c | About: dialogue and deck, revealed arcana, card set | Designed |
| 7 and 7b | Skills: skill table and Certs tab | Designed |
| 8 | Leadership: journey map | Designed |
| 9 | Contact | Designed |
| None | Mobile versions of the newer screens | Skipped for now |
| None | Simple view | Dropped |

## Content

All content comes from Nikko's final CV (Oct 2026). Screenshots, diagrams, videos and links are placeholders until they are uploaded at build time.

**Projects** (Codely, TrialBite and HAUbout That Way are the featured three)

| Project | Role | Year | Headline fact | Stack |
| --- | --- | --- | --- | --- |
| Codely (thesis) | Platform architecture and data flow designer, documentation, data cleaning | 2026 | Defended with minor revisions; built in four stages; interviews with practitioners from Shore360 Agency and Toro Cloud plus an AI expert consultation | Judge0, Random Forest, Claude API |
| TrialBite | Sole developer | 2026 | Live on Vercel; 10+ foods logged and classified | React, Supabase (PostgreSQL and auth), Gemini API |
| HAUbout That Way? | Backend developer | 2025 | 98 nodes (22 named landmarks) and 115 connections | Flutter, Dart, Supabase, Dijkstra |
| VirtuoHero | Proposal and requirements writer, pitch video editor | 2025 | Top 8 of 32 teams at the Create and Conquer hackathon (FEU Tech, 2025) | Flutter, Gemini API |
| WattsEnergy | Backend developer; co-designed the forecasting approach with a teammate | 2025 | Forecasts hourly electricity usage: a linear trend plus a weekday-by-hour pattern; the trend rises about 1,200 kWh a year on the sample dataset | Flutter, data cleaning, upload and parsing |

**Skills** (CV list plus the extras agreed on)

- Languages: Python, Java, JavaScript, SQL, C#
- Web and mobile: HTML, CSS, JavaScript, React, Flutter, Dart
- Backend and data: PostgreSQL, Supabase, AWS, Vercel
- AI and ML: Random Forest, Gemini API, Claude API, Judge0
- Tools: Git, GitHub, Figma, Docker

**Leadership** (shown as a journey map)

- Chief of Operations, AWS Learning Club, HAU (Jun 2025 to Mar 2026)
- Finance Officer, Google Developer Groups on Campus, HAU (Jun 2025 to Mar 2026)
- Councilor for Human Relations, CSC-SoC, HAU (Jun 2024 to Apr 2025)
- Class Representative, School of Computing, HAU (Nov 2023 to Mar 2024)
- Staff for Finance, CSC-SoC, HAU (Jun 2023 to Apr 2024)

**Certifications** (12, shown in the Certs tab on the Skills page, each linked to the skill tab it backs up)

- Languages: JavaScript Essentials 1 (Cisco)
- Web and Mobile: Responsive Web Design (freeCodeCamp)
- Backend and Data: Relational Database (freeCodeCamp), AWS Academy Cloud Foundations, Data Analytics Essentials (Cisco)
- AI and ML: AI Fundamentals (IBM SkillsBuild), Introduction to Generative AI (Google Cloud), Career Essentials in Generative AI (Microsoft and LinkedIn)
- Tools: Introduction to Figma (Simplilearn), CCNA Introduction to Networks and Endpoint Security (Cisco)
- General: IT Fundamentals+ (CompTIA)

**Education:** BS Computer Science, Holy Angel University (Jun 2023 to present; consistent Dean's Lister). Accountancy and Business Management Strand, Brightwoods School (Sep 2021 to Jun 2023; Second Honorable Mention).

**Contact:** email only (parungaonikko@gmail.com). No other public links for now.

## Tagline options

Pick one big title line and one supporting sentence, or mix and edit them. "Build Deeper." and its sentence are the current placeholders. The water theme and the depth idea are used in the first group.

**Title line (big text)**

| # | Line | Feel |
| --- | --- | --- |
| 1 | Build Deeper. | Current placeholder; ties to the ocean and depth |
| 2 | Dive In. | Short and welcoming; works as an invitation to enter |
| 3 | Beneath the Interface. | Points at backend and data work |
| 4 | Code Below the Surface. | Ocean theme, technical |
| 5 | Data to Deployed. | Plain and accurate to the projects |
| 6 | Make It Think. | Nods to the AI work |
| 7 | Built to Learn. | Fits the adaptive and AI projects |
| 8 | Ship the Idea. | Action-focused |
| 9 | Curious by Design. | Personal; about mindset |
| 10 | Learn. Build. Dive. | Three beats; works with the menu rhythm |

**Supporting sentence (under the title)**

1. Building AI-powered apps, from data pipelines to deployed products. (current)
2. Computer science student working across backend, data and AI.
3. I build apps that learn, and then I ship them.
4. Turning data and AI into products people can actually use.
5. CS student at Holy Angel University, building from the database up.

Strong pairings (title line + sentence): 1 + 1 (current), 5 + 4, 6 + 2, and 3 + 5.

## Tech and hosting

The site will be a React app hosted on Vercel; everything else below is proposed and can be revisited when the build starts.

| Area | Plan | Status |
| --- | --- | --- |
| Framework | React; Vite with React Router is the lightest fit | React decided; the rest proposed |
| Hosting | Vercel, default address, no custom domain | Decided |
| Water background | Live WebGL shader instead of the 12 pre-drawn frames (about 500 KB per mockup screen); static fallback for reduced-motion users | Proposed |
| Animation | A motion library for the menu, card flips, the deck reveal and list-to-detail transitions | To pick at build time |
| Navigation | Real links under the arrow, Enter, Q/E and Esc shortcuts, so keyboard, touch and screen readers all work | Proposed |
| Routes | One URL per screen; Projects detail and About reveal as states of their pages | Proposed |
| Sound | Optional menu sounds, off by default | Decided |
| Contact | Email link and copy button; no form | Decided |
| Quality | Text contrast at WCAG AA, reduced-motion support, mobile layout, fast load | Proposed |

## Open items

The design decisions are all made; what remains is content to supply at build time and two items skipped for now.

- [x] Title line and supporting sentence chosen
- [x] Contact email: parungaonikko@gmail.com
- [x] VirtuoHero: Create and Conquer, FEU Tech 2025
- [x] WattsEnergy method confirmed (linear trend plus weekday-by-hour pattern, hourly data)
- [x] Custom domain: not needed
- [ ] About: what Nikko is learning right now, and what he is open to (placeholders in the Currently line)
- [ ] Title screen and About portrait photo: Nikko decides later
- [ ] Upload at build time: screenshots, the Codely architecture diagram, demo videos, repo links, TrialBite's live link and the resume PDF
- [ ] Mobile versions of the newer screens (skipped for now)
- [ ] Final checks before launch: contrast, mobile, speed, keyboard use

## Next steps

The design phase is done; the build starts when Nikko is ready.

1. Upload project assets and fill the About placeholders.
2. Build the React site: shared background shader, screen layouts, transitions and keyboard controls.
3. Fill the detail state for all five projects from the Codely template.
4. Add mobile layouts.
5. Test accessibility, mobile and speed, then deploy to Vercel.

## Links and files

- [Design canvas: Direction A, final mockups](https://claude.ai/artifact/H5MEojUQKp1vTNmsXnhFop) (12 boards)
- Final exports (Oct 29, 2026): 2x PNGs of all 12 screens and a 36-second walkthrough as MP4 and GIF
- Earlier exports: the original dark look and the still-water ocean look
- Source for the content: Nikko's final CV, Oct 2026
