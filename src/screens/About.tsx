import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArcanaCard from '../components/ArcanaCard'
import KeyGuide from '../components/KeyGuide'
import { about, arcanaCards, site } from '../data/content'
import './About.css'

function Portrait({ tall = false }: { tall?: boolean }) {
  return (
    <figure className={`about__photo${tall ? ' about__photo--tall' : ''}`}>
      <div className="about__photo-slab" aria-hidden="true" />
      <div className="about__photo-frame">
        {about.portraitUrl ? (
          <img src={about.portraitUrl} alt={`Portrait of ${site.name}`} />
        ) : (
          <p className="about__photo-placeholder">
            [Your photo]
            <small>Portrait · {tall ? '420 × 560' : '380 × 440'}</small>
          </p>
        )}
      </div>
    </figure>
  )
}

export default function About() {
  const navigate = useNavigate()
  const [line, setLine] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [selected, setSelected] = useState(1)
  const [flipped, setFlipped] = useState<boolean[]>(() => arcanaCards.map(() => false))

  const lastLine = line >= about.lines.length - 1
  const toggle = (i: number) => setFlipped((f) => f.map((v, idx) => (idx === i ? !v : v)))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      const count = arcanaCards.length
      switch (e.key) {
        case 'Escape':
          navigate('/menu')
          break
        case 'ArrowRight':
          if (revealed) setSelected((i) => (i + 1) % count)
          break
        case 'ArrowLeft':
          if (revealed) setSelected((i) => (i - 1 + count) % count)
          break
        case 'Enter': {
          // A focused link or button already handles Enter natively.
          const active = document.activeElement
          if (active instanceof HTMLAnchorElement || active instanceof HTMLButtonElement) return
          if (revealed) toggle(selected)
          else if (!lastLine) setLine((l) => l + 1)
          else setRevealed(true)
          break
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, revealed, selected, lastLine])

  return (
    <div className="about" data-revealed={revealed}>
      <div className="about__divider" aria-hidden="true" />
      <div className="about__ring about__ring--a" aria-hidden="true" />
      <div className="about__ring about__ring--b" aria-hidden="true" />
      <span className="about__bubble about__bubble--a" aria-hidden="true" />
      <span className="about__bubble about__bubble--b" aria-hidden="true" />

      <header className="about__head">
        <nav className="about__crumb" aria-label="Breadcrumb">
          <Link to="/menu">Menu</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">About</span>
        </nav>
        <div className="about__titlerow">
          <h1 className="about__title">About</h1>
          <span className="about__status">Status</span>
        </div>
      </header>

      {/* One portrait for both states, so it keeps the same size and place when the cards are revealed */}
      <Portrait tall />

      <section className="about__stage">

        {!revealed ? (
          <div className="about__deckzone">
            <p className="about__banner">
              <span aria-hidden="true">✦</span> Reveal the Arcana <span aria-hidden="true">✦</span>
            </p>
            <button className="about__deck" onClick={() => setRevealed(true)} aria-label="Reveal the Arcana">
              {[0, 1, 2].map((i) => (
                <span className="about__deckcard" key={i} style={{ ['--i' as string]: i }}>
                  <ArcanaCard variant="back" />
                </span>
              ))}
            </button>
          </div>
        ) : (
          <div className="about__cards" role="group" aria-label="Arcana cards">
            {arcanaCards.map((card, i) => (
              <div
                className="acard"
                key={card.id}
                data-selected={i === selected}
                style={{ ['--i' as string]: i }}
                onMouseEnter={() => setSelected(i)}
              >
                <span className="acard__tab">{card.tab}</span>
                <button
                  className="acard__btn"
                  data-flipped={flipped[i]}
                  aria-pressed={flipped[i]}
                  aria-label={`${card.name}: ${card.tab}`}
                  onClick={() => {
                    setSelected(i)
                    toggle(i)
                  }}
                  onFocus={() => setSelected(i)}
                >
                  <span className="acard__inner">
                    <span className="acard__face acard__face--front">
                      <ArcanaCard variant={card.id} numeral={card.numeral} name={card.name} />
                    </span>
                    <span className="acard__face acard__face--back">
                      <span className="acard__kicker">{card.kicker}</span>
                      <span className="acard__heading">{card.heading}</span>
                      <span className="acard__body">{card.body}</span>
                      {card.currently && (
                        <span className="acard__currently">
                          <small>Currently</small>
                          {card.currently}
                        </span>
                      )}
                      <span className="acard__tags">
                        {card.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="about__bottom">
        {!revealed ? (
          <div className="about__dialogue-wrap">
            <div className="about__dialogue">
              <p className="about__speaker">Nikko</p>
              <p className="about__line">{about.lines[line]}</p>
              {!lastLine && <span className="about__next" aria-hidden="true" />}
            </div>
          </div>
        ) : (
          <div className="about__plate">
            <p className="about__plate-name">{site.name}</p>
            <p className="about__plate-meta">
              {site.role} · {site.location}
            </p>
          </div>
        )}
        <div className="about__guide">
          {!revealed ? (
            <KeyGuide
              prompt="What do you want to know?"
              hints={[
                { keys: ['Enter'], label: 'Next line' },
                { keys: ['Click deck'], label: 'Reveal' },
                { keys: ['Esc'], label: 'Back' },
              ]}
            />
          ) : (
            <KeyGuide
              prompt="Which card do you want to flip?"
              hints={[
                { keys: ['←', '→'], label: 'Select' },
                { keys: ['Enter'], label: 'Flip' },
                { keys: ['Esc'], label: 'Back' },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  )
}
