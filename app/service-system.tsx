'use client';

/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG needs an accessible image role while retaining its articulated geometry. */

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';

const stages = [
  {
    name: 'Rail',
    title: 'Move along the car.',
    description:
      'A rail carries the arm between working positions. The car stays in one service bay.',
  },
  {
    name: 'Arm',
    title: 'Reach the part.',
    description:
      'The arm positions each attachment at the vehicle. We’re developing it for oil changes and tire rotations first.',
  },
  {
    name: 'Tools',
    title: 'Change the tool. Keep the arm.',
    description:
      'Hot swappable attachments let one arm take on different jobs. Tools wait in a rack beside the rail.',
  },
];

function armAngles(base: number, x: number, y: number) {
  const dx = x - 172;
  const dy = y - base;
  const elbow = Math.acos(
    Math.max(
      -1,
      Math.min(
        1,
        (dx * dx + dy * dy - 142 * 142 - 130 * 130) / (2 * 142 * 130),
      ),
    ),
  );
  return {
    shoulder:
      ((Math.atan2(dy, dx) -
        Math.atan2(130 * Math.sin(elbow), 142 + 130 * Math.cos(elbow))) *
        180) /
      Math.PI,
    elbow: (elbow * 180) / Math.PI,
  };
}

const RAIL_START = 300;
const RAIL_END = 596;
const travelAngles = armAngles(RAIL_START, 308, RAIL_START - 32);

const swapPath = [
  [0, 308, 564],
  [0.14, 198, 618],
  [0.26, 198, 658],
  [0.32, 198, 658],
  [0.42, 198, 618],
  [0.56, 269, 618],
  [0.68, 269, 658],
  [0.74, 269, 658],
  [0.84, 269, 618],
  [1, 308, 564],
];

function swapPosition(progress: number) {
  const end = swapPath.findIndex((point) => point[0] >= progress);
  if (end <= 0) return { x: swapPath[0][1], y: swapPath[0][2] };
  const before = swapPath[end - 1];
  const after = swapPath[end];
  const linear = (progress - before[0]) / (after[0] - before[0]);
  const eased = linear * linear * (3 - 2 * linear);
  return {
    x: before[1] + (after[1] - before[1]) * eased,
    y: before[2] + (after[2] - before[2]) * eased,
  };
}

function ToolAttachment({ kind }: { kind: 'socket' | 'gripper' | 'pad' }) {
  return (
    <g
      className="bay-attachment"
      stroke="#5c6d50"
      strokeWidth="1.4"
      strokeLinejoin="round"
    >
      <rect
        x="0"
        y="-9"
        width="7"
        height="18"
        rx="1"
        fill="#d74b28"
        stroke="#ad472a"
      />
      <path d="M7-4H18V4H7Z" fill="#eef2e8" />
      {kind === 'socket' ? (
        <>
          <path d="M18-8H31V8H18Z" fill="#e7ecdf" />
          <path d="M25-8V8M31-4H27V4H31" fill="none" />
        </>
      ) : kind === 'gripper' ? (
        <>
          <path d="M15-8H22V8H15Z" fill="#e7ecdf" />
          <path
            d="M22-6L31-13H36V-7M22 6L31 13H36V7"
            fill="none"
            strokeWidth="3"
          />
        </>
      ) : (
        <path d="M17-3H24V3H17ZM24-14H30V14H24Z" fill="#e6e5d4" />
      )}
    </g>
  );
}

