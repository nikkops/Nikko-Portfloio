import { Component, createRef, type ReactNode } from 'react'
import { projects } from '../data/content'
import './ScreenTransition.css'

/*
 * Persona-style screen change. The outgoing screen is copied into an inert ghost layer
 * and its panels slide off (fast, ease-in); the incoming screen mounts straight away, so
 * its key handlers are live from the first frame, and its panels slide in with a stagger
 * once the exit has cleared (ease-out). Total ≈ EXIT + STAGGER_CAP + ENTER ≈ 720ms.
 * Between two projects the frames hold still and only what changes moves: the text inside the
 * Q/E bar, title card and description (the frames' slanted clip-paths mask it, so it reads as a
 * wipe), plus the screenshots and the section panel. Same motion as every other screen.
 */

const EXIT = 180
const ENTER = 380
const STAGGER = 40
const STAGGER_CAP = 160
const EXIT_DISTANCE = 80
const ENTER_DISTANCE = 56
const EASE_IN = 'cubic-bezier(0.7, 0, 0.84, 0)'
const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'

// The cards and panels that move, in stagger order. Everything else (aria-hidden decor) cross-fades.
const PANELS = [
  '.title__top', '.title__main', '.title__bottom',
  '.menu__intro', '.menu__row', '.menu__guide',
  '.about__head', '.about__photo', '.about__deckzone', '.about__cards',
  '.about__dialogue-wrap', '.about__plate', '.about__guide',
  '.plist__head', '.plist__rail', '.plist__row', '.ppreview', '.pinfo', '.plist__guide',
  '.pdetail__crumb', '.pdetail__slab', '.pdetail__card', '.pdetail__desc', '.pdetail__sections',
  '.pdetail__guide', '.pshot', '.pdetail__panel',
  '.skills__crumb', '.skills__emblem', '.skills__slab', '.skills__guide',
  '.lead__head', '.lead__map', '.lead__panel', '.lead__guide',
  '.contact__head', '.contact__box', '.contact__emblem', '.contact__guide',
].join(',')

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function panelsOf(root: Element): HTMLElement[] {
  const found = root.querySelectorAll<HTMLElement>(PANELS)
  if (found.length) return [...found]
  // Screens without named panels (e.g. Not found) move their top-level content
  return [...root.children].filter(
    (el): el is HTMLElement => el instanceof HTMLElement && el.getAttribute('aria-hidden') !== 'true',
  )
}

/*
 * Between two projects the crumb, Sections buttons, key hints, decor and the card/bar frames hold
 * still. Returns the selector for what moves, or null when the whole screen should transition.
 */
const PROJECT_MOVING = [
  '.pdetail__kind', '.pdetail__num', '.pdetail__name', '.pdetail__stack', '.pdetail__outcome',
  '.pdetail__desc > span', '.pshot', '.pdetail__panel',
].join(',')
const projectIndex = (path: string) =>
  /^\/projects\/[^/]+$/.test(path) ? projects.findIndex((p) => p.slug === path.split('/')[2]) : -1

function scopeOf(from: string, to: string): string | null {
  return projectIndex(from) >= 0 && projectIndex(to) >= 0 ? PROJECT_MOVING : null
}

function movingOf(root: Element, scope: string | null): HTMLElement[] {
  return scope ? [...root.querySelectorAll<HTMLElement>(scope)] : panelsOf(root)
}

function decorOf(root: Element): HTMLElement[] {
  return [...root.children].filter(
    (el): el is HTMLElement => el instanceof HTMLElement && el.getAttribute('aria-hidden') === 'true',
  )
}

/** Deeper routes move forward (content exits left); going back reverses it. */
function depth(path: string): number {
  if (path === '/') return 0
  if (path === '/menu') return 1
  return path.split('/').filter(Boolean).length + 1
}

function direction(from: string, to: string): 1 | -1 {
  const a = depth(from)
  const b = depth(to)
  if (a !== b) return b > a ? 1 : -1
  // Q/E between projects: earlier project slides in from the left
  return projectIndex(to) < projectIndex(from) ? -1 : 1
}

type Props = { pathname: string; children: ReactNode }
type Snapshot = { ghost: HTMLElement; scrollTop: number } | null

export default class ScreenTransition extends Component<Props> {
  private screen = createRef<HTMLElement>()
  private ghostLayer = createRef<HTMLDivElement>()
  private running: Animation[] = []
  private busyUntil = 0

  componentDidMount() {
    this.enter(1, false, 0, null)
  }

