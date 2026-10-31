import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import KeyGuide from '../components/KeyGuide'
import SkillEmblem from '../components/SkillEmblem'
import SkillIcon from '../components/SkillIcon'
import { certs, projects, skillTabs, type SkillIcon as Icon } from '../data/content'
import './Skills.css'

type TabId = (typeof skillTabs)[number]['id'] | 'certs'
const TABS: { id: TabId; label: string; icon: Icon }[] = [
  ...skillTabs.map((t) => ({ id: t.id as TabId, label: t.label, icon: t.icon })),
  { id: 'certs', label: 'Certs', icon: 'star' },
]
const tabInfo = (id: string) => TABS.find((t) => t.id === id)
const projectName = (slug: string) => projects.find((p) => p.slug === slug)?.name ?? slug

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg className="skills__chev" viewBox="0 0 20 32" aria-hidden="true">
      <path d={dir === 'left' ? 'M16 3L4 16L16 29' : 'M4 3L16 16L4 29'} fill="none" stroke="currentColor" strokeWidth="5" />
    </svg>
  )
}

export default function Skills() {
  const navigate = useNavigate()
  const [tabIndex, setTabIndex] = useState(2) // Backend & Data, as in the mockup
  const [row, setRow] = useState(0)
  const tab = TABS[tabIndex]
  const isCerts = tab.id === 'certs'
  const skills = isCerts ? [] : skillTabs.find((t) => t.id === tab.id)!.skills
  const rowCount = isCerts ? certs.length : skills.length
  const skill = isCerts ? undefined : skills[row]
  const cert = isCerts ? certs[row] : undefined

  const goTab = (i: number) => {
    setTabIndex((i + TABS.length) % TABS.length)
    setRow(0)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      switch (e.key) {
        case 'q':
        case 'Q':
          goTab(tabIndex - 1)
          break
        case 'e':
        case 'E':
          goTab(tabIndex + 1)
          break
        case 'ArrowDown':
          e.preventDefault()
          setRow((r) => (r + 1) % rowCount)
          break
        case 'ArrowUp':
          e.preventDefault()
          setRow((r) => (r - 1 + rowCount) % rowCount)
          break
        case 'Enter': {
          const active = document.activeElement
          if (active instanceof HTMLAnchorElement || active instanceof HTMLButtonElement) return
          if (skill && skill.projects[0]) navigate(`/projects/${skill.projects[0]}`)
          // A certification opens the skill tab it backs up
          if (cert && cert.tab !== 'general') goTab(TABS.findIndex((t) => t.id === cert.tab))
          break
        }
        case 'Escape':
          navigate('/menu')
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="skills" data-certs={isCerts}>
      <div className="skills__decor" aria-hidden="true">
        <span className="skills__ghost">Skills</span>
        <div className="skills__ring" />
        <div className="skills__ghost-card" />
      </div>

      <nav className="skills__crumb" aria-label="Breadcrumb">
        <Link to="/menu">Menu</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Skills</span>
      </nav>

      <div className="skills__emblem" aria-hidden="true">
        <SkillEmblem icon={tab.icon} />
      </div>

      <div className="skills__slab">
        <div className="skills__tabs" role="tablist" aria-label="Skill categories">
          <button className="skills__qe" onClick={() => goTab(tabIndex - 1)} aria-label="Previous category">
            <Chevron dir="left" />Q
          </button>
          {TABS.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === tabIndex}
              className="skills__tab"
              onClick={() => goTab(i)}
            >
              <SkillIcon icon={t.icon} />
              {t.label}
            </button>
          ))}
          <button className="skills__qe" onClick={() => goTab(tabIndex + 1)} aria-label="Next category">
            E<Chevron dir="right" />
          </button>
        </div>

        <div className="skills__table" role="tabpanel" aria-label={tab.label} key={tab.id}>
          <div className="skills__head" aria-hidden="true">
            <span>No.</span>
            <span>{isCerts ? 'Certification' : 'Skill'}</span>
            <span>{isCerts ? 'Issuer' : 'Last used'}</span>
            <span>{isCerts ? 'Skill tab' : 'Proof'}</span>
          </div>
          <ul className="skills__rows">
            {isCerts
              ? certs.map((c, i) => {
                  const t = c.tab === 'general' ? { label: 'General', icon: 'dot' as Icon } : tabInfo(c.tab)!
                  return (
                    <li key={c.name}>
                      <button
                        className="srow"
                        data-selected={i === row}
                        onClick={() => setRow(i)}
                        onMouseEnter={() => setRow(i)}
                      >
                        <span className="srow__no">{i + 1}</span>
                        <span className="srow__name">{c.name}</span>
                        <span className="srow__issuer">{c.issuer}</span>
                        <span className="srow__tab">
                          <SkillIcon icon={t.icon} size={14} />
                          {t.label}
                        </span>
                      </button>
                    </li>
                  )
                })
              : skills.map((s, i) => (
                  <li key={s.name}>
                    <button
                      className="srow"
                      data-selected={i === row}
                      onClick={() => setRow(i)}
                      onMouseEnter={() => setRow(i)}
                    >
                      <span className="srow__no">{i + 1}</span>
                      <span className="srow__name">{s.name}</span>
                      <span className="srow__year">{s.lastUsed ?? '—'}</span>
                      <span className="srow__proof">
                        <span>{s.proof}</span>
                      </span>
                    </button>
                  </li>
                ))}
          </ul>
        </div>

        {skill && (
          <div className="skills__detail" aria-live="polite" key={`${tab.id}-${row}`}>
            <h2 className="skills__detail-title">Where it's used</h2>
            <p className="skills__detail-body">{skill.where}</p>
            {skill.projects.length > 0 && (
              <ul className="skills__tags">
                {skill.projects.map((slug) => (
                  <li key={slug}>
                    <Link to={`/projects/${slug}`}>{projectName(slug)}</Link>
                  </li>
                ))}
              </ul>
            )}
            <div className="skills__dots" aria-hidden="true">
              {skills.map((_, i) => (
                <span key={i} data-active={i === row} />
              ))}
            </div>
          </div>
        )}
        {cert && (
          <p className="skills__note" aria-live="polite" key={`cert-${row}`}>
            <strong>{cert.note.split(' · ')[0]}</strong>
            {cert.note.includes(' · ') && <> · {cert.note.split(' · ')[1]}</>}
          </p>
        )}
      </div>

      <div className="skills__guide">
        <KeyGuide
          prompt={isCerts ? 'Which certification do you want to view?' : 'Which skill do you want to view?'}
          hints={[
            { keys: ['Q', 'E'], label: 'Category' },
            { keys: ['↑', '↓'], label: 'Select' },
            { keys: ['Enter'], label: 'Open' },
            { keys: ['Esc'], label: 'Back' },
          ]}
        />
      </div>
    </div>
  )
}