function BayDrawing({
  stage,
  carriageRef,
}: {
  stage: number;
  carriageRef: RefObject<SVGGElement | null>;
}) {
  const angles = travelAngles;
  return (
    <svg
      className="bay-drawing"
      viewBox="40 85 640 685"
      fill="none"
      role="img"
      aria-labelledby="bay-title bay-description"
    >
      <title id="bay-title">Mayter robotic service bay</title>
      <desc id="bay-description">
        An overhead concept drawing of a sedan beside a linear rail. One
        articulated robot arm moves along the rail and reaches the car with hot
        swappable tools from a nearby rack.
      </desc>
      <defs>
        <linearGradient
          id="car-body"
          x1="370"
          y1="350"
          x2="592"
          y2="350"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e8ebe2" />
          <stop offset="0.2" stopColor="#fdfefb" />
          <stop offset="0.8" stopColor="#f8faf4" />
          <stop offset="1" stopColor="#dfe4d8" />
        </linearGradient>
        <linearGradient
          id="car-glass"
          x1="410"
          y1="300"
          x2="560"
          y2="390"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#c8d0c3" />
          <stop offset="1" stopColor="#e8ede3" />
        </linearGradient>
      </defs>
      <g stroke="#d3d8ce" strokeWidth="1">
        <path d="M470 111V136M458 123H482M470 695V720M458 708H482" />
        <path d="M616 185H636M626 185V635M616 635H636" />
      </g>
      <g className={`bay-rail ${stage === 0 ? 'is-highlighted' : ''}`}>
        <rect
          x="154"
          y="180"
          width="36"
          height="466"
          rx="3"
          fill="#e7eae1"
          stroke="#87917e"
        />
        <path d="M163 190V636M181 190V636" stroke="#a4ae9a" strokeWidth="2" />
        <path
          d="M172 194V632"
          stroke="#b6beb0"
          strokeDasharray="2 7"
          strokeWidth="2"
        />
        <path d="M150 180H194M150 646H194" stroke="#535e4b" strokeWidth="5" />
        <path
          className="rail-active-line"
          d="M147 196V630"
          stroke="#d74b28"
          strokeWidth="2"
        />
        {[208, 316, 424, 532, 618].map((y) => (
          <g key={y} stroke="#8c9881">
            <path d={`M156 ${y}h4m24 0h4`} />
          </g>
        ))}
      </g>
      {/* Orthographic vehicle geometry keeps the car and mechanism in one coordinate system. */}
      <g className="bay-car">
        <ellipse
          cx="479"
          cy="417"
          rx="122"
          ry="247"
          fill="#d8dfce"
          opacity=".26"
        />
        <g fill="#495044" stroke="#363e31" strokeWidth="1.2">
          <rect x="360" y="245" width="17" height="77" rx="9" />
          <rect x="582" y="245" width="17" height="77" rx="9" />
          <rect x="360" y="538" width="17" height="77" rx="9" />
          <rect x="582" y="538" width="17" height="77" rx="9" />
        </g>
        <g stroke="#7f8878" strokeWidth="1">
          <path d="M364 254V312M369 254V312M590 254V312M595 254V312M364 547V605M369 547V605M590 547V605M595 547V605" />
        </g>
        <path
          d="M382 357L349 345Q340 341 343 327Q345 318 354 322L385 334M577 357L610 345Q619 341 616 327Q614 318 605 322L574 334"
          fill="#ecf0e5"
          stroke="#6c7862"
          strokeWidth="1.6"
        />
        <path
          d="M477 163C428 163 393 168 380 189C369 210 369 247 370 294L371 559C371 603 374 641 393 656C411 670 548 670 566 656C585 641 588 603 588 559L589 294C590 247 590 210 579 189C566 168 531 163 477 163Z"
          fill="url(#car-body)"
          stroke="#606b57"
          strokeWidth="1.8"
        />
        <path
          d="M387 226Q480 211 571 226L560 294Q480 275 398 294Z"
          fill="#f8faf5"
          stroke="#a8b29f"
        />
        <path
          d="M398 304Q478 280 560 304L548 365Q479 346 411 365Z"
          fill="url(#car-glass)"
          stroke="#65745a"
          strokeWidth="1.5"
        />
        <path
          d="M416 310L425 351M428 305L438 349"
          stroke="#f4f7ef"
          strokeWidth="3"
          opacity=".75"
        />
        <path
          d="M410 379Q480 361 548 379L550 506Q480 521 408 506Z"
          fill="#f7f9f2"
          stroke="#8e9b82"
          strokeWidth="1.4"
        />
        <path
          d="M418 391Q480 377 540 391V493Q480 505 416 493Z"
          stroke="#d1d9c7"
        />
        <path
          d="M408 520Q480 536 550 520L561 565Q481 586 397 565Z"
          fill="url(#car-glass)"
          stroke="#65745a"
          strokeWidth="1.5"
        />
        <path
          d="M383 322L400 380L398 502L383 552ZM576 322L558 380L560 502L576 552Z"
          fill="#dae2d1"
          stroke="#748467"
          strokeWidth="1.2"
        />
        <path
          d="M383 417H398M560 417H576M389 335L392 513M569 335L569 513"
          stroke="#89987b"
        />
        <path
          d="M386 576Q480 601 573 576L570 621Q480 640 389 621Z"
          fill="#f3f6ed"
          stroke="#afb9a5"
        />
        <path
          d="M383 207L389 185Q415 176 432 177L425 193ZM577 207L571 185Q545 176 528 177L535 193Z"
          fill="#dde5d5"
          stroke="#8b977f"
        />
        <path
          d="M437 177Q480 172 521 177M406 653Q480 660 553 653"
          stroke="#5d6854"
          strokeWidth="3"
        />
        <path
          d="M385 634L422 642M538 642L575 634"
          stroke="#bb6344"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M397 233L404 272M562 233L555 272M376 368V401M582 368V401M376 443V475M582 443V475"
          stroke="#bbc4b1"
          strokeWidth="2"
        />
      </g>
      <g className={`bay-tool-rack ${stage === 2 ? 'is-highlighted' : ''}`}>
        <path d="M94 704H301V730H94Z" fill="#edf0e8" stroke="#8d9a80" />
        <path d="M94 713H301" stroke="#b4bfa8" />
        {[128, 198, 269].map((x) => (
          <g key={x} transform={`translate(${x} 0)`}>
            <path
              d="M-24 664V698H24V664M-24 664H-12M12 664H24"
              fill="none"
              stroke="#92a084"
              strokeWidth="1.4"
            />
            <path d="M-27 698H27V704H-27Z" fill="#dfe6d5" stroke="#89997a" />
          </g>
        ))}
        <g transform="translate(128 658) rotate(90)">
          <ToolAttachment kind="pad" />
        </g>
        <g
          data-parked-tool="socket"
          style={{ opacity: 0 }}
          transform="translate(198 658) rotate(90)"
        >
          <ToolAttachment kind="socket" />
        </g>
        <g data-parked-tool="gripper" transform="translate(269 658) rotate(90)">
          <ToolAttachment kind="gripper" />
        </g>
      </g>
      <g
        className="bay-robot-translate"
        ref={carriageRef}
        style={{ transform: `translate(172px, ${RAIL_START}px)` }}
      >
        <rect
          x="-26"
          y="-33"
          width="52"
          height="66"
          rx="5"
          fill="#eaede5"
          stroke="#64725a"
          strokeWidth="1.6"
        />
        <path d="M-25-23H25M-25 23H25" stroke="#d74b28" strokeWidth="3" />
        <g fill="#9ca895" stroke="#64725a" strokeWidth="0.7">
          <circle cx="-18" cy="-28" r="1.7" />
          <circle cx="18" cy="-28" r="1.7" />
          <circle cx="-18" cy="28" r="1.7" />
          <circle cx="18" cy="28" r="1.7" />
        </g>
        <g
          className="bay-robot-rotate"
          data-joint="shoulder"
          style={{ transform: `rotate(${angles.shoulder}deg)` }}
        >
          <path
            d="M10-15H107L133-10V10L107 15H10Z"
            fill="#f4f6ee"
            stroke="#56634d"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M29-8H99L117-4V4L99 8H29Z"
            fill="#e1e7db"
            stroke="#a0ae94"
            strokeWidth="1"
          />
          <path d="M36-3H88M36 3H72" stroke="#b7c1ae" strokeWidth="1" />
          <path
            d="M24-16V-18H109Q120-18 125-12"
            stroke="#697860"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <g fill="#6d7c62">
            <circle cx="26" cy="11" r="1.3" />
            <circle cx="102" cy="11" r="1.3" />
          </g>
          <g transform="translate(142 0)">
            <g
              className="bay-robot-rotate"
              data-joint="elbow"
              style={{ transform: `rotate(${angles.elbow}deg)` }}
            >
              <path
                d="M8-11H89L111-8V8L89 11H8Z"
                fill="#f4f6ee"
                stroke="#56634d"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M25-5H83L96-2V3H25Z"
                fill="#e1e7db"
                stroke="#a0ae94"
                strokeWidth="1"
              />
              <path d="M29 8H83" stroke="#7b8a6f" strokeWidth="1.1" />
              <rect
                x="86"
                y="-16"
                width="20"
                height="12"
                rx="3"
                fill="#e5ebdf"
                stroke="#66775a"
                strokeWidth="1.2"
              />
              <circle cx="96" cy="-10" r="3.1" fill="#455440" />
              <circle cx="96" cy="-10" r="1.3" fill="#c8d5ba" />
              <path
                d="M121-5H130V5H121Z"
                fill="#d1dbc8"
                stroke="#607452"
                strokeWidth="1.2"
              />
              <rect
                x="109"
                y="-13"
                width="14"
                height="26"
                rx="2"
                fill="#d74b28"
              />
              <path d="M117-10V10" stroke="#f7d6c9" strokeWidth="1.2" />
              <g transform="translate(130 0)">
                <g
                  data-joint="wrist"
                  style={{
                    transform: `rotate(${90 - angles.shoulder - angles.elbow}deg)`,
                  }}
                >
                  <g data-held-tool="socket">
                    <ToolAttachment kind="socket" />
                  </g>
                  <g data-held-tool="gripper" style={{ opacity: 0 }}>
                    <ToolAttachment kind="gripper" />
                  </g>
                </g>
                <circle
                  r="5"
                  fill="#e0e7d8"
                  stroke="#5d6c51"
                  strokeWidth="1.5"
                />
              </g>
            </g>
            <circle r="19" fill="#e7ecdf" stroke="#56634d" strokeWidth="2" />
            <circle r="14" stroke="#adb99f" strokeWidth="1" />
            <circle r="8" fill="#d4decb" stroke="#6f815f" strokeWidth="1.2" />
            <path
              d="M-14-4A14 14 0 0 1-4-14"
              stroke="#d74b28"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M0-16V-13M13 0H16M0 13V16M-16 0H-13" stroke="#718363" />
            <circle r="2.5" fill="#607452" />
          </g>
        </g>
        <circle r="21" fill="#edf1e6" stroke="#56634d" strokeWidth="2" />
        <circle r="15" stroke="#a7b49a" strokeWidth="1.2" />
        <circle r="8" fill="#d4decb" stroke="#6f815f" strokeWidth="1.2" />
        <path
          d="M-15-4A15 15 0 0 1-4-15"
          stroke="#d74b28"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M0-18V-15M15 0H18M0 15V18M-18 0H-15" stroke="#718363" />
        <circle r="2.5" fill="#607452" />
      </g>
    </svg>
  );
}

