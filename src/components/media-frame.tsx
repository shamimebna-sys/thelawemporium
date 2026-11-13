const PALETTES = [
  ["#1a1a1a", "#3a3a3a", "#e8a412"],
  ["#111", "#4f4f4f", "#c9a227"],
  ["#222", "#6a1f1f", "#e2e2e2"],
  ["#0d1b2a", "#1b263b", "#e8a412"],
  ["#1c1917", "#44403c", "#d6d3d1"],
];

function hash(input: string) {
  let value = 0;
  for (let i = 0; i < input.length; i += 1) value = (value * 31 + input.charCodeAt(i)) >>> 0;
  return value;
}

export function MediaFrame({
  ratio,
  seed,
  play = false,
  label,
}: {
  ratio: "hero" | "banner" | "map" | "card" | "square" | "portrait";
  seed: string;
  play?: boolean;
  label?: string;
}) {
  const n = hash(seed);
  const [a, b, c] = PALETTES[n % PALETTES.length];
  const className = `frame frame-${ratio}`;

  return (
    <div className={className} aria-hidden={label ? undefined : true} role={label ? "img" : undefined} aria-label={label}>
      <svg viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" className="placeholder-art">
        <defs>
          <linearGradient id={`g-${n}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={a} />
            <stop offset="70%" stopColor={b} />
            <stop offset="100%" stopColor={c} />
          </linearGradient>
        </defs>
        <rect width="1200" height="675" fill={`url(#g-${n})`} />
        <rect x="80" y="80" width="1040" height="515" fill="none" stroke={c} strokeWidth="3" opacity="0.45" />
        <circle cx="900" cy="180" r="70" fill={c} opacity="0.25" />
      </svg>
      {play ? (
        <div className="play-badge">
          <span aria-hidden="true">▶</span>
        </div>
      ) : null}
    </div>
  );
}
