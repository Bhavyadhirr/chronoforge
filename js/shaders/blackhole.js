/**
 * blackhole-bg.js
 * ─────────────────────────────────────────────────────────────
 * Drop-in animated black hole canvas background module.
 *
 * Usage:
 *   import { BlackHoleBG } from './blackhole-bg.js';
 *   const bg = new BlackHoleBG('#canvas-id');   // pass your canvas ID
 *   bg.start();
 *
 * To cleanly unmount (e.g. on SPA route change):
 *   bg.destroy();
 * ─────────────────────────────────────────────────────────────
 */

export class BlackHoleBG {

  // ── Constants ───────────────────────────────────────────────

  static PARTICLE_COUNT  = 1800;
  static ARC_COUNT       = 6;
  static HOLE_R_FACTOR   = 0.095;
  static DISK_FLATTEN    = 0.38;       // y-scale that flattens disk into ellipse
  static MOUSE_LAG       = 0.04;       // lerp factor for mouse smoothing
  static MOUSE_PARALLAX  = 0.018;      // how much the hole drifts with the cursor


  // ── Constructor ─────────────────────────────────────────────

  /**
   * @param {string|HTMLCanvasElement} target  CSS selector string or <canvas> element
   */
  constructor(target) {
    this._canvas  = typeof target === 'string'
      ? document.querySelector(target)
      : target;

    if (!(this._canvas instanceof HTMLCanvasElement)) {
      throw new Error('[BlackHoleBG] target must be a <canvas> element or a valid CSS selector.');
    }

    this._ctx       = this._canvas.getContext('2d');
    this._rafId     = null;
    this._particles = [];
    this._arcs      = [];

    // Viewport dimensions — updated on resize
    this._W  = 0;
    this._H  = 0;
    this._cx = 0;
    this._cy = 0;

    // Mouse state
    this._mouse   = { x: 0, y: 0 };
    this._targetM = { x: 0, y: 0 };

    // Bound callbacks — stored so we can remove them later
    this._onResize      = this._resize.bind(this);
    this._onMouseMove   = this._handleMouseMove.bind(this);
    this._onRenderFrame = this._renderFrame.bind(this);
  }


  // ── Public API ───────────────────────────────────────────────

  /** Attaches event listeners, spawns particles, and starts the render loop. */
  start() {
    window.addEventListener('resize',    this._onResize);
    window.addEventListener('mousemove', this._onMouseMove);

    this._resize();          // sets W/H and seeds mouse to centre
    this._spawnParticles();
    this._spawnArcs();

    this._rafId = requestAnimationFrame(this._onRenderFrame);
    return this;             // chainable
  }

  /** Cancels the animation loop and removes all event listeners. */
  destroy() {
    cancelAnimationFrame(this._rafId);
    window.removeEventListener('resize',    this._onResize);
    window.removeEventListener('mousemove', this._onMouseMove);
  }


  // ── Initialisation helpers ───────────────────────────────────

  _resize() {
    const { _canvas: c } = this;
    this._W  = c.width  = window.innerWidth;
    this._H  = c.height = window.innerHeight;
    this._cx = this._W / 2;
    this._cy = this._H / 2;

    // Re-centre mouse so the hole doesn't jump to a corner on first frame
    this._mouse.x   = this._cx;
    this._mouse.y   = this._cy;
    this._targetM.x = this._cx;
    this._targetM.y = this._cy;
  }

  _handleMouseMove(e) {
    this._targetM.x = e.clientX;
    this._targetM.y = e.clientY;
  }


  // ── Particle factory ─────────────────────────────────────────

  /**
   * Returns a random { r, angle } for spawning / respawning a particle
   * in the orbital ring around the black hole.
   */
  _randomOrbit() {
    const minR  = Math.min(this._W, this._H) * 0.08;
    const maxR  = Math.min(this._W, this._H) * 0.85;
    const r     = minR + Math.random() * (maxR - minR);
    const angle = Math.random() * Math.PI * 2;
    return { r, angle };
  }

