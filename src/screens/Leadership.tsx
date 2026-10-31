import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import KeyGuide from '../components/KeyGuide'
import { roles } from '../data/content'
import './Leadership.css'

// Timeline scale: months from the first role's start, mapped onto 4%..60% of the map width
// (cards are about a fifth of the map wide, so the last one still fits before the arrow).
const toMonths = ([y, m]: [number, number]) => y * 12 + (m - 1)
const first = Math.min(...roles.map((r) => toMonths(r.from)))
const last = Math.max(...roles.map((r) => toMonths(r.from)))
const xOf = (ym: [number, number]) => 4 + ((toMonths(ym) - first) / Math.max(1, last - first)) * 56
const years = (() => {
  const a = Math.floor(first / 12)
  const b = Math.floor(Math.max(...roles.map((r) => toMonths(r.to))) / 12)
  return Array.from({ length: b - a + 1 }, (_, i) => a + i)
})()
// The first year's label sits at the first role (not at January), like the mockup
const yearX = (y: number, i: number) => (i === 0 ? 4 : xOf([y, 1]))

export default function Leadership() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(() => roles.findIndex((r) => r.title === 'Chief of Operations'))
  const role = roles[selected]

  const switchLane = () => {
    const lane = role.lane === 0 ? 1 : 0
    const here = toMonths(role.from)
    let best = -1
    roles.forEach((r, i) => {
      if (r.lane !== lane) return
      if (best < 0 || Math.abs(toMonths(r.from) - here) < Math.abs(toMonths(roles[best].from) - here)) best = i
    })
    if (best >= 0) setSelected(best)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      switch (e.key) {
        case 'ArrowRight':
          setSelected((i) => (i + 1) % roles.length)
          break
        case 'ArrowLeft':
          setSelected((i) => (i - 1 + roles.length) % roles.length)
          break
        case 'ArrowUp':
        case 'ArrowDown':
          e.preventDefault()
          switchLane()
          break
        case 'Escape':
          navigate('/menu')
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="lead">
      <div className="lead__decor" aria-hidden="true">
        <div className="lead__veil" />
        <div className="lead__divider" />
        <div className="lead__ring lead__ring--a" />
        <div className="lead__ring lead__ring--b" />
        <span className="lead__bubble lead__bubble--a" />
        <span className="lead__bubble lead__bubble--b" />
      </div>

      <header className="lead__head">
        <nav className="lead__crumb" aria-label="Breadcrumb">
          <Link to="/menu">Menu</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Leadership</span>
        </nav>
        <div className="lead__titlerow">
          <h1 className="lead__title">Leadership</h1>
          <span className="lead__sub">Bonds</span>
        </div>
      </header>

      <div className="lead__map" role="group" aria-label="Leadership timeline">
        <div className="lead__axis" aria-hidden="true">
          <span className="lead__arrow" />
        </div>
        {years.map((y, i) => (
          <div className="lead__year" key={y} style={{ left: `${yearX(y, i)}%` }} aria-hidden="true">
            <span>{y}</span>
          </div>
        ))}
        <div className="lead__lane lead__lane--0" aria-hidden="true" />
        <div className="lead__lane lead__lane--1" aria-hidden="true" />
        {roles.map((r, i) => (
          <button
            key={r.title}
            className={`lcard lcard--lane${r.lane}`}
            style={{ left: `${xOf(r.from)}%` }}
            data-selected={i === selected}
            aria-pressed={i === selected}
            aria-label={`${r.title}, ${r.org}, ${r.start} to ${r.end}`}
            onClick={() => setSelected(i)}
            onMouseEnter={() => setSelected(i)}
            onFocus={() => setSelected(i)}
          >
            <span className="lcard__title">{r.cardTitle}</span>
            <span className="lcard__org">{r.cardOrg}</span>
          </button>
        ))}
      </div>

      <section className="lead__panel" aria-live="polite" key={role.title}>
        <h2 className="lead__panel-title">{role.title}</h2>
        <p className="lead__panel-meta">
          {role.org} · {role.start} to {role.end}
        </p>
        {role.bullets.length > 0 && (
          <ul className="lead__panel-list">
            {role.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
      </section>

      <div className="lead__guide">
        <KeyGuide
          align="left"
          hints={[
            { keys: ['←', '→'], label: 'Select role' },
            { keys: ['↑', '↓'], label: 'Switch lane' },
            { keys: ['Esc'], label: 'Back' },
          ]}
        />
      </div>
    </div>
  )
}
