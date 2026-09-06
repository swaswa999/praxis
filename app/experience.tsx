'use client';

import { RefrigeratorDiagram } from './refrigerator-diagram';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const points = [
  {
    label: 'Identify',
    title: '“Which refrigerator is this?”',
    copy: 'Praxis reads the nameplate, pulls that model’s service manual, and asks you to confirm the unit before it quotes a single spec.',
    x: 14,
    y: 29,
  },
  {
    label: 'Understand',
    title: '“It runs, but won’t stay cold.”',
    copy: 'Praxis takes what you’re seeing, checks it against this model’s cooling system, and tells you what fits — and what you still need to rule out.',
    x: 83,
    y: 49,
  },
  {
    label: 'Act',
    title: '“What should I check next?”',
    copy: 'Praxis names the next check, tells you why it matters, and stays with you until the unit holds temperature.',
    x: 81,
    y: 83,
  },
];

export function EquipmentDemo() {
  const [selected, setSelected] = useState(0);
  const point = points[selected];
  return (
    <div className="approach-story reveal">
      <div className="approach-scene silver-frame">
        <div className="approach-scene-label">
          REFRIGERATOR / CONCEPT EXAMPLE
        </div>
        <div className="appliance-map">
          <RefrigeratorDiagram selected={selected} />
          <div role="group" aria-label="Explore the refrigerator">
            {points.map((item, index) => (
              <Button
                key={item.label}
                variant="ghost"
                className="appliance-point"
                aria-pressed={selected === index}
                aria-controls="appliance-context"
                onClick={() => setSelected(index)}
                style={{ left: item.x + '%', top: item.y + '%' }}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        <p className="appliance-hint">Tap a point</p>
      </div>
      <div className="approach-narrative">
        <p className="approach-summary">
          Read the nameplate, ask your question, get the right page of the
          service manual. We’re building it with working technicians on real
          equipment, so the answers hold up in the field.
        </p>
        <div
          id="appliance-context"
          aria-live="polite"
          aria-atomic="true"
          className="appliance-context"
        >
          <div key={selected} className="appliance-context-copy">
            <p className="appliance-kicker">
              0{selected + 1} / {point.label}
            </p>
            <h3>{point.title}</h3>
            <p>{point.copy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
