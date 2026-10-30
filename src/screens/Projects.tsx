import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import KeyGuide from '../components/KeyGuide'
import { projects } from '../data/content'
import './Projects.css'

const pad = (n: number) => String(n).padStart(2, '0')
const shortYear = (y: number) => `'${String(y).slice(2)}`

export default function Projects() {
  const navigate = useNavigate()
  const location = useLocation()
  // Coming back from a detail page (Esc) keeps that project selected
  const [selected, setSelected] = useState(() => {
    const from = (location.state as { slug?: string } | null)?.slug
    return Math.max(0, projects.findIndex((p) => p.slug === from))
  })
  const current = projects[selected]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      const count = projects.length
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelected((i) => (i + 1) % count)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelected((i) => (i - 1 + count) % count)
          break
        case 'Enter': {
          // A focused link already handles Enter natively.
          if (document.activeElement instanceof HTMLAnchorElement) return
          navigate(`/projects/${projects[selected].slug}`)
          break
        }
        case 'Escape':
          navigate('/menu')
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, selected])

  return (
    <div className="plist">
      {/* Decorations live in a clipped layer so the big rotated word can't cause scrolling */}
      <div className="plist__decor" aria-hidden="true">
        <div className="plist__divider" />
        <div className="plist__veil" />
        <div className="plist__ring" />
        <span className="plist__ghost">Projects</span>
        <span className="plist__bubble plist__bubble--a" />
        <span className="plist__bubble plist__bubble--b" />
      </div>

      <header className="plist__head">
        <nav className="plist__crumb" aria-label="Breadcrumb">
          <Link to="/menu">Menu</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Projects</span>
        </nav>
        <h1 className="plist__title">List</h1>
      </header>

      <nav className="plist__listwrap" aria-label="Projects">
        <div className="plist__rail" aria-hidden="true">
          <span
            className="plist__rail-thumb"
            style={{ top: `${(selected / projects.length) * 100}%`, height: `${100 / projects.length}%` }}
          />
        </div>
        <ul className="plist__list">
          {projects.map((p, i) => (
            <li key={p.slug} className="plist__row" style={{ ['--i' as string]: i }}>
              <Link
                to={`/projects/${p.slug}`}
                className="pbar"
                data-selected={i === selected}
                aria-current={i === selected ? 'true' : undefined}
                onMouseEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
              >
                <span className="pbar__body">
                  <span className="pbar__num">
                    <span>{pad(i + 1)}</span>
                  </span>
                  <span className="pbar__name">{p.name}</span>
                  <span className="pbar__year">
                    <small>Year</small>
                    {shortYear(p.year)}
                  </span>
                  <span className="pbar__sub">
                    <span>
                      {p.kind} · {p.shortRole}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <aside className="plist__side" aria-live="polite">
        <div className="ppreview" key={`pv-${current.slug}`}>
          <p className="ppreview__label">Preview</p>
          {current.badge && <p className="ppreview__badge">{current.badge}</p>}
          {current.screenshot ? (
            <img className="ppreview__img" src={current.screenshot} alt={`${current.name} screenshot`} />
          ) : (
            <p className="ppreview__placeholder">[{current.name} screenshot]</p>
          )}
        </div>
        <div className="pinfo" key={`pi-${current.slug}`}>
          <h2 className="pinfo__name">{current.name}</h2>
          <p className="pinfo__summary">{current.summary}</p>
          <Link to={`/projects/${current.slug}`} className="pinfo__open">
            <kbd>Enter</kbd>
            <span>View project</span>
          </Link>
        </div>
        <div className="plist__guide">
          <KeyGuide
            prompt="Which project do you want to view?"
            hints={[
              { keys: ['↑', '↓'], label: 'Select' },
              { keys: ['Enter'], label: 'View' },
              { keys: ['Esc'], label: 'Back' },
            ]}
          />
        </div>
      </aside>
    </div>
  )
}