  /**
   * Maps normalised proximity-to-centre (0 = outer, 1 = inner) to
   * an rgba colour prefix string, creating the blue → violet → amber → white gradient.
   * @param {number} t  0–1
   * @returns {string}  e.g. "rgba(120,80,200,"
   */
  _particleColor(t) {
    if (t < 0.25) {
      // Outer band — faint blue-grey
      const v = Math.floor(80 + t * 80);
      return `rgba(${v},${v + 10},${v + 30},`;
    }
    if (t < 0.55) {
      // Mid band — indigo / violet
      return `rgba(${Math.floor(80  + t * 120)},${Math.floor(40  + t * 60)},${Math.floor(160 + t * 80)},`;
    }
    if (t < 0.80) {
      // Inner ring — amber / orange
      return `rgba(${Math.floor(200 + t * 55)},${Math.floor(100 + t * 80)},${Math.floor(20  + t * 40)},`;
    }
    // Very inner — near-white hot
    const v = Math.floor(220 + t * 35);
    return `rgba(${v},${Math.floor(v * 0.9)},${Math.floor(v * 0.75)},`;
  }

  _spawnParticles() {
    this._particles = [];
    const { PARTICLE_COUNT } = BlackHoleBG;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const { r, angle } = this._randomOrbit();
      const maxR = Math.min(this._W, this._H) * 0.85;
      const t    = 1 - (r / maxR);                            // 0 = outer, 1 = inner

      this._particles.push({
        r,
        angle,
        speed:        (0.0004 + Math.random() * 0.0012) * (Math.random() < 0.5 ? 1 : -1),
        life:         0.2 + Math.random() * 0.8,
        size:         0.4 + Math.random() * 1.6 * (1 - t * 0.5),
        color:        this._particleColor(t),
        drift:        (Math.random() - 0.5) * 0.00008,       // slow radial inward spiral
        twinkle:      Math.random() * Math.PI * 2,
        twinkleSpeed: 0.01 + Math.random() * 0.04,
      });
    }
  }


  // ── Accretion-disk arc factory ────────────────────────────────

  _spawnArcs() {
    this._arcs = Array.from({ length: BlackHoleBG.ARC_COUNT }, (_, i) => ({
      rFactor: 0.13 + i * 0.028,
      width:   1.5  + Math.random() * 2.5,
      alpha:   0.06 + Math.random() * 0.12,
      speed:   (0.00025 + Math.random() * 0.0004) * (i % 2 === 0 ? 1 : -1),
      angle:   Math.random() * Math.PI * 2,
      gap:     Math.random() * Math.PI * 0.6 + 0.3,
    }));
  }


  // ── Render loop ───────────────────────────────────────────────

  _renderFrame(timestamp) {
    this._rafId = requestAnimationFrame(this._onRenderFrame);
    this._draw(timestamp * 0.001);
  }

  _draw(t) {
    const { _ctx: ctx, _W: W, _H: H, _cx: cx, _cy: cy } = this;
    const { DISK_FLATTEN, HOLE_R_FACTOR, MOUSE_LAG, MOUSE_PARALLAX } = BlackHoleBG;

    // ── Smooth mouse ──────────────────────────────────────────
    this._mouse.x += (this._targetM.x - this._mouse.x) * MOUSE_LAG;
    this._mouse.y += (this._targetM.y - this._mouse.y) * MOUSE_LAG;

    const offX = (this._mouse.x - cx) * MOUSE_PARALLAX;
    const offY = (this._mouse.y - cy) * MOUSE_PARALLAX;

    // Black hole origin (parallax offset)
    const bx = cx + offX;
    const by = cy + offY;

    const holeR = Math.min(W, H) * HOLE_R_FACTOR;

    // ── Clear ────────────────────────────────────────────────
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // ── Deep-space background glow ───────────────────────────
    this._drawSpaceGlow(bx, by, holeR);

    // ── Orbiting particles ───────────────────────────────────
    this._drawParticles(bx, by, holeR, DISK_FLATTEN);

    // ── Accretion-disk arcs ──────────────────────────────────
    this._drawArcs(bx, by, DISK_FLATTEN);

    // ── Photon ring / gravitational lensing ──────────────────
    this._drawLensingGlow(bx, by, holeR, DISK_FLATTEN);

    // ── Event horizon (black void) ───────────────────────────
    this._drawEventHorizon(bx, by, holeR);

    // ── Polar relativistic jets ───────────────────────────────
    this._drawPolarJets(bx, by, holeR);

    // ── Edge vignette ────────────────────────────────────────
    this._drawVignette(cx, cy);
  }


  // ── Draw subroutines ─────────────────────────────────────────

  _drawSpaceGlow(bx, by, holeR) {
    const { _ctx: ctx, _W: W, _H: H } = this;
    const g = ctx.createRadialGradient(bx, by, holeR * 0.5, bx, by, Math.min(W, H) * 0.7);
    g.addColorStop(0,   'rgba(10,5,25,0)');
    g.addColorStop(0.4, 'rgba(8,4,20,0.5)');
    g.addColorStop(1,   'rgba(0,0,0,0.95)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  _drawParticles(bx, by, holeR, flatten) {
    const { _ctx: ctx } = this;
    ctx.save();

    for (const p of this._particles) {
      // Advance orbit
      p.angle   += p.speed;
      p.r       += p.drift;

      // Respawn if swallowed by event horizon
      if (p.r < holeR * 0.6) {
        const { r, angle } = this._randomOrbit();
        p.r     = r;
        p.angle = angle;
      }

      const px = bx + Math.cos(p.angle) * p.r;
      const py = by + Math.sin(p.angle) * p.r * flatten;

      // Twinkle opacity
      p.twinkle += p.twinkleSpeed;
      const tw    = 0.5 + 0.5 * Math.sin(p.twinkle);
      const alpha = p.life * tw;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + alpha + ')';
      ctx.fill();
    }

    ctx.restore();
  }

  _drawArcs(bx, by, flatten) {
    const { _ctx: ctx, _W: W, _H: H } = this;
    ctx.save();

    for (const arc of this._arcs) {
      arc.angle += arc.speed;

      const r  = Math.min(W, H) * arc.rFactor;
      const ry = r * flatten;

      ctx.save();
      ctx.translate(bx, by);
      ctx.scale(1, ry / r);

      ctx.beginPath();
      ctx.arc(0, 0, r, arc.angle, arc.angle + Math.PI * 2 - arc.gap);
      ctx.strokeStyle  = `rgba(200,130,60,${arc.alpha})`;
      ctx.lineWidth    = arc.width;
      ctx.shadowColor  = 'rgba(255,160,60,0.6)';
      ctx.shadowBlur   = 12;
      ctx.stroke();

      ctx.restore();
    }

    ctx.restore();
  }

  _drawLensingGlow(bx, by, holeR, flatten) {
    const { _ctx: ctx } = this;
    const g = ctx.createRadialGradient(bx, by, holeR * 0.85, bx, by, holeR * 2.2);
    g.addColorStop(0,    'rgba(255,200,100,0.18)');
    g.addColorStop(0.15, 'rgba(200,100,60,0.10)');
    g.addColorStop(0.4,  'rgba(80,40,120,0.06)');
    g.addColorStop(1,    'rgba(0,0,0,0)');

    ctx.save();
    ctx.translate(bx, by);
    ctx.scale(1, flatten);
    ctx.beginPath();
    ctx.arc(0, 0, holeR * 2.2, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();
  }

  _drawEventHorizon(bx, by, holeR) {
    const { _ctx: ctx } = this;

    // Outer distortion halo
    const g = ctx.createRadialGradient(bx, by, holeR * 0.7, bx, by, holeR * 1.25);
    g.addColorStop(0,    'rgba(0,0,0,1)');
    g.addColorStop(0.7,  'rgba(0,0,0,1)');
    g.addColorStop(0.85, 'rgba(20,10,40,0.7)');
    g.addColorStop(1,    'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.arc(bx, by, holeR * 1.25, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();

    // Absolute black core
    ctx.beginPath();
    ctx.arc(bx, by, holeR * 0.98, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
  }

  _drawPolarJets(bx, by, holeR) {
    const { _ctx: ctx, _H: H } = this;

    for (const dir of [-1, 1]) {
      const g = ctx.createLinearGradient(bx, by, bx, by + dir * H * 0.55);
      g.addColorStop(0,   'rgba(120,80,255,0.12)');
      g.addColorStop(0.3, 'rgba(80,40,200,0.05)');
      g.addColorStop(1,   'rgba(0,0,0,0)');

      const jw = holeR * 0.35;
      const jh = H     * 0.55;

      ctx.save();
      ctx.translate(bx, by);
      ctx.beginPath();
      ctx.moveTo(0,            0);
      ctx.lineTo(-jw * 0.1,    dir * jh * 0.1);
      ctx.lineTo(-jw,          dir * jh);
      ctx.lineTo( jw,          dir * jh);
      ctx.lineTo( jw * 0.1,    dir * jh * 0.1);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
    }
  }

  _drawVignette(cx, cy) {
    const { _ctx: ctx, _W: W, _H: H } = this;
    const g = ctx.createRadialGradient(cx, cy, Math.min(W, H) * 0.3, cx, cy, Math.min(W, H) * 0.85);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,0.92)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
}