  getSnapshotBeforeUpdate(prev: Props): Snapshot {
    if (prev.pathname === this.props.pathname) return null
    const root = this.screen.current?.firstElementChild
    // Mid-transition the old screen is half-drawn, so skip its exit rather than ghost it
    if (!root || performance.now() < this.busyUntil) return null
    const ghost = root.cloneNode(true) as HTMLElement
    ghost.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'))
    return { ghost, scrollTop: root.scrollTop }
  }

  componentDidUpdate(prev: Props, _: unknown, snap: Snapshot) {
    if (prev.pathname === this.props.pathname) return
    const interrupted = performance.now() < this.busyUntil
    this.clear()
    const dir = direction(prev.pathname, this.props.pathname)
    const scope = scopeOf(prev.pathname, this.props.pathname)

    if (snap) this.exit(snap, dir, scope)
    this.enter(dir, interrupted, snap ? EXIT : 0, scope)
  }

  componentWillUnmount() {
    this.clear()
  }

  private clear() {
    this.running.forEach((a) => a.cancel())
    this.running = []
    this.ghostLayer.current?.replaceChildren()
  }

  private track(a: Animation) {
    this.running.push(a)
    return a
  }

  private exit({ ghost, scrollTop }: NonNullable<Snapshot>, dir: 1 | -1, scope: string | null) {
    const layer = this.ghostLayer.current
    if (!layer) return
    layer.append(ghost)
    ghost.scrollTop = scrollTop

    // A scoped change shows only the moving parts of the ghost; the live screen already has the rest in place
    const moving = movingOf(ghost, scope)
    if (scope) {
      ghost.style.visibility = 'hidden'
      for (const el of moving) {
        el.style.visibility = 'visible'
        // Hidden frames still apply their filters (the card's hard drop-shadow) to visible text, which would
        // leave an offset shadow copy of the old text. Those frames aren't drawn, so drop the filters.
        // Their clip-paths stay, so the text is still masked by the slanted shapes as it leaves.
        for (let up = el.parentElement; up && up !== ghost; up = up.parentElement) up.style.filter = 'none'
      }
    }

    const done = () => ghost.remove()
    if (reducedMotion()) {
      const fading = scope ? moving : [ghost]
      fading.forEach((el) => this.track(el.animate([{ opacity: 0 }], { duration: 120, easing: 'ease-out', fill: 'forwards' })))
      this.track(ghost.animate([{ opacity: 1 }, { opacity: 1 }], { duration: 120 })).finished.then(done, done)
      return
    }

    const options = { duration: EXIT, easing: EASE_IN, fill: 'forwards' as const }
    for (const el of moving) {
      this.track(el.animate([{ opacity: 0, translate: `${-dir * EXIT_DISTANCE}px 0` }], options))
    }
    if (!scope) {
      for (const el of decorOf(ghost)) {
        this.track(el.animate([{ opacity: 0 }], { ...options, easing: 'linear' }))
      }
    }
    this.track(ghost.animate([{ opacity: 1 }, { opacity: 1 }], { duration: EXIT })).finished.then(done, done)
  }

  private enter(dir: 1 | -1, interrupted: boolean, delay: number, scope: string | null) {
    const root = this.screen.current?.firstElementChild
    if (!(root instanceof HTMLElement)) return
    const moving = movingOf(root, scope)

    if (reducedMotion()) {
      const fading = scope ? moving : [root]
      for (const el of fading) {
        this.track(el.animate([{ opacity: 0, offset: 0 }], { duration: 180, delay: delay ? 60 : 0, easing: 'ease-out', fill: 'backwards' }))
      }
      this.busyUntil = performance.now() + 240
      return
    }

    // Rapid repeats (holding E on a project) get a short, unstaggered entrance so they keep up
    const stagger = interrupted ? 0 : STAGGER
    const duration = interrupted ? 160 : ENTER
    const distance = interrupted ? 24 : ENTER_DISTANCE
    let last = 0
    moving.forEach((el, i) => {
      const d = delay + Math.min(i * stagger, STAGGER_CAP)
      last = Math.max(last, d)
      this.track(
        el.animate([{ opacity: 0, translate: `${dir * distance}px 0`, offset: 0 }], {
          duration,
          delay: d,
          easing: EASE_OUT,
          fill: 'backwards',
        }),
      )
    })
    if (!scope) {
      for (const el of decorOf(root)) {
        this.track(el.animate([{ opacity: 0, offset: 0 }], { duration: EXIT + 80, easing: 'ease-out', fill: 'backwards' }))
      }
    }
    this.busyUntil = performance.now() + last + duration
  }

  render() {
    return (
      <main className="screen" ref={this.screen}>
        {this.props.children}
        <div className="screen__ghost" ref={this.ghostLayer} aria-hidden="true" inert />
      </main>
    )
  }
}
