'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const parts = [
  {
    name: 'End cap',
    detail:
      'Ask which part you’re holding. Praxis pulls the assembly drawing that matches.',
    top: 0,
    bottom: 79.6,
    y: '12%',
    travel: 70,
  },
  {
    name: 'Rotor',
    detail:
      'Describe the noise. Praxis checks it against this motor’s service history and wear patterns.',
    top: 20.4,
    bottom: 51.2,
    y: '35%',
    travel: 22,
  },
  {
    name: 'Stator',
    detail:
      'Read out your meter. Praxis tells you whether it’s inside the manufacturer’s spec.',
    top: 48.8,
    bottom: 28.8,
    y: '60%',
    travel: -28,
  },
  {
    name: 'Housing',
    detail:
      'Say what you’ve already checked. Praxis picks up from there and names the next step.',
    top: 71.2,
    bottom: 0,
    y: '84%',
    travel: -72,
  },
];

export function MechanicalHero() {
  const scene = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = element.getBoundingClientRect().top;
      const progress = motion.matches
        ? 0
        : Math.max(0, Math.min(1, (120 - top) / 600));
      element.style.setProperty('--assembly-progress', String(progress));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    motion.addEventListener('change', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
    };
  }, []);
  return (
    <div
      className="mechanical-hero"
      ref={scene}
      onPointerMove={(event) => {
        if (
          event.pointerType !== 'mouse' ||
          matchMedia('(prefers-reduced-motion: reduce)').matches
        )
          return;
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          '--assembly-x',
          `${((event.clientX - box.left) / box.width - 0.5) * 9}deg`,
        );
        event.currentTarget.style.setProperty(
          '--assembly-y',
          `${((event.clientY - box.top) / box.height - 0.5) * -7}deg`,
        );
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty('--assembly-x', '0deg');
        event.currentTarget.style.setProperty('--assembly-y', '0deg');
      }}
    >
      <div className="assembly-viewport" data-inspecting={selected !== null}>
        <div className="assembly-cross cross-a" aria-hidden="true">
          +
        </div>
        <div className="assembly-cross cross-b" aria-hidden="true">
          +
        </div>
        <div className="assembly-axis" aria-hidden="true" />
        <div
          className="assembly-stack"
          role="img"
          aria-label="Exploded motor assembly showing four floating components"
        >
          {parts.map((part, index) => (
            <div
              key={part.name}
              className="assembly-piece"
              data-selected={selected === index}
              data-muted={selected !== null && selected !== index}
              style={
                {
                  '--piece-travel': `${part.travel}px`,
                  '--piece-shift': selected === index ? '-22px' : '0px',
                } as CSSProperties
              }
            >
              <img
                src="/exploded-motor.png"
                alt=""
                width={1023}
                height={1537}
                fetchPriority={index === 0 ? 'high' : undefined}
                style={{ clipPath: `inset(${part.top}% 0 ${part.bottom}% 0)` }}
                draggable={false}
              />
            </div>
          ))}
        </div>
        <div
          className="assembly-points"
          role="group"
          aria-label="Inspect a motor component"
        >
          {parts.map((part, index) => (
            <Button
              key={part.name}
              variant="ghost"
              className="assembly-point"
              aria-label={`Inspect ${part.name.toLowerCase()}`}
              aria-pressed={selected === index}
              aria-controls="assembly-caption"
              onClick={() => setSelected(selected === index ? null : index)}
              style={
                {
                  top: part.y,
                  '--point-travel': `${part.travel}px`,
                } as CSSProperties
              }
            >
              <span className="point-number">0{index + 1}</span>
              <span className="point-name">{part.name}</span>
              <ArrowUpRight size={13} />
            </Button>
          ))}
        </div>
      </div>
      <div
        className="assembly-caption"
        id="assembly-caption"
        aria-live="polite"
      >
        <div>
          <span className="assembly-caption-label">
            {selected === null
              ? 'TAP A PART'
              : `0${selected + 1} / ${parts[selected].name.toUpperCase()}`}
          </span>
          <p>
            {selected === null
              ? 'Every part has a spec, a torque value, and a way it fails.'
              : parts[selected].detail}
          </p>
        </div>
        <Button
          variant="ghost"
          className="assembly-reset"
          aria-label="Reset assembly view"
          onClick={() => setSelected(null)}
          disabled={selected === null}
        >
          <RotateCcw size={17} />
        </Button>
      </div>
    </div>
  );
}
