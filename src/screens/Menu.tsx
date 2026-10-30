import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { menuItems, site } from '../data/content'
import './Menu.css'

export default function Menu() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(1)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      const count = menuItems.length
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
          const active = document.activeElement
          if (active instanceof HTMLAnchorElement || active instanceof HTMLButtonElement) return
          navigate(menuItems[selected].path)
          break
        }
        case 'Escape':
          navigate('/')
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, selected])

  return (
    <div className="menu">
      <div className="menu__divider" aria-hidden="true" />
      <div className="menu__ring" aria-hidden="true" />
      <span className="menu__bubble menu__bubble--a" aria-hidden="true" />
      <span className="menu__bubble menu__bubble--b" aria-hidden="true" />
      <span className="menu__bubble menu__bubble--c" aria-hidden="true" />

      <section className="menu__intro">
        <p className="menu__name">{site.name}</p>
        <p className="menu__meta">
          {site.role} · {site.location}
        </p>
        <h1 className="menu__title">Menu</h1>
        <a className="menu__resume" href={site.resumeUrl} download>
          <span>Résumé ↓</span>
        </a>
      </section>

      <nav className="menu__nav" aria-label="Main menu">
        <ul className="menu__list">
          {menuItems.map((item, i) => (
            <li key={item.path} className="menu__row">
              <Link
                to={item.path}
                className="menu__item"
                data-selected={i === selected}
                aria-current={i === selected ? 'true' : undefined}
                onMouseEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
              >
                <span className="menu__label">{item.label}</span>
                <span className="menu__sub">{item.subtitle}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="menu__guide">
          <p className="menu__prompt">Where do you want to go?</p>
          <p className="menu__keys" aria-hidden="true">
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            <span>Select</span>
            <kbd>Enter</kbd>
            <span>Open</span>
            <kbd>Esc</kbd>
            <span>Back</span>
          </p>
        </div>
      </nav>
    </div>
  )
}