export function ServiceSystem({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState(1);
  const root = useRef<HTMLDivElement>(null);
  const carriage = useRef<SVGGElement>(null);
  const activeStage = useRef(1);

  useEffect(() => {
    const element = root.current;
    const arm = carriage.current;
    const figure = element?.querySelector<HTMLElement>('.bay-figure');
    if (!element || !arm || !figure) return;
    const shoulder = figure.querySelector<SVGGElement>(
      '[data-joint="shoulder"]',
    );
    const elbow = figure.querySelector<SVGGElement>('[data-joint="elbow"]');
    const wrist = figure.querySelector<SVGGElement>('[data-joint="wrist"]');
    const heldSocket = figure.querySelector<SVGGElement>(
      '[data-held-tool="socket"]',
    );
    const heldGripper = figure.querySelector<SVGGElement>(
      '[data-held-tool="gripper"]',
    );
    const parkedSocket = figure.querySelector<SVGGElement>(
      '[data-parked-tool="socket"]',
    );
    const parkedGripper = figure.querySelector<SVGGElement>(
      '[data-parked-tool="gripper"]',
    );
    if (
      !shoulder ||
      !elbow ||
      !wrist ||
      !heldSocket ||
      !heldGripper ||
      !parkedSocket ||
      !parkedGripper
    )
      return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let start = 0;
    let toolStart = 1;
    let end = 2;
    let railChapterStart = 0;
    let armChapterStart = 1;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    const update = () => {
      frame = 0;
      const progress = reducedMotion.matches
        ? 0
        : clamp((window.scrollY - start) / Math.max(1, toolStart - start));
      const swap = reducedMotion.matches
        ? 0
        : clamp((window.scrollY - toolStart) / Math.max(1, end - toolStart));
      const nextStage =
        window.scrollY >= toolStart
          ? 2
          : window.scrollY >= armChapterStart
            ? 1
            : window.scrollY >= railChapterStart
              ? 0
              : 1;
      if (activeStage.current !== nextStage) {
        activeStage.current = nextStage;
        setStage(nextStage);
      }
      const base = RAIL_START + (RAIL_END - RAIL_START) * progress;
      const point = swap > 0 ? swapPosition(swap) : { x: 308, y: base - 32 };
      const angles = armAngles(base, point.x, point.y);
      // All motion and attachment ownership are derived from scroll, so reversing retraces the swap.
      arm.style.transform = `translate(172px, ${base}px)`;
      shoulder.style.transform = `rotate(${angles.shoulder}deg)`;
      elbow.style.transform = `rotate(${angles.elbow}deg)`;
      wrist.style.transform = `rotate(${90 - angles.shoulder - angles.elbow}deg)`;
      heldSocket.style.opacity = swap < 0.32 ? '1' : '0';
      parkedSocket.style.opacity = swap >= 0.32 ? '1' : '0';
      heldGripper.style.opacity = swap >= 0.74 ? '1' : '0';
      parkedGripper.style.opacity = swap < 0.74 ? '1' : '0';
    };
    const onScroll = () => {
      if (!reducedMotion.matches && !frame)
        frame = window.requestAnimationFrame(update);
    };
    const measure = () => {
      const scroll = window.scrollY;
      const chapterStart = (index: number) => {
        const chapter = element
          .querySelector(`[data-service-stage="${index}"]`)
          ?.getBoundingClientRect();
        return chapter
          ? scroll + chapter.top - window.innerHeight * 0.55
          : start;
      };
      railChapterStart = chapterStart(0);
      armChapterStart = chapterStart(1);
      if (window.innerWidth > 800) {
        const bounds = element.getBoundingClientRect();
        start = Math.max(0, scroll + bounds.top - 220);
        end = scroll + bounds.bottom - figure.offsetHeight - 108;
        const toolsChapter = element
          .querySelector('[data-service-stage="2"]')
          ?.getBoundingClientRect();
        const chapterStart = toolsChapter
          ? scroll + toolsChapter.top - window.innerHeight * 0.55
          : end - 360;
        toolStart = Math.max(start + 1, Math.min(chapterStart, end - 320));
      } else {
        const bounds = figure.getBoundingClientRect();
        start = scroll + bounds.top - window.innerHeight * 0.7;
        end = scroll + bounds.bottom - window.innerHeight * 0.3;
        toolStart = start + (end - start) * 0.55;
      }
      if (frame) window.cancelAnimationFrame(frame);
      update();
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(element);
    resizeObserver.observe(figure);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    reducedMotion.addEventListener('change', update);
    measure();
    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);
  return (
    <div className="service-experience" ref={root}>
      <div className="service-opening">{children}</div>
      <section
        className="service-chapters"
        id="approach"
        aria-labelledby="system-heading"
      >
        <h2 id="system-heading">
          One arm.
          <br />
          More than one job.
        </h2>
        {stages.map((item, index) => (
          <article
            className={`service-chapter ${stage === index ? 'is-active' : ''}`}
            key={item.name}
            data-service-stage={index}
          >
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </section>
      <figure className="bay-figure" data-stage={stage}>
        <BayDrawing stage={stage} carriageRef={carriage} />
      </figure>
    </div>
  );
}
