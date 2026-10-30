import './KeyGuide.css'

export type KeyHint = { keys: string[]; label: string }

type Props = { prompt?: string; hints: KeyHint[]; align?: 'left' | 'right' }

/** "Guide" prompt with key hints, shared by game-style screens. */
export default function KeyGuide({ prompt, hints, align = 'right' }: Props) {
  return (
    <div className={`keyguide keyguide--${align}`}>
      {prompt && <p className="keyguide__prompt">{prompt}</p>}
      <p className="keyguide__keys" aria-hidden="true">
        {hints.map((h) => (
          <span className="keyguide__hint" key={h.label}>
            {h.keys.map((k) => (
              <kbd key={k}>{k}</kbd>
            ))}
            <span>{h.label}</span>
          </span>
        ))}
      </p>
    </div>
  )
}
