import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number; ox: number; oy: number; size: number;
}

const ORANGE = { r: 249, g: 115, b: 22 };
const PARTICLE_COUNT = 90;
const CONNECTION_DIST = 175;
const MOUSE_RADIUS = 140;
const MOUSE_STRENGTH = 0.12;

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

function initParticles(w: number, h: number): Particle[] {
  const particles: Particle[] = [];
  const cols = Math.ceil(Math.sqrt((PARTICLE_COUNT * w) / h));
  const rows = Math.ceil(PARTICLE_COUNT / cols);
  const cellW = w / cols;
  const cellH = h / rows;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = cellW * col + cellW * 0.2 + Math.random() * cellW * 0.6;
    const y = cellH * row + cellH * 0.2 + Math.random() * cellH * 0.6;
    const angle = Math.random() * Math.PI * 2;
    particles.push({ x, y, ox: x, oy: y, vx: Math.cos(angle) * 0.22, vy: Math.sin(angle) * 0.22, size: 1 + Math.random() * 1.5 });
  }
  return particles;
}

export function FractalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      particlesRef.current = initParticles(canvas.offsetWidth, canvas.offsetHeight);
    };

    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMove);

    let tick = 0;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      tick++;

      ctx.clearRect(0, 0, W, H);
      const pts = particlesRef.current;

      for (const p of pts) {
        p.vx += (p.ox - p.x) * 0.0009;
        p.vy += (p.oy - p.y) * 0.0009;
        const dx = p.x - mx; const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0.5) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= 0.94; p.vy *= 0.94;
        const angle = (tick * 0.006 + p.ox * 0.02 + p.oy * 0.02) % (Math.PI * 2);
        p.vx += Math.cos(angle) * 0.007;
        p.vy += Math.sin(angle) * 0.007;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 20) p.vx += 0.08;
        if (p.x > W - 20) p.vx -= 0.08;
        if (p.y < 20) p.vy += 0.08;
        if (p.y > H - 20) p.vy -= 0.08;
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x; const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > CONNECTION_DIST) continue;
          const alpha = (1 - d / CONNECTION_DIST) * 0.45;
          const midX = (pts[i].x + pts[j].x) / 2; const midY = (pts[i].y + pts[j].y) / 2;
          const md = Math.hypot(midX - mx, midY - my);
          const boost = md < MOUSE_RADIUS ? (1 - md / MOUSE_RADIUS) * 0.4 : 0;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = rgba(ORANGE.r, ORANGE.g, ORANGE.b, alpha + boost);
          ctx.lineWidth = 0.8; ctx.stroke();
          for (let k = j + 1; k < pts.length; k++) {
            const dik = Math.hypot(pts[i].x - pts[k].x, pts[i].y - pts[k].y);
            const djk = Math.hypot(pts[j].x - pts[k].x, pts[j].y - pts[k].y);
            if (dik < CONNECTION_DIST && djk < CONNECTION_DIST) {
              const triAlpha = (1 - (d + dik + djk) / (CONNECTION_DIST * 3)) * 0.04;
              ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
              ctx.lineTo(pts[k].x, pts[k].y); ctx.closePath();
              ctx.fillStyle = rgba(ORANGE.r, ORANGE.g, ORANGE.b, triAlpha + boost * 0.05); ctx.fill();
            }
          }
        }
      }

      for (const p of pts) {
        const dx = p.x - mx; const dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        const glow = d < MOUSE_RADIUS ? (1 - d / MOUSE_RADIUS) : 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size + glow * 2, 0, Math.PI * 2);
        ctx.fillStyle = rgba(ORANGE.r, ORANGE.g, ORANGE.b, 0.5 + glow * 0.5); ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.75 }} />;
}
