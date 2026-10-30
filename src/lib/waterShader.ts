// Animated "ocean surface" for the page background.
// Draws the depth gradient, then layers posterized, slowly morphing noise on top
// (three flat tones, large near the top and fading out with depth), like the mockups.

export const VERTEX_SHADER = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

export const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 uRes;   // canvas size in pixels
uniform float uTime; // seconds

// --- 3D simplex noise (Ashima Arts / Stefan Gustavson, MIT licence) ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// Depth gradient: #6FE3FA -> #2BB4EE -> #1A78E0 -> #0F45C4 -> #0A2794
vec3 depthColor(float t) {
  vec3 c0 = vec3(0.435, 0.890, 0.980);
  vec3 c1 = vec3(0.169, 0.706, 0.933);
  vec3 c2 = vec3(0.102, 0.471, 0.878);
  vec3 c3 = vec3(0.059, 0.271, 0.769);
  vec3 c4 = vec3(0.039, 0.153, 0.580);
  if (t < 0.25) return mix(c0, c1, t / 0.25);
  if (t < 0.5) return mix(c1, c2, (t - 0.25) / 0.25);
  if (t < 0.75) return mix(c2, c3, (t - 0.5) / 0.25);
  return mix(c3, c4, (t - 0.75) / 0.25);
}

float band(float n, float edge) {
  return smoothstep(edge - 0.012, edge + 0.012, n);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float depth = 1.0 - uv.y;            // 0 at the top of the page, 1 at the bottom
  vec3 col = depthColor(depth);

  // Surface pattern: strong near the top, fading through the middle, gone by ~44% down
  float mask = 1.0 - smoothstep(0.08, 0.44, depth);
  if (mask > 0.001) {
    float aspect = uRes.x / uRes.y;
    // Blobs are stretched sideways and get smaller deeper down (integrated so there's no shear)
    float y = 9.0 * (depth + 0.9 * depth * depth);
    vec2 q = vec2(uv.x * aspect * 1.8 + uTime * 0.035, y);
    float t = uTime * 0.11;
    float n = 0.66 * snoise(vec3(q, t))
            + 0.22 * snoise(vec3(q * vec2(2.6, 2.2) + 7.1, t * 1.3))
            + 0.12 * snoise(vec3(q * vec2(7.0, 5.0) + 3.7, t * 1.7)); // wobbly edges

    // Three flat tones, like a posterized photo of the surface
    float dark = 1.0 - band(n, -0.30);
    float light = band(n, 0.26);
    float pale = band(n, 0.50);
    col = mix(col, vec3(0.078, 0.408, 0.839), dark * 0.32 * mask);  // #1468D6
    col = mix(col, vec3(0.498, 0.894, 0.984), light * 0.48 * mask); // #7FE4FB
    col = mix(col, vec3(0.867, 0.984, 1.000), pale * 0.55 * mask);  // #DDFBFF
  }

  gl_FragColor = vec4(col, 1.0);
}
`
