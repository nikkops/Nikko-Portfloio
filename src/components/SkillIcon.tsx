import { polyPoints } from '../lib/geometry'
import type { SkillIcon as Icon } from '../data/content'

/** Small outline icon used on the tabs and in the cert table. */
export default function SkillIcon({ icon, size = 16 }: { icon: Icon; size?: number }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinejoin: 'round' as const }
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" className="skill-icon">
      {icon === 'circle' && <circle cx="10" cy="10" r="7" {...common} />}
      {icon === 'square' && <rect x="3.5" y="3.5" width="13" height="13" {...common} />}
      {icon === 'diamond' && <polygon points="10,2 18,10 10,18 2,10" {...common} />}
      {icon === 'triangle' && <polygon points="10,2.5 18,17 2,17" {...common} />}
      {icon === 'hexagon' && <polygon points={polyPoints(10, 10, 8, 6, -90)} {...common} />}
      {icon === 'star' && <polygon points={polyPoints(10, 10.6, 8.6, 5, -90, 3.7)} {...common} />}
      {icon === 'dot' && <circle cx="10" cy="10" r="2.6" fill="currentColor" />}
    </svg>
  )
}
