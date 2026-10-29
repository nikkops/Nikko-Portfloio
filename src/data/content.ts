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
  title: 'Beneath the Surface.',
  tagline:
    'CS student working across backend, data and AI. Learning each day by building.',
  email: 'parungaonikko@gmail.com',
}
