import { useId, useMemo } from 'react'

export type ArcanaVariant = 'fool' | 'magician' | 'emperor' | 'back'

const PALETTES: Record<ArcanaVariant, string[]> = {
  fool: ['#e6fbff', '#bff2ff', '#8be4fb', '#5fd0f5', '#cdf7ee', '#7fe0d0', '#3fbfa8', '#ffffff'],
  magician: ['#a99cf5', '#8b7df0', '#6f9cf2', '#4db8f0', '#8fdcf8', '#c3b8ff', '#6a6fe0', '#4a90e8'],
  emperor: ['#2f6fe0', '#4a8df0', '#5fb0f5', '#8fd0f8', '#2a5fb8', '#7aa6f5', '#3b82f6', '#f2c94c'],
  back: ['#0a2270', '#102c85', '#12388f', '#1a45c4', '#1f56d8', '#2a6af0', '#2f7be8', '#3b82f6', '#4a9af5', '#0b2a7a'],
}

function seeded(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const SEEDS: Record<ArcanaVariant, number> = { fool: 11, magician: 23, emperor: 37, back: 53 }

// Arched window, matched to the reference card set (viewBox 300 x 455)
const WIN = { x1: 16, x2: 284, top: 15.5, bottom: 363, arcStart: 94, radius: 154 }
const WINDOW_PATH = `M${WIN.x1} ${WIN.bottom}V${WIN.arcStart}A${WIN.radius} ${WIN.radius} 0 0 1 ${WIN.x2} ${WIN.arcStart}V${WIN.bottom}Z`

/** Diamond mosaic that fills the arched window. */
function useMosaic(variant: ArcanaVariant) {
  return useMemo(() => {
    const rand = seeded(SEEDS[variant])
    const palette = PALETTES[variant]
    const d = 13
    const tiles: { path: string; fill: string }[] = []
    for (let j = -1; j <= Math.ceil((WIN.bottom - WIN.top) / d) + 1; j++) {
      for (let i = -1; i <= Math.ceil((WIN.x2 - WIN.x1) / (2 * d)) + 1; i++) {
        const cx = WIN.x1 + i * 2 * d + (j % 2 === 0 ? 0 : d)
        const cy = WIN.top + j * d
        const gold = variant === 'emperor' && rand() < 0.1
        const pick = palette[Math.floor(rand() * (palette.length - 1))]
        tiles.push({
          path: `M${cx} ${cy - d}L${cx + d} ${cy}L${cx} ${cy + d}L${cx - d} ${cy}Z`,
          fill: gold ? palette[palette.length - 1] : pick,
        })
      }
    }
    return tiles
  }, [variant])
}

const NAVY = '#031a47'
const CYAN = '#6fe3fa'

function Star({ cx, cy, r, fill, k = 0.22 }: { cx: number; cy: number; r: number; fill: string; k?: number }) {
  const q = r * k
  const pts = [
    [cx, cy - r], [cx + q, cy - q], [cx + r, cy], [cx + q, cy + q],
    [cx, cy + r], [cx - q, cy + q], [cx - r, cy], [cx - q, cy - q],
  ]
  return <polygon points={pts.map((p) => p.join(',')).join(' ')} fill={fill} />
}

const LIGHT_CYAN = '#7fe4fb'

function Emblem({ variant, maskId }: { variant: ArcanaVariant; maskId: string }) {
  switch (variant) {
    case 'fool':
      return (
        <g>
          <Star cx={151} cy={155} r={59} k={0.23} fill={NAVY} />
          <circle cx={224} cy={107} r={7.3} fill={NAVY} />
          <circle cx={79} cy={203} r={5.2} fill={NAVY} />
          <circle cx={236} cy={196} r={4.1} fill={NAVY} />
          <path d="M0 312C60 298 118 292 153 283C190 275 196 262 240 252C262 248 275 245 300 240L300 400L0 400Z" fill={NAVY} />
          <path d="M133 372L156 318C168 305 170 298 168 290" fill="none" stroke={LIGHT_CYAN} strokeWidth={6.6} strokeLinecap="round" />
        </g>
      )
    case 'magician':
      return (
        <g>
          <path
            d="M150 95C133 73 103 73 103 95C103 117 133 117 150 95C167 73 197 73 197 95C197 117 167 117 150 95Z"
            fill="none" stroke={NAVY} strokeWidth={9.5} strokeLinejoin="round"
          />
          <line x1={97} y1={321} x2={180} y2={190} stroke={NAVY} strokeWidth={11.5} strokeLinecap="round" />
          <Star cx={185} cy={181} r={38} k={0.27} fill={NAVY} />
          <circle cx={156} cy={150} r={3.6} fill={NAVY} />
          <circle cx={245} cy={149} r={5.2} fill={NAVY} />
          <circle cx={245} cy={229} r={3.6} fill={NAVY} />
        </g>
      )
    case 'emperor':
      return (
        <g>
          <path d="M83 176L95 110L123 149L149 97L176 149L205 110L217 176Z" fill={NAVY} />
          <circle cx={95} cy={107} r={6.2} fill={LIGHT_CYAN} />
          <circle cx={149} cy={94} r={6.8} fill={LIGHT_CYAN} />
          <circle cx={205} cy={107} r={6.2} fill={LIGHT_CYAN} />
          <path d="M89 190H211V250C211 285 180 305 150 314C120 305 89 285 89 250Z" fill={NAVY} />
          <line x1={150} y1={201} x2={150} y2={299} stroke={LIGHT_CYAN} strokeWidth={7.2} strokeLinecap="round" />
          <line x1={106} y1={234} x2={194} y2={234} stroke={LIGHT_CYAN} strokeWidth={7.2} strokeLinecap="round" />
        </g>
      )
    case 'back':
      return (
        <g>
          {/* soft glow behind the emblem */}
          <circle cx={150} cy={217} r={98} fill="url(#glow)" />
          <circle cx={150} cy={217} r={82} fill="none" stroke={CYAN} strokeWidth={2.8} />
          <circle cx={150} cy={217} r={66} fill="none" stroke={CYAN} strokeWidth={0.8} opacity={0.6} />
          <mask id={maskId}>
            <rect x={0} y={0} width={300} height={455} fill="#fff" />
            <circle cx={180} cy={213} r={54} fill="#000" />
          </mask>
          <circle cx={151} cy={217} r={58} fill="#cdf6ff" mask={`url(#${maskId})`} />
          <Star cx={182} cy={212} r={25} k={0.17} fill={CYAN} />
          <circle cx={150} cy={120} r={4.2} fill={CYAN} />
          <circle cx={150} cy={311} r={4.2} fill={CYAN} />
        </g>
      )
  }
}

type Props = { variant: ArcanaVariant; numeral?: string; name?: string }

export default function ArcanaCard({ variant, numeral, name }: Props) {
  const uid = useId().replace(/:/g, '')
  const tiles = useMosaic(variant)
  const windowId = `${uid}-win`
  const frameId = `${uid}-frame`
  const hatchId = `${uid}-hatch`
  const maskId = `${uid}-mask`
  const mono = { fontFamily: 'var(--font-mono)' }
  const heading = { fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 700 } as const

  return (
    <svg viewBox="0 0 300 455" width="100%" height="100%" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={frameId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f4fb0" />
          <stop offset="1" stopColor="#0a2270" />
        </linearGradient>
        {/* crisscross lattice: lines in both diagonal directions */}
        <pattern id={hatchId} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="9" stroke="#fff" strokeOpacity="0.2" strokeWidth="1" />
          <line x1="0" y1="0" x2="9" y2="0" stroke="#fff" strokeOpacity="0.2" strokeWidth="1" />
        </pattern>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#7fc4ff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#7fc4ff" stopOpacity="0" />
        </radialGradient>
        <clipPath id={windowId}>
          <path d={WINDOW_PATH} />
        </clipPath>
      </defs>

      <rect width="300" height="455" fill={`url(#${frameId})`} />
      <rect width="300" height="455" fill={`url(#${hatchId})`} />
      {/* double border plus a fine inner line, as in the reference */}
      <rect x="5" y="5" width="290" height="445" fill="none" stroke="#fff" strokeOpacity="0.65" strokeWidth="1.4" />
      <rect x="9" y="9" width="282" height="437" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="0.9" />
      <rect x="14" y="14" width="272" height="427" fill="none" stroke={NAVY} strokeOpacity="0.5" strokeWidth="0.6" />

      <g clipPath={`url(#${windowId})`}>
        {tiles.map((t, i) => (
          <path key={i} d={t.path} fill={t.fill} stroke={NAVY} strokeOpacity="0.3" strokeWidth="0.8" />
        ))}
        <Emblem variant={variant} maskId={maskId} />
      </g>
      <path d={WINDOW_PATH} fill="none" stroke="#fff" strokeWidth="2.4" />

      {/* numeral plaque */}
      <path d="M73 439V392A86 86 0 0 1 227 392V439Z" fill={NAVY} stroke="#fff" strokeWidth="2.4" />
      {variant === 'back' ? (
        <>
          <Star cx={150} cy={397} r={17.5} k={0.2} fill={CYAN} />
          <text x="150" y="426" textAnchor="middle" fill="#bfeaff" fontSize="11" letterSpacing="2.6" style={mono}>
            ARCANA
          </text>
        </>
      ) : (
        <>
          <text x="150" y="402" textAnchor="middle" fill="#fff" fontSize="33" style={heading}>
            {numeral}
          </text>
          <text x="150" y="426" textAnchor="middle" fill="#bfeaff" fontSize="10.5" letterSpacing="2.4" style={mono}>
            {name?.toUpperCase()}
          </text>
        </>
      )}
    </svg>
  )
}
