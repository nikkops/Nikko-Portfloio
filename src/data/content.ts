export type MenuItem = {
  path: string
  label: string
  subtitle: string
}

export const menuItems: MenuItem[] = [
  { path: '/about', label: 'About', subtitle: 'Status' },
  { path: '/projects', label: 'Projects', subtitle: 'Missions' },
  { path: '/skills', label: 'Skills', subtitle: 'Abilities' },
  { path: '/leadership', label: 'Leadership', subtitle: 'Bonds' },
  { path: '/contact', label: 'Contact', subtitle: 'Reach out' },
]

export const site = {
  name: 'Nikko S. Parungao',
  role: 'CS Student',
  location: 'Angeles City, PH',
  resumeUrl: '/resume.pdf', // add the PDF to /public when ready
  title: 'Beneath the Surface.',
  tagline:
    'CS student working across backend, data and AI. Learning each day by building.',
  email: 'parungaonikko@gmail.com',
}

export type Project = {
  slug: string
  name: string
  role: string
  year: number
  featured: boolean
  headline: string
  stack: string[]
  /** List screen: the kind of project and a short role, shown as "Kind · Short role" */
  kind: string
  shortRole: string
  /** One-line description for the preview panel */
  summary: string
  /** Optional status badge on the preview, e.g. "Defended" */
  badge?: string
  /** Optional screenshot path (put images in /public/projects/) */
  screenshot?: string
  /** Detail page */
  description: string
  outcome?: string
  sections: Record<SectionId, string>
  links?: { label: string; url: string }[]
  /** Up to four images for the detail collage (paths under /public/projects/) */
  screens?: string[]
}

export type SectionId = 'overview' | 'how' | 'links'

export const projectSections: { id: SectionId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'how', label: 'How it works' },
  { id: 'links', label: 'Links' },
]

const LINKS_TODO = 'Repo and demo links will be added here.'

export const projects: Project[] = [
  {
    slug: 'codely',
    name: 'Codely',
    role: 'Platform architecture and data flow designer, documentation, data cleaning',
    year: 2026,
    featured: true,
    headline:
      'Defended with minor revisions; built in four stages; interviews with practitioners from Shore360 Agency and Toro Cloud plus an AI expert consultation.',
    stack: ['Judge0', 'Random Forest', 'Claude API'],
    kind: 'Thesis',
    shortRole: 'Architecture and data flow',
    summary: 'Adaptive interview-prep platform for undergraduate CS students.',
    description:
      'Adaptive coding simulation platform for technical interview preparation of undergraduate CS students.',
    outcome: 'Defended',
    sections: {
      overview:
        'Students solve problems in a built-in coding environment, a Random Forest model sets the difficulty of each next problem, and the Claude API grades their follow-up answers. My part: platform architecture and data flow, documentation and data cleaning.',
      // draft from the CV: review
      how: 'Built in four stages. Judge0 runs and checks each submission, a Random Forest model picks the next difficulty, and the Claude API grades follow-up answers. The design drew on interviews with practitioners from Shore360 Agency and Toro Cloud plus an AI expert consultation.',
      links: LINKS_TODO,
    },
  },
  {
    slug: 'trialbite',
    name: 'TrialBite',
    role: 'Sole developer',
    year: 2026,
    featured: true,
    headline: 'Live on Vercel; 10+ foods logged and classified.',
    stack: ['React', 'Supabase', 'Gemini API'],
    kind: 'Solo',
    shortRole: 'Sole developer',
    // draft summary: review
    summary: 'Food and allergen tracker that logs what you eat and classifies it with AI.',
    description: 'Food and allergen tracker that logs what you eat and classifies it with AI.',
    // draft sections from the CV: review
    sections: {
      overview:
        'A web app for logging foods and classifying them, live on Vercel with 10+ foods logged and classified so far. I built it solo, from the React front end to the database and sign-in.',
      how: 'A React front end hosted on Vercel. Supabase handles the PostgreSQL database and auth, and the Gemini API classifies each logged food.',
      links: LINKS_TODO,
    },
  },
  {
    slug: 'haubout-that-way',
    name: 'HAUbout That Way?',
    role: 'Backend developer',
    year: 2025,
    featured: true,
    headline: '98 nodes (22 named landmarks) and 115 connections.',
    stack: ['Flutter', 'Dart', 'Supabase', 'Dijkstra'],
    kind: 'Team',
    shortRole: 'Backend developer',
    // draft summary: review
    summary: 'Campus navigation app for Holy Angel University that finds the shortest route between landmarks.',
    description: 'Campus navigation app for Holy Angel University that finds the shortest route between landmarks.',
    // draft sections from the CV: review
    sections: {
      overview:
        'A campus navigation app for Holy Angel University. I worked on the backend: the campus map is a graph of 98 nodes, 22 of them named landmarks, joined by 115 connections.',
      how: "The map is stored in Supabase as nodes and connections. Dijkstra's algorithm finds the shortest path between two points, and the Flutter app draws the route.",
      links: LINKS_TODO,
    },
  },
  {
    slug: 'virtuohero',
    name: 'VirtuoHero',
    role: 'Proposal and requirements writer, pitch video editor',
    year: 2025,
    featured: false,
    headline: 'Top 8 of 32 teams at the Create and Conquer hackathon (FEU Tech, 2025).',
    stack: ['Flutter', 'Gemini API'],
    kind: 'Hackathon',
    shortRole: 'Proposal writer, pitch editor',
    // draft summary: review
    summary: 'Hackathon project that placed top 8 of 32 teams at Create and Conquer (FEU Tech).',
    description: 'Hackathon project that placed top 8 of 32 teams at Create and Conquer (FEU Tech).',
    // draft sections from the CV: review
    sections: {
      overview:
        'A Flutter app built for the Create and Conquer hackathon at FEU Tech in 2025, where the team placed top 8 of 32. I wrote the proposal and requirements and edited the pitch video.',
      how: 'A Flutter app built around the Gemini API. More detail to come.',
      links: LINKS_TODO,
    },
  },
  {
    slug: 'wattsenergy',
    name: 'WattsEnergy',
    role: 'Backend developer; co-designed the forecasting approach with a teammate',
    year: 2025,
    featured: false,
    headline:
      'Forecasts hourly electricity usage from a linear trend plus a weekday-by-hour pattern.',
    stack: ['Flutter', 'Data cleaning', 'Upload and parsing'],
    kind: 'Team',
    shortRole: 'Backend developer',
    // draft summary: review
    summary: 'App that forecasts hourly electricity usage from uploaded data.',
    description: 'App that forecasts hourly electricity usage from uploaded data.',
    // draft sections from the CV: review
    sections: {
      overview:
        'An app that forecasts hourly electricity usage. I worked on the backend, covering data cleaning and the upload and parsing of usage files, and co-designed the forecasting approach with a teammate.',
      how: 'The forecast combines a linear trend with a weekday-by-hour pattern learned from hourly data. On the sample dataset the trend rises about 1,200 kWh a year.',
      links: LINKS_TODO,
    },
  },
]

