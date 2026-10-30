import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import KeyGuide from '../components/KeyGuide'
import { projectSections, projects, type SectionId } from '../data/content'
import NotFound from './NotFound'
import './ProjectDetail.css'

const pad = (n: number) => String(n).padStart(2, '0')
const COLLAGE_SLOTS = 4

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg className="pdetail__chev" viewBox="0 0 20 32" aria-hidden="true">
      <path d={dir === 'left' ? 'M16 3L4 16L16 29' : 'M4 3L16 16L4 29'} fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="miter" />
    </svg>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  if (index < 0) return <NotFound />
  // keyed by slug so the section resets to Overview when switching projects
  return <Detail key={slug} index={index} />
}

function Detail({ index }: { index: number }) {
  const navigate = useNavigate()
  const project = projects[index]
  const count = projects.length
  const prev = projects[(index - 1 + count) % count]
  const next = projects[(index + 1) % count]
  const [section, setSection] = useState<SectionId>('overview')
  const sectionIndex = projectSections.findIndex((s) => s.id === section)
  const current = projectSections[sectionIndex]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      const n = projectSections.length
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSection(projectSections[(sectionIndex + 1) % n].id)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSection(projectSections[(sectionIndex - 1 + n) % n].id)
          break
        case 'q':
        case 'Q':
          navigate(`/projects/${prev.slug}`)
          break
        case 'e':
        case 'E':
          navigate(`/projects/${next.slug}`)
          break
        case 'Escape':
          navigate('/projects', { state: { slug: project.slug } })
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, sectionIndex, prev.slug, next.slug, project.slug])

  return (
    <div className="pdetail">
      <div className="pdetail__decor" aria-hidden="true">
        <span className="pdetail__ghost">Projects</span>
        <div className="pdetail__veil" />
        <div className="pdetail__divider" />
        <div className="pdetail__ring" />
      </div>

      <div className="pdetail__left">
        <nav className="pdetail__crumb" aria-label="Breadcrumb">
          <Link to="/menu">Menu</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/projects" state={{ slug: project.slug }}>
            Projects
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{project.name}</span>
        </nav>

        <div className="pdetail__slab">
          <Link to={`/projects/${prev.slug}`} className="pdetail__nav pdetail__nav--prev" aria-label={`Previous project: ${prev.name}`}>
            <Chevron dir="left" />Q
          </Link>
          <p className="pdetail__kind">
            {project.kind} · {project.year}
          </p>
          <Link to={`/projects/${next.slug}`} className="pdetail__nav pdetail__nav--next" aria-label={`Next project: ${next.name}`}>
            E<Chevron dir="right" />
          </Link>
        </div>

        <div className="pdetail__card">
          <div className="pdetail__id">
            <p className="pdetail__num">Project {pad(index + 1)}</p>
            <h1
              className="pdetail__name"
              // long names (e.g. "HAUbout That Way?") are set smaller so they fit the shorter card
              style={{ ['--name-scale' as string]: project.name.length > 10 ? 0.62 : 1 }}
            >
              {project.name}
            </h1>
            <ul className="pdetail__stack" aria-label="Stack">
              {project.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          {project.outcome && (
            <div className="pdetail__outcome">
              <p className="pdetail__outcome-label">Outcome</p>
              <p className="pdetail__outcome-value">{project.outcome}</p>
            </div>
          )}
        </div>

        <p className="pdetail__desc">
          <span>{project.description}</span>
        </p>

        <div className="pdetail__sections">
          <h2 className="pdetail__sections-title">Sections</h2>
          <ul className="pdetail__tabs">
            {projectSections.map((s) => (
              <li key={s.id}>
                <button
                  className="pdetail__tab"
                  data-selected={s.id === section}
                  aria-pressed={s.id === section}
                  onClick={() => setSection(s.id)}
                >
                  <span>{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="pdetail__guide">
          <KeyGuide
            align="left"
            hints={[
              { keys: ['Q', 'E'], label: 'Project' },
              { keys: ['↑', '↓'], label: 'Section' },
              { keys: ['Esc'], label: 'List' },
            ]}
          />
        </div>
      </div>

      <div className="pdetail__collage" aria-label="Screenshots">
        {Array.from({ length: COLLAGE_SLOTS }, (_, i) => {
          const src = project.screens?.[i]
          return (
            <figure className={`pshot pshot--${i + 1}`} key={i}>
              {src ? (
                <img src={src} alt={`${project.name} screenshot ${i + 1}`} />
              ) : (
                <span className="pshot__placeholder">[Screenshot]</span>
              )}
            </figure>
          )
        })}
      </div>

      <section className="pdetail__panel" aria-live="polite" key={section}>
        <h2 className="pdetail__panel-title">{current.label}</h2>
        <p className="pdetail__panel-body">{project.sections[section]}</p>
        {section === 'links' && project.links && project.links.length > 0 && (
          <ul className="pdetail__links">
            {project.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
