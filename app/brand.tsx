export function Brand() {
  return (
    <span className="mayter-wordmark">
      <span className="mayter-brand-name">Mayter</span>
      <svg
        width="202"
        height="46"
        viewBox="0 0 202 46"
        fill="none"
        aria-hidden="true"
      >
        {/* Rounded monoline shoulders meet at a small hitch pin. */}
        <g
          className="mayter-mark"
          stroke="currentColor"
          strokeWidth="5.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 33V8L20 24L35 8V33" />
          <circle
            cx="20"
            cy="24"
            r="1.65"
            className="mayter-logo-accent"
            stroke="none"
          />
        </g>
        <g
          stroke="currentColor"
          strokeWidth="5.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M69 12V33M69 22C69 15.4 64.8 11 58.5 11C52.2 11 48 15.4 48 22C48 28.6 52.2 33 58.5 33C64.8 33 69 28.6 69 22Z" />
          <path d="M80 12L90 32M100 12L90 38C88.7 41 86.4 42 82 42" />
          <path d="M114 4V26C114 30.8 116.2 33 120.5 33H124M108 12H123" />
          <path d="M132 22H152C152 15.1 148 11 142 11C135.5 11 131 15.4 131 22C131 28.6 135.5 33 142.2 33C146.2 33 149.1 31.7 151.2 29.2" />
        </g>
        {/* A fixed articulated arm takes the place of the final lowercase r. */}
        <g className="mayter-arm" stroke="currentColor" strokeLinejoin="round">
          <path
            d="M166 32V17L177 11H184"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="166" cy="17" r="4.7" fill="currentColor" stroke="none" />
          <circle cx="177" cy="11" r="4.7" fill="currentColor" stroke="none" />
          <circle
            cx="166"
            cy="17"
            r="1.65"
            className="mayter-logo-accent"
            stroke="none"
          />
          <circle
            cx="177"
            cy="11"
            r="1.65"
            className="mayter-logo-accent"
            stroke="none"
          />
          <path d="M183.5 6.5V15.5" strokeWidth="3.5" />
          <path d="M186 8H191L194 10M186 14H191L194 12" strokeWidth="2.3" />
          <path d="M161 34H171" strokeWidth="3" />
        </g>
      </svg>
    </span>
  );
}