export type SkillTab = {
  id: string
  label: string
  skills: string[]
  certs: string[]
}

export const skillTabs: SkillTab[] = [
  {
    id: 'languages',
    label: 'Languages',
    skills: ['Python', 'Java', 'JavaScript', 'SQL', 'C#'],
    certs: ['JavaScript Essentials 1 (Cisco)'],
  },
  {
    id: 'web-mobile',
    label: 'Web and Mobile',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Flutter', 'Dart'],
    certs: ['Responsive Web Design (freeCodeCamp)'],
  },
  {
    id: 'backend-data',
    label: 'Backend and Data',
    skills: ['PostgreSQL', 'Supabase', 'AWS', 'Vercel'],
    certs: [
      'Relational Database (freeCodeCamp)',
      'AWS Academy Cloud Foundations',
      'Data Analytics Essentials (Cisco)',
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI and ML',
    skills: ['Random Forest', 'Gemini API', 'Claude API', 'Judge0'],
    certs: [
      'AI Fundamentals (IBM SkillsBuild)',
      'Introduction to Generative AI (Google Cloud)',
      'Career Essentials in Generative AI (Microsoft and LinkedIn)',
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: ['Git', 'GitHub', 'Figma', 'Docker'],
    certs: [
      'Introduction to Figma (Simplilearn)',
      'CCNA Introduction to Networks and Endpoint Security (Cisco)',
    ],
  },
  {
    id: 'certs',
    label: 'Certs',
    skills: [],
    certs: ['IT Fundamentals+ (CompTIA)'],
  },
]

export type Role = {
  title: string
  org: string
  start: string
  end: string
}

export const roles: Role[] = [
  { title: 'Chief of Operations', org: 'AWS Learning Club, HAU', start: 'Jun 2025', end: 'Mar 2026' },
  { title: 'Finance Officer', org: 'Google Developer Groups on Campus, HAU', start: 'Jun 2025', end: 'Mar 2026' },
  { title: 'Councilor for Human Relations', org: 'CSC-SoC, HAU', start: 'Jun 2024', end: 'Apr 2025' },
  { title: 'Class Representative', org: 'School of Computing, HAU', start: 'Nov 2023', end: 'Mar 2024' },
  { title: 'Staff for Finance', org: 'CSC-SoC, HAU', start: 'Jun 2023', end: 'Apr 2024' },
]


export const about = {
  // Each entry is one "line" of the dialogue box; Enter advances.
  lines: [
    "I'm a Computer Science student at Holy Angel University, working across backend, data and AI. Outside class I've led in student organizations, from the School of Computing Student Council to AWS Learning Club and Google Developer Groups on Campus.",
  ],
  portraitUrl: '', // set when Nikko picks a photo; empty shows the placeholder frame
}

export type ArcanaId = 'fool' | 'magician' | 'emperor'

export type ArcanaCardData = {
  id: ArcanaId
  numeral: string
  name: string
  tab: string
  kicker: string
  heading: string
  body: string
  currently?: string
  tags: string[]
}

// Magician text is from the mockup. Fool and Emperor text is a draft from the CV: review it.
export const arcanaCards: ArcanaCardData[] = [
  {
    id: 'fool',
    numeral: '0',
    name: 'The Fool',
    tab: 'Who I am',
    kicker: '0 · The Fool · Beginnings, curiosity',
    heading: 'Who I am',
    body: "Computer Science student at Holy Angel University since 2023 and a consistent Dean's Lister. I learn by building things and shipping them.",
    tags: ['CS', 'HAU', 'Curious'],
  },
  {
    id: 'magician',
    numeral: 'I',
    name: 'The Magician',
    tab: 'What I build',
    kicker: 'I · The Magician · Skill and creation',
    heading: 'What I build',
    body: 'Apps across backend, data and AI: an adaptive interview-prep platform, an allergen tracker and a campus navigation app.',
    currently: "Building this portfolio. Learning [what you're learning].",
    tags: ['Backend', 'Data', 'AI'],
  },
  {
    id: 'emperor',
    numeral: 'IV',
    name: 'The Emperor',
    tab: 'Where I lead',
    kicker: 'IV · The Emperor · Leadership, structure',
    heading: 'Where I lead',
    body: 'Chief of Operations at AWS Learning Club and Finance Officer at Google Developer Groups on Campus, after earlier roles in the School of Computing student council.',
    tags: ['AWS LC', 'GDG', 'CSC-SoC'],
  },
]
