import { NextResponse } from "next/server";

const PALETTES = [
  ["#0a0e17", "#1f2937", "#c5a869"],
  ["#111827", "#374151", "#d4af37"],
  ["#141923", "#2b1d1d", "#e8a412"],
  ["#0d1b2a", "#1b263b", "#c5a869"],
  ["#1c1917", "#292524", "#d4af37"],
];

function hash(input: string) {
  let value = 0;
  for (let i = 0; i < input.length; i += 1) {
    value = (value * 31 + input.charCodeAt(i)) >>> 0;
  }
  return value;
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ seed: string }> },
) {
  const { seed } = await context.params;
  const n = hash(seed || "chambers");
  const [a, b, c] = PALETTES[n % PALETTES.length];
  const label = decodeURIComponent(seed || "Chambers").replace(/[-_]/g, " ").toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="65%" stop-color="${b}"/>
      <stop offset="100%" stop-color="${c}" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect x="70" y="70" width="1060" height="660" fill="none" stroke="${c}" stroke-width="2.5" opacity="0.5"/>
  <rect x="96" y="96" width="1008" height="608" fill="none" stroke="${c}" stroke-width="1" opacity="0.22"/>
  <circle cx="960" cy="210" r="85" fill="${c}" opacity="0.16"/>
  <text x="120" y="640" fill="${c}" font-family="Georgia, serif" font-size="22" letter-spacing="6" opacity="0.75">THE LAW EMPORIUM</text>
  <text x="120" y="680" fill="#ffffff" font-family="Arial, sans-serif" font-size="14" letter-spacing="4" opacity="0.45">${label.slice(0, 40)}</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
