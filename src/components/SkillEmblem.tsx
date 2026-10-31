import { useId, useMemo } from 'react'
import type { SkillIcon } from '../data/content'
import { polyPoints } from '../lib/geometry'

const PALETTE = ['#6f6fe8', '#8b7df0', '#a99cf5', '#4a90e8', '#5fb0f5', '#8fd0f8', '#c3e8ff', '#3b6fd8', '#7aa6f5']
const NAVY = '#031a47'
const CYAN = '#55d6f5'
const TILT = 37 // default; matches the CSS rotation of the card, so the emblem can be drawn screen-upright

function seeded(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type EmblemIcon = SkillIcon | 'mail'

function Shape({ icon }: { icon: EmblemIcon }) {
  const ring = { fill: 'none', stroke: CYAN, strokeWidth: 12, strokeLinejoin: 'miter' as const }
  switch (icon) {
    case 'circle':
      return (
        <>
          <circle cx="200" cy="200" r="112" fill={NAVY} />
          <circle cx="200" cy="200" r="62" {...ring} />
        </>
      )
    case 'square':
      return (
        <>
          <rect x="98" y="98" width="204" height="204" fill={NAVY} />
          <rect x="145" y="145" width="110" height="110" {...ring} />
        </>
      )
    case 'diamond':
      return (
        <g transform="rotate(45 200 200)">
          <rect x="102" y="102" width="196" height="196" fill={NAVY} />
          <rect x="148" y="148" width="104" height="104" {...ring} />
        </g>
      )
    case 'triangle':
      return (
        <>
          <polygon points={polyPoints(200, 222, 150, 3)} fill={NAVY} />
          <polygon points={polyPoints(200, 228, 70, 3)} {...ring} />
        </>
      )
    case 'hexagon':
      return (
        <>
          <polygon points={polyPoints(200, 200, 122, 6)} fill={NAVY} />
          <polygon points={polyPoints(200, 200, 66, 6)} {...ring} />
        </>
      )
    case 'mail':
      // envelope, tilted a little on screen like the Contact mockup
      return (
        <g transform="rotate(-8 200 200)">
          <rect x="88" y="128" width="224" height="150" fill={NAVY} />
          <path d="M100 140L200 214L300 128" fill="none" stroke={CYAN} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )
    case 'star':
    case 'dot':
      return (
        <>
          <polygon points={polyPoints(200, 210, 158, 5, -90, 66)} fill={NAVY} />
          <circle cx="200" cy="208" r="44" {...ring} />
        </>
      )
  }
}

/** Big tilted stained-glass card (Skills, Contact), with the current tab's shape in the middle. */
export default function SkillEmblem({ icon, tilt = TILT }: { icon: EmblemIcon; tilt?: number }) {
  const uid = useId().replace(/:/g, '')
  const tiles = useMemo(() => {
    const rand = seeded(91)
    const out: { x: number; y: number; fill: string }[] = []
    const n = 11
    const size = 340 / n
    for (let j = 0; j < n; j++)
      for (let i = 0; i < n; i++)
        out.push({ x: 30 + i * size, y: 30 + j * size, fill: PALETTE[Math.floor(rand() * PALETTE.length)] })
    return { out, size }
  }, [])

  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern id={`${uid}-hatch`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#fff" strokeOpacity="0.18" strokeWidth="1" />
          <line x1="0" y1="0" x2="7" y2="0" stroke="#fff" strokeOpacity="0.18" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="#1a45b8" />
      <rect width="400" height="400" fill={`url(#${uid}-hatch)`} />
      {tiles.out.map((t, i) => (
        <rect key={i} x={t.x} y={t.y} width={tiles.size} height={tiles.size} fill={t.fill} stroke={NAVY} strokeOpacity="0.35" strokeWidth="1" />
      ))}
      <rect x="30" y="30" width="340" height="340" fill="none" stroke="#fff" strokeWidth="4" />
      <g transform={`rotate(${-tilt} 200 200)`} key={icon} className="skill-emblem__shape">
        <Shape icon={icon} />
      </g>
    </svg>
  )
}
