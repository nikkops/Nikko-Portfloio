import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { site } from '../data/content'
import './Title.css'

export default function Title() {
  const navigate = useNavigate()
  const [first, ...rest] = site.title.split(' ')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      if (e.key !== 'Enter') return
      // A focused link already handles Enter natively.
      if (document.activeElement instanceof HTMLAnchorElement) return
      navigate('/menu')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <div className="title">
      <div className="title__shaft title__shaft--a" aria-hidden="true" />
      <div className="title__shaft title__shaft--b" aria-hidden="true" />
      <div className="title__ring title__ring--outer" aria-hidden="true" />
      <div className="title__ring title__ring--mid" aria-hidden="true" />
      <div className="title__ring title__ring--inner" aria-hidden="true" />
      <span className="title__bubble title__bubble--a" aria-hidden="true" />
      <span className="title__bubble title__bubble--b" aria-hidden="true" />
      <span className="title__bubble title__bubble--c" aria-hidden="true" />
      <span className="title__bubble title__bubble--d" aria-hidden="true" />

      <header className="title__top">
        <p className="title__name">{site.name}</p>
        <p className="title__meta">
          {site.role} · {site.location}
        </p>
      </header>

      <main className="title__main">
        <h1 className="title__heading">
          <span className="title__line title__line--dark">{first}</span>
          <span className="title__line title__line--light">{rest.join(' ')}</span>
        </h1>
        <p className="title__tagline">
          <span>{site.tagline}</span>
        </p>
      </main>

      <footer className="title__bottom">
        {/* The ::after on this link stretches over the whole screen, so a click anywhere enters. */}
        <Link to="/menu" className="title__enter">
          <span className="title__enter-text title__enter-text--click">Click here to enter</span>
          <span className="title__enter-text title__enter-text--tap">Tap anywhere to enter</span>
        </Link>
        <p className="title__press" aria-hidden="true">
          <span>Or press</span>
          <kbd>Enter</kbd>
        </p>
      </footer>
    </div>
  )
}
