import { useEffect, useRef, useState } from 'react'
import { FRAGMENT_SHADER, VERTEX_SHADER } from '../lib/waterShader'
import './Background.css'

const RENDER_SCALE = 0.7 // draw at 70% of CSS pixels: sharp enough edges, still light on the GPU
const FRAME_MS = 1000 / 30 // 30 fps is plenty for slow water and halves the work

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

/**
 * Page background: a live WebGL water surface.
 * Falls back to the plain CSS gradient if WebGL is unavailable, and draws a single
 * still frame for visitors who prefer reduced motion.
 */
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [webgl, setWebgl] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) {
      setWebgl(false)
      return
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const program = gl.createProgram()
    if (!vs || !fs || !program) {
      setWebgl(false)
      return
    }
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebgl(false)
      return
    }
    gl.useProgram(program)

    // One triangle that covers the whole screen
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
    const uRes = gl.getUniformLocation(program, 'uRes')
    const uTime = gl.getUniformLocation(program, 'uTime')

    const resize = () => {
      const w = Math.max(1, Math.round(window.innerWidth * RENDER_SCALE))
      const h = Math.max(1, Math.round(window.innerHeight * RENDER_SCALE))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform2f(uRes, w, h)
    }

    const start = performance.now()
    // Start at a random point in time so each visit's surface looks a little different
    const offset = Math.random() * 100
    const draw = (now: number) => {
      gl.uniform1f(uTime, offset + (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let last = 0
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop) // rAF pauses on its own when the tab is hidden
      if (now - last < FRAME_MS) return
      last = now
      draw(now)
    }
    const run = () => {
      cancelAnimationFrame(raf)
      resize()
      if (motion.matches) draw(start) // one still frame
      else raf = requestAnimationFrame(loop)
    }

    const onResize = () => {
      resize()
      if (motion.matches) draw(start)
    }
    const onLost = (e: Event) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
      setWebgl(false)
    }

    run()
    window.addEventListener('resize', onResize)
    motion.addEventListener('change', run)
    canvas.addEventListener('webglcontextlost', onLost)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      motion.removeEventListener('change', run)
      canvas.removeEventListener('webglcontextlost', onLost)
      gl.deleteBuffer(buf)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return (
    <div className="water-bg" aria-hidden="true">
      {webgl && <canvas ref={canvasRef} className="water-bg__canvas" />}
    </div>
  )
}
