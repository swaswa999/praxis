type Point = [number, number, number];
type Edge = { a: Point; b: Point; rim?: boolean };

/** A geometric assembly schematic: rings, ribs, a shaft and a mounting plane. */
function componentEdges(part: number): Edge[] {
  const edges: Edge[] = [];
  const segments = 40;
  const circle = (radius: number, y: number) => {
    const points: Point[] = Array.from({ length: segments }, (_, i) => {
      const angle = (i / segments) * Math.PI * 2;
      return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
    });
    points.forEach((p, i) =>
      edges.push({ a: p, b: points[(i + 1) % segments], rim: true }),
    );
    return points;
  };
  const cylinder = (radius: number, top: number, bottom: number, ribs = 20) => {
    circle(radius, top);
    circle(radius, bottom);
    for (let i = 0; i < ribs; i++) {
      const angle = (i / ribs) * Math.PI * 2;
      const x = Math.cos(angle) * radius,
        z = Math.sin(angle) * radius;
      edges.push({ a: [x, top, z], b: [x, bottom, z] });
    }
  };
  const spokes = (inner: number, outer: number, y: number, count = 12) => {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      edges.push({
        a: [Math.cos(a) * inner, y, Math.sin(a) * inner],
        b: [Math.cos(a) * outer, y, Math.sin(a) * outer],
      });
    }
  };
  if (part === 0) {
    cylinder(104, -15, 21, 24);
    cylinder(33, -27, 21, 12);
    circle(95, -15);
    circle(87, 21);
    spokes(33, 104, -15, 12);
    spokes(33, 87, 21, 12);
  } else if (part === 1) {
    cylinder(72, -44, 44, 24);
    circle(72, 0);
    cylinder(16, -89, 85, 12);
    circle(61, -44);
    circle(61, 44);
    spokes(16, 72, -44, 12);
    spokes(16, 72, 44, 12);
  } else if (part === 2) {
    cylinder(100, -38, 38, 24);
    cylinder(80, -38, 38, 24);
    circle(100, 0);
    spokes(80, 100, -38, 24);
    spokes(80, 100, 38, 24);
  } else {
    cylinder(107, -29, 32, 28);
    cylinder(56, -29, 32, 16);
    circle(93, -29);
    spokes(56, 107, -29, 14);
    const corners: Point[] = [
      [-122, 42, -104],
      [122, 42, -104],
      [122, 42, 104],
      [-122, 42, 104],
    ];
    corners.forEach((p, i) => {
      const next = corners[(i + 1) % 4];
      edges.push({ a: p, b: next, rim: true });
      edges.push({ a: [p[0], 50, p[2]], b: [next[0], 50, next[2]], rim: true });
      edges.push({ a: p, b: [p[0], 50, p[2]] });
    });
  }
  return edges;
}

const shapes = [0, 1, 2, 3].map(componentEdges);
const centers = [82, 222, 374, 517];
const project = ([x, y, z]: Point, center: number) => [
  300 + x * 0.96 + z * 0.18,
  center + y * 0.86 - z * 0.42,
];

export function AssemblyWireframe({ part }: { part: number }) {
  return (
    <svg
      className="assembly-wireframe"
      viewBox="0 0 600 620"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {shapes[part].map(({ a, b, rim }, index) => {
        const p = project(a, centers[part]),
          q = project(b, centers[part]);
        const front = (a[2] + b[2]) / 2 < 0;
        return (
          <path
            key={index}
            d={`M${p[0]} ${p[1]}L${q[0]} ${q[1]}`}
            fill="none"
            stroke="white"
            strokeWidth={rim ? 1 : 0.75}
            strokeOpacity={front ? (rim ? 0.88 : 0.58) : rim ? 0.34 : 0.19}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}
