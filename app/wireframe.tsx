'use client';

import { useEffect, useRef } from 'react';

type Point = [number, number, number];
type Mesh = { points: Point[]; edges: [number, number][] };
export type WireShape =
  | 'equipment'
  | 'observation'
  | 'reference'
  | 'sphere'
  | 'orbit'
  | 'lattice';

function makeMesh(shape: WireShape): Mesh {
  const points: Point[] = [];
  const edges: [number, number][] = [];
  if (shape === 'equipment') {
    const addBox = (width: number, height: number, depth: number) => {
      const start = points.length;
      const corners: Point[] = [
        [-width, -height, -depth],
        [width, -height, -depth],
        [width, height, -depth],
        [-width, height, -depth],
        [-width, -height, depth],
        [width, -height, depth],
        [width, height, depth],
        [-width, height, depth],
      ];
      points.push(...corners);
      for (const [a, b] of [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ])
        edges.push([start + a, start + b]);
    };
    addBox(0.9, 0.56, 0.5);
    addBox(0.62, 0.34, 0.68);
    for (let i = -2; i <= 2; i++) {
      const x = i * 0.27;
      points.push([x, -0.72, 0.06], [x, 0.72, 0.06]);
      edges.push([points.length - 2, points.length - 1]);
    }
  } else if (shape === 'observation') {
    const addRing = (radius: number, y: number, count = 32) => {
      const start = points.length;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        points.push([Math.cos(a) * radius, y, Math.sin(a) * radius]);
        edges.push([start + i, start + ((i + 1) % count)]);
      }
    };
    addRing(0.92, 0.25);
    addRing(0.68, 0.25);
    addRing(0.42, 0.25);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      points.push(
        [Math.cos(a) * 0.42, 0.25, Math.sin(a) * 0.42],
        [Math.cos(a) * 1.02, 0.25, Math.sin(a) * 1.02],
      );
      edges.push([points.length - 2, points.length - 1]);
    }
    points.push([0, -0.82, 0], [0, 0.82, 0]);
    edges.push([points.length - 2, points.length - 1]);
  } else if (shape === 'reference') {
    const w = 0.8,
      h = 1.03,
      d = 0.08;
    const sheet: Point[] = [
      [-w, -h, -d],
      [w, -h, -d],
      [w, h, -d],
      [-w, h, -d],
      [-w, -h, d],
      [w, -h, d],
      [w, h, d],
      [-w, h, d],
    ];
    const start = points.length;
    points.push(...sheet);
    for (const [a, b] of [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ])
      edges.push([start + a, start + b]);
    for (let row = -2; row <= 2; row++) {
      const y = row * 0.3;
      points.push([-0.54, y, -0.095], [0.5, y, -0.095]);
      edges.push([points.length - 2, points.length - 1]);
    }
    points.push([-0.54, -0.68, -0.1], [0.05, -0.68, -0.1]);
    edges.push([points.length - 2, points.length - 1]);
  } else if (shape === 'lattice') {
    const size = 4;
    for (let z = 0; z <= size; z++) {
      for (let y = 0; y <= size; y++) {
        for (let x = 0; x <= size; x++) {
          points.push([
            (x / size - 0.5) * 1.7,
            (y / size - 0.5) * 1.7,
            (z / size - 0.5) * 1.7,
          ]);
          const i = z * 25 + y * 5 + x;
          if (x) edges.push([i - 1, i]);
          if (y) edges.push([i - 5, i]);
          if (z) edges.push([i - 25, i]);
        }
      }
    }
  } else if (shape === 'orbit') {
    const rings = 36,
      sides = 12;
    for (let u = 0; u < rings; u++) {
      for (let v = 0; v < sides; v++) {
        const a = (u / rings) * Math.PI * 2;
        const b = (v / sides) * Math.PI * 2;
        const radius = 0.88 + 0.38 * Math.cos(b);
        points.push([
          radius * Math.cos(a),
          0.38 * Math.sin(b),
          radius * Math.sin(a),
        ]);
        const i = u * sides + v;
        const next = ((u + 1) % rings) * sides;
        edges.push(
          [i, u * sides + ((v + 1) % sides)],
          [i, next + v],
          [i, next + ((v + 1) % sides)],
        );
      }
    }
  } else {
    const phi = (1 + Math.sqrt(5)) / 2;
    const base: Point[] = [
      [-1, phi, 0],
      [1, phi, 0],
      [-1, -phi, 0],
      [1, -phi, 0],
      [0, -1, phi],
      [0, 1, phi],
      [0, -1, -phi],
      [0, 1, -phi],
      [phi, 0, -1],
      [phi, 0, 1],
      [-phi, 0, -1],
      [-phi, 0, 1],
    ];
    const normalize = (p: Point): Point => {
      const l = Math.hypot(...p);
      return p.map((n) => (n / l) * 1.18) as Point;
    };
    points.push(...base.map(normalize));
    let faces = [
      [0, 11, 5],
      [0, 5, 1],
      [0, 1, 7],
      [0, 7, 10],
      [0, 10, 11],
      [1, 5, 9],
      [5, 11, 4],
      [11, 10, 2],
      [10, 7, 6],
      [7, 1, 8],
      [3, 9, 4],
      [3, 4, 2],
      [3, 2, 6],
      [3, 6, 8],
      [3, 8, 9],
      [4, 9, 5],
      [2, 4, 11],
      [6, 2, 10],
      [8, 6, 7],
      [9, 8, 1],
    ];
    const middle = new Map<string, number>();
    const midpoint = (a: number, b: number) => {
      const key = [a, b].sort((x, y) => x - y).join(':');
      const cached = middle.get(key);
      if (cached !== undefined) return cached;
      const index = points.length;
      points.push(
        normalize(points[a].map((n, i) => (n + points[b][i]) / 2) as Point),
      );
      middle.set(key, index);
      return index;
    };
    for (let pass = 0; pass < 2; pass++) {
      faces = faces.flatMap(([a, b, c]) => {
        const ab = midpoint(a, b),
          bc = midpoint(b, c),
          ca = midpoint(c, a);
        return [
          [a, ab, ca],
          [b, bc, ab],
          [c, ca, bc],
          [ab, bc, ca],
        ];
      });
    }
    const seen = new Set<string>();
    for (const [a, b, c] of faces)
      for (const [i, j] of [
        [a, b],
        [b, c],
        [c, a],
      ]) {
        const key = [i, j].sort((x, y) => x - y).join(':');
        if (!seen.has(key)) {
          edges.push([i, j]);
          seen.add(key);
        }
      }
  }
  return { points, edges };
}

