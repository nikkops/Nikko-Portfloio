import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import KeyGuide from '../components/KeyGuide'
import SkillEmblem from '../components/SkillEmblem'
import { site } from '../data/content'
import './Contact.css'

function MailIcon() {
  return (
    <svg className="contact__mail-icon" viewBox="0 0 24 18" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M1.5 2.5L12 10.5L22.5 2.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  )
}

export default function Contact() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  useEffect(() => () => window.clearTimeout(timer.current), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      switch (e.key) {
        case 'Enter': {
          const active = document.activeElement
          if (active instanceof HTMLAnchorElement || active instanceof HTMLButtonElement) return
          window.location.href = `mailto:${site.email}`
          break
        }
        case 'c':
        case 'C':
          copy()
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
    <div className="contact">
      <div className="contact__decor" aria-hidden="true">
        <div className="contact__veil" />
        <div className="contact__divider" />
        <div className="contact__ring contact__ring--a" />
        <div className="contact__ring contact__ring--b" />
        <span className="contact__bubble" />
      </div>

      <header className="contact__head">
        <nav className="contact__crumb" aria-label="Breadcrumb">
          <Link to="/menu">Menu</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Contact</span>
        </nav>
        <div className="contact__titlerow">
          <h1 className="contact__title">Contact</h1>
          <span className="contact__sub">Reach out</span>
        </div>
      </header>

      <section className="contact__box">
        <p className="contact__speaker">Nikko</p>
        <p className="contact__line">
          Thanks for diving this deep. If you'd like to get in touch about anything you saw here, send me an email.
        </p>
        <a className="contact__email" href={`mailto:${site.email}`}>
          {/* the shadow sits on the link and the slant on the bar, so the clip doesn't cut the shadow */}
          <span className="contact__email-bar">
            <MailIcon />
            <span className="contact__email-text">{site.email}</span>
          </span>
        </a>
        <div className="contact__actions">
          <button className="contact__btn" onClick={copy}>
            <span>{copied ? 'Copied ✓' : 'Copy email'}</span>
          </button>
          <a className="contact__btn" href={site.resumeUrl} download>
            <span>Résumé ↓</span>
          </a>
        </div>
        <p className="contact__status" role="status">
          {copied ? 'Email copied to clipboard' : ''}
        </p>
      </section>

      <div className="contact__emblem" aria-hidden="true">
        <SkillEmblem icon="mail" tilt={38} />
      </div>

      <div className="contact__guide">
        <KeyGuide
          prompt="Send a message?"
          hints={[
            { keys: ['Enter'], label: 'Email' },
            { keys: ['C'], label: 'Copy' },
            { keys: ['Esc'], label: 'Back' },
          ]}
        />
      </div>
    </div>
  )
}
