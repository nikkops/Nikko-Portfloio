import { useCallback, useEffect, useRef, useState } from 'react'

// Speech pacing: a steady beat per character, with breaths after punctuation
const CHAR_MS = 20
const COMMA_MS = 90 // , ; :
const STOP_MS = 220 // . ! ?

function pauseAfter(text: string, i: number): number {
  const next = text[i + 1]
  if (next !== undefined && next !== ' ') return 0 // "3.5", "e.g" keep going
  const c = text[i]
  if (c === '.' || c === '!' || c === '?') return STOP_MS
  if (c === ',' || c === ';' || c === ':') return COMMA_MS
  return 0
}

/**
 * Reveals `text` one character at a time like game dialogue. Timed off the clock, not
 * frames, so a dropped frame catches up instead of slowing the speech. `skip` completes
 * the line at once. Reduced-motion users get the whole line straight away.
 */
export function useTypewriter(text: string, startDelay = 0) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // Progress is stored with the line it belongs to, so a new line starts from zero without a reset
  const [progress, setProgress] = useState({ text, count: 0 })
  const count = reduced ? text.length : progress.text === text ? progress.count : 0
  const frame = useRef(0)

  useEffect(() => {
    if (reduced) return

    // When each character appears, in ms from the start
    const at: number[] = []
    let t = 0
    for (let i = 0; i < text.length; i++) {
      at.push(t)
      t += CHAR_MS + pauseAfter(text, i)
    }

    const start = performance.now() + startDelay
    let shown = 0
    const tick = (now: number) => {
      const elapsed = now - start
      const before = shown
      while (shown < text.length && at[shown] <= elapsed) shown++
      if (shown !== before) setProgress({ text, count: shown })
      if (shown < text.length) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [text, startDelay, reduced])

  const skip = useCallback(() => {
    cancelAnimationFrame(frame.current)
    setProgress({ text, count: text.length })
  }, [text])

  return { count, done: count >= text.length, skip }
}