/** Mathematical geometry rendered locally; no image assets or 3D dependency. */
export function Wireframe({
  shape = 'sphere',
  compact = false,
}: {
  shape?: WireShape;
  compact?: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    const mesh = makeMesh(shape);
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false,
      frame = 0,
      last = 0,
      drag: number | null = null;
    let previousX = 0,
      previousY = 0,
      width = 0,
      height = 0;
    let rotation = shape === 'orbit' ? 0.45 : 0.25;
    let tilt = shape === 'orbit' ? 0.68 : -0.24;
    let driftX = 0,
      driftY = 0,
      targetX = 0,
      targetY = 0;
    const render = (time: number) => {
      frame = 0;
      if (!visible || document.hidden) {
        last = 0;
        return;
      }
      const delta = last ? Math.min(time - last, 50) : 0;
      last = time;
      if (!motion.matches && drag === null)
        rotation += delta * (compact ? 0.000055 : 0.000085);
      driftX += (targetX - driftX) * 0.075;
      driftY += (targetY - driftY) * 0.075;
      const ry = rotation + driftX,
        rx = tilt + driftY;
      const cy = Math.cos(ry),
        sy = Math.sin(ry),
        cx = Math.cos(rx),
        sx = Math.sin(rx);
      const scale = Math.min(width, height) * (compact ? 0.29 : 0.335);
      const projected = mesh.points.map(([x, y, z]) => {
        const xx = x * cy + z * sy,
          zz = z * cy - x * sy;
        const yy = y * cx - zz * sx,
          depth = y * sx + zz * cx;
        const perspective = 4.5 / (4.5 - depth);
        return {
          x: width / 2 + xx * scale * perspective,
          y: height / 2 + yy * scale * perspective,
          z: depth,
        };
      });
      ctx.clearRect(0, 0, width, height);
      const scanY = Math.sin(time * 0.0004) * 0.9;
      for (const [a, b] of mesh.edges) {
        const p = projected[a],
          q = projected[b],
          depth = (p.z + q.z) / 2;
        const alpha = 0.1 + ((depth + 1.5) / 3) * (compact ? 0.34 : 0.62);
        const highlight =
          !motion.matches &&
          Math.abs((mesh.points[a][1] + mesh.points[b][1]) / 2 - scanY) < 0.06;
        ctx.strokeStyle = `rgba(255,255,255,${Math.min(0.95, alpha + (highlight ? 0.23 : 0))})`;
        ctx.lineWidth = highlight ? 1.15 : 0.72;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
      for (let i = 0; i < projected.length; i += shape === 'lattice' ? 1 : 7) {
        const p = projected[i];
        if (p.z < 0.15) continue;
        ctx.fillStyle = `rgba(255,255,255,${compact ? 0.42 : 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, compact ? 1.1 : 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!motion.matches || drag !== null)
        frame = requestAnimationFrame(render);
    };
    const schedule = () => {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(render);
    };
    const resize = () => {
      const box = el.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      el.width = Math.round(width * ratio);
      el.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      schedule();
    };
    const down = (event: PointerEvent) => {
      if (compact || event.button !== 0) return;
      drag = event.pointerId;
      previousX = event.clientX;
      previousY = event.clientY;
      el.setPointerCapture(event.pointerId);
      el.dataset.dragging = 'true';
      schedule();
    };
    const move = (event: PointerEvent) => {
      if (compact) return;
      if (drag === event.pointerId) {
        rotation += (event.clientX - previousX) * 0.007;
        tilt = Math.max(
          -1.25,
          Math.min(1.25, tilt + (event.clientY - previousY) * 0.006),
        );
        previousX = event.clientX;
        previousY = event.clientY;
      } else if (event.pointerType === 'mouse' && !motion.matches) {
        const box = el.getBoundingClientRect();
        targetX = ((event.clientX - box.left) / width - 0.5) * 0.26;
        targetY = ((event.clientY - box.top) / height - 0.5) * 0.18;
      }
      schedule();
    };
    const up = () => {
      drag = null;
      el.dataset.dragging = 'false';
    };
    const leave = () => {
      targetX = 0;
      targetY = 0;
    };
    const pause = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
      } else schedule();
    };
    const preference = () => {
      targetX = 0;
      targetY = 0;
      schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
      }
    });
    const sizeObserver = new ResizeObserver(resize);
    resize();
    observer.observe(el);
    sizeObserver.observe(el);
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('lostpointercapture', up);
    el.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', pause);
    motion.addEventListener('change', preference);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('lostpointercapture', up);
      el.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', pause);
      motion.removeEventListener('change', preference);
    };
  }, [shape, compact]);
  return (
    <canvas
      ref={canvas}
      className={`wireframe-canvas${compact ? ' wireframe-compact' : ''}`}
      role="img"
      aria-label={
        compact
          ? `${shape} context wireframe`
          : `Rotating geometric ${shape} wireframe. Drag to change the view, or use the shape buttons below.`
      }
    />
  );
}
