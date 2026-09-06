'use client';

import { RefrigeratorDiagram } from './refrigerator-diagram';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const points = [
  {
    label: 'Identify',
    title: '“Which refrigerator is this?”',
    copy: 'Praxis matches the model on the nameplate to its service manual, then asks you to confirm the unit before using its diagrams or specifications.',
    x: 14,
    y: 29,
  },
  {
    label: 'Understand',
    title: '“It runs, but won’t stay cold.”',
    copy: 'Praxis connects your observations with this model’s cooling-system reference and any service history you share, explaining what may be relevant and what still needs checking.',
    x: 83,
    y: 49,
  },
  {
    label: 'Act',
    title: '“What should I check next?”',
    copy: 'Praxis explains the next relevant check from the service manual and why it matters, helping you work through the cooling issue and understand the reasoning as you go.',
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
        <div className="approach-scene-label">REFRIGERATOR / CONCEPT EXAMPLE</div>
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
        <p className="appliance-hint">Select a point to explore</p>
      </div>
      <div className="approach-narrative">
        <p className="approach-summary">
          Built for skilled trades and real work. We’re building an assistant
          to draw on thousands of hours of field experience, bringing equipment
          details and the right references together so you can understand the
          job and work through the next step.
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
