/** Points for a regular polygon or star, centred on (cx, cy). */
export function polyPoints(cx: number, cy: number, r: number, sides: number, rot = -90, inner?: number) {
  const pts: string[] = []
  const n = inner ? sides * 2 : sides
  for (let i = 0; i < n; i++) {
    const rr = inner && i % 2 === 1 ? inner : r
    const a = ((rot + (360 / n) * i) * Math.PI) / 180
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`)
  }
  return pts.join(' ')
}
