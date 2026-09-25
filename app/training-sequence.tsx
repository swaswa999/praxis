'use client';

/* oxlint-disable jsx-a11y/prefer-tag-over-role -- The interactive line drawing is an inline SVG with a title; an img cannot host its geometry. */

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    id: 'video',
    title: 'Video',
    dataType: 'Egocentric Data',
    description:
      'First-person video captures the part, the tool, and each step of a repair from the mechanic’s perspective.',
    imageDescription:
      'An illustration of a gloved mechanic turning a torque wrench on a wheel-hub fastener. Scrolling turns the wrench until the handle clicks.',
  },
  {
    id: 'touch',
    title: 'Touch',
    dataType: 'Tactile data',
    description:
      'Glove sensors capture pressure and contact as a mechanic grips tools and works on parts.',
    imageDescription:
      'Contact patches follow the mechanic’s fingers as they turn the torque wrench. These are illustrative contact locations, not measured sensor readings.',
  },
  {
    id: 'practice',
    title: 'Practice',
    dataType: 'AI · VLA',
    description:
      'Train the model to turn visual context and job instructions into robot movements, then test each task in the bay.',
    imageDescription:
      'An illustration of a robotic gripper repeating the torque-wrench movement on the same wheel-hub fastener. Scrolling turns the wrench until the handle clicks.',
  },
] as const;

function MechanicGlove() {
  return (
    <g className="training-glove" strokeLinejoin="round" strokeLinecap="round">
      <path d="M137 311L174 251C177 237 184 226 199 216L200 176C200 164 206 158 214 158C221 158 227 163 229 170L229 158C229 147 235 141 243 142C251 142 258 149 260 158C261 148 268 144 277 147C286 150 290 160 292 171C296 164 303 164 309 169C317 176 319 191 318 203L315 224C312 249 298 268 276 282L252 322Z" />
      <path
        className="training-glove-seam"
        d="M229 171L232 193C234 204 226 212 218 207M260 159L267 187C271 203 263 211 255 205M292 172L298 190C302 205 295 213 285 204"
      />
      <path
        className="training-glove-seam"
        d="M212 262C232 267 250 262 266 248M164 294L234 315M280 227L294 222"
      />
      <path className="training-cuff" d="M133 306L255 320L244 354L118 338Z" />
      <path
        className="training-glove-seam"
        d="M139 318L240 330M151 320L147 339M166 322L162 341M181 324L177 343M196 326L192 345M211 328L207 347M226 330L222 348"
      />
    </g>
  );
}

function RobotGrip() {
  return (
    <g className="training-robot" strokeLinejoin="round" strokeLinecap="round">
      <path d="M118 318L174 217L207 236L153 337Z" />
      <path className="training-glove-seam" d="M139 305L180 234" />
      <circle cx="190" cy="225" r="22" />
      <circle cx="190" cy="225" r="11" />
      <path d="M184 204L196 181L216 189L208 216Z" />
      <path className="training-robot-coupler" d="M196 165H211V217H196Z" />
      <path d="M211 159H235L257 166V172H244L231 170H211ZM211 211H235L257 204V198H244L231 200H211Z" />
      <path d="M245 172H256M245 198H256" className="training-robot-pad" />
      <path d="M111 318L154 342L146 357L103 333Z" />
    </g>
  );
}

function TrainingDrawing({
  selected,
  labelId,
}: {
  selected: number;
  labelId: string;
}) {
  return (
    <svg
      viewBox="55 62 515 366"
      role="img"
      aria-labelledby={labelId}
      className="training-drawing"
      data-mode={steps[selected].id}
    >
      <title id={labelId}>{steps[selected].imageDescription}</title>
      {/* The hub and fastener remain fixed while the source of the movement changes. */}
      <g className="training-hub">
        <circle cx="428" cy="185" r="101" />
        <circle cx="428" cy="185" r="88" />
        <circle cx="428" cy="185" r="68" />
        <circle cx="428" cy="185" r="32" />
        {[0, 72, 144, 216, 288].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 428 185)`}>
            <circle cx="428" cy="134" r="8" className="training-lug" />
            <path d="M424 130H432V138H424Z" className="training-hub-detail" />
            <path
              d="M419 94L416 101M432 94L434 101"
              className="training-hub-detail"
            />
          </g>
        ))}
        <path
          d="M502 128L520 132L526 150V208L514 230L498 229Z"
          className="training-caliper"
        />
        <path
          d="M507 145H515V210H507M513 155H521M513 198H521"
          className="training-hub-detail"
        />
      </g>
      <g className="training-work-motion">
        <g className="training-torque-handle">
          <g className="training-ratchet" strokeLinejoin="round">
            <path d="M154 177H367L405 173V197L367 193H154Q144 193 144 185T154 177Z" />
            <path
              className="training-wrench-grip"
              d="M148 172H297Q305 172 305 180V190Q305 198 297 198H148Q139 198 139 189V181Q139 172 148 172Z"
            />
            <path
              d="M153 177V193M162 177V193M171 177V193M180 177V193M189 177V193M288 177V193M296 177V193"
              className="training-tool-detail"
            />
            <path
              className="training-adjustment-collar"
              d="M310 174H320V196H310Z"
            />
            <path
              d="M337 180H381M345 180V187M353 180V184M361 180V187M369 180V184M377 180V187"
              className="training-tool-detail"
            />
          </g>
          {selected === 2 ? <RobotGrip /> : <MechanicGlove />}
          {selected === 1 ? (
            <g className="training-pressure" strokeLinejoin="round">
              <path d="M206 177Q214 172 222 179L226 192Q219 198 211 192Z" />
              <path d="M238 168Q246 164 253 174L258 187Q250 193 242 186Z" />
              <path d="M268 174Q276 169 283 180L287 191Q279 198 272 191Z" />
            </g>
          ) : null}
        </g>
        <g className="training-ratchet" strokeLinejoin="round">
          <circle cx="428" cy="185" r="27" />
          <path
            d="M420 169H436L444 185L436 201H420L412 185Z"
            className="training-socket"
          />
          <circle cx="428" cy="185" r="8" />
          <path d="M417 161H430" className="training-tool-detail" />
        </g>
        <g className="training-click" aria-hidden="true">
          <path d="M384 138L393 153M405 131V150M425 140L417 154M378 209L390 201M403 220V234" />
        </g>
        <circle
          className="training-spec-ring"
          cx="428"
          cy="185"
          r="32"
          aria-hidden="true"
        />
      </g>
    </svg>
  );
}

export function TrainingSequence({ id = 'mayter-training' }: { id?: string }) {
  const [selected, setSelected] = useState(0);
  const visual = useRef<HTMLElement>(null);
  const visualId = `${id}-visual`;

  useEffect(() => {
    const element = visual.current;
    if (!element) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let center = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const update = () => {
      frame = 0;
      const progress = reducedMotion.matches
        ? 1
        : clamp(
            (window.scrollY + window.innerHeight * 0.88 - center) /
              (window.innerHeight * 0.42),
          );
      const turn = clamp((progress - 0.12) / 0.58);
      const easedTurn = turn * turn * (3 - 2 * turn);
      const click = clamp((progress - 0.7) / 0.035);
      const snap = 1 - (1 - click) ** 3;
      const release = clamp((progress - 0.735) / 0.16);
      const reveal = clamp((progress - 0.705) / 0.05);
      // The socket stops turning before the handle breaks; scrolling back retraces both.
      element.style.setProperty('--torque-angle', `${-14 + 14 * easedTurn}deg`);
      element.style.setProperty('--torque-break', `${6 * snap}deg`);
      element.style.setProperty('--click-opacity', `${snap * (1 - release)}`);
      element.style.setProperty('--click-scale', `${1 + 0.4 * release}`);
      element.style.setProperty('--spec-opacity', `${reveal}`);
      element.style.setProperty('--spec-scale', `${0.86 + 0.14 * reveal}`);
      element.style.setProperty('--spec-offset', `${8 * (1 - reveal)}px`);
    };
    const onScroll = () => {
      if (!reducedMotion.matches && !frame)
        frame = window.requestAnimationFrame(update);
    };
    const measure = () => {
      const bounds = element.getBoundingClientRect();
      center = window.scrollY + bounds.top + bounds.height / 2;
      if (frame) window.cancelAnimationFrame(frame);
      update();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    reducedMotion.addEventListener('change', update);
    measure();
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  return (
    <div className="training-sequence">
      <div className="training-overview">
        <h2 id="technology-heading">
          Learning from
          <br />
          mechanics.
        </h2>
        <p className="training-intro">
          We’re developing a vision-language-action (VLA) model for automotive
          repair. Training pairs paid recordings of mechanics’ work with tactile
          feedback.
        </p>
        <figure className="training-visual" id={visualId} ref={visual}>
          <TrainingDrawing
            selected={selected}
            labelId={`${id}-drawing-title`}
          />
          <div className="training-spec-status" aria-hidden="true">
            <span className="training-click-word">CLICK</span>
          </div>
        </figure>
      </div>
      <fieldset className="training-choices">
        <legend>Explore how the robot learns.</legend>
        {steps.map((step, index) => (
          <label
            className="training-choice"
            data-selected={selected === index}
            key={step.id}
          >
            <input
              type="radio"
              name={`${id}-training`}
              value={step.id}
              checked={selected === index}
              onChange={() => setSelected(index)}
              aria-controls={visualId}
              aria-describedby={`${id}-${step.id}-description`}
              aria-label={step.title}
            />
            <span className="training-choice-copy">
              <span className="training-choice-heading">
                <span className="training-choice-title">{step.title}</span>
                <span className="training-choice-type">{step.dataType}</span>
              </span>
              <span
                className="training-choice-description"
                id={`${id}-${step.id}-description`}
              >
                {step.description}
              </span>
            </span>
            <span className="training-choice-indicator" aria-hidden="true" />
          </label>
        ))}
      </fieldset>
    </div>
  );
}
