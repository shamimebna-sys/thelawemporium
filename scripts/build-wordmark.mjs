/** Build a single-line THE LAW EMPORIUM wordmark from the original geometric system. */

const r = (n) => Math.round(n * 100) / 100;

function translate(d, dx) {
  const tokens = d.match(/[MmLlHhVvCcSsQqTtAaZz]|-?\d*\.?\d+/g);
  let i = 0;
  let cmd = "";
  let rel = false;
  const out = [];
  const num = () => parseFloat(tokens[i++]);
  const isCmd = (t) => /^[MmLlHhVvCcSsQqTtAaZz]$/.test(t);

  const shiftX = (x) => r(x + dx);

  while (i < tokens.length) {
    const t = tokens[i];
    if (isCmd(t)) {
      cmd = t;
      rel = cmd === cmd.toLowerCase();
      out.push(cmd);
      i++;
      if (cmd.toUpperCase() === "Z") continue;
    }
    const C = cmd.toUpperCase();
    if (C === "H") {
      const x = num();
      out.push(rel ? r(x) : shiftX(x));
    } else if (C === "V") {
      out.push(r(num()));
    } else if (C === "M" || C === "L" || C === "T") {
      const x = num();
      const y = num();
      out.push(rel ? r(x) : shiftX(x), r(y));
    } else if (C === "C") {
      for (let k = 0; k < 3; k++) {
        const x = num();
        const y = num();
        out.push(rel ? r(x) : shiftX(x), r(y));
      }
    } else if (C === "S" || C === "Q") {
      for (let k = 0; k < 2; k++) {
        const x = num();
        const y = num();
        out.push(rel ? r(x) : shiftX(x), r(y));
      }
    } else {
      throw new Error("unhandled " + cmd);
    }
  }
  return out
    .join(" ")
    .replace(/ -/g, "-")
    .replace(/ ([MmLlHhVvCcSsQqTtAaZz])/g, "$1")
    .replace(/Z /g, "Z");
}

const L = {
  w: 21.9,
  d: "M8.2 0V29.3H21.9V37H0V0Z",
};

const A = {
  w: 30.3,
  d: "M23 37H30.3L15.3 0L0 37H7.5L10.5 30.3H20.1ZM18.2 24.2H12.4L15.3 16.9Z",
};

const W = {
  w: 44.9,
  d: "M14.3 18.9L7.5 0H0L13.5 37L23 14.6L33.3 37L44.9 0H37.3L31.7 18.9L22.5 0Z",
};

const M = {
  w: 44.9,
  d: "M14.3 18.1L7.5 37H0L13.5 0L23 22.4L33.3 0L44.9 37H37.3L31.7 18.1L22.5 37Z",
};

const T = {
  w: 23.6,
  d: "M0 0H23.6V7.7H15.9V37H7.7V7.7H0Z",
};

const H = {
  w: 24.6,
  d: "M0 0V37H8.2V22.35H16.4V37H24.6V0H16.4V14.65H8.2V0Z",
};

const E = {
  w: 21.9,
  d: "M0 0V37H21.9V29.3H8.2V22.35H19.5V14.65H8.2V7.7H21.9V0Z",
};

const P = {
  w: 23.1,
  d: [
    "M0 0H11.7C14 0 15.9.3 17.6 1C19.3 1.7 20.6 2.7 21.6 4.1C22.6 5.5 23.1 7.3 23.1 9.4",
    "C23.1 14.6 19.4 20.2 8.2 20.2V37H0V0Z",
    "M7.7 6.9H10.9C12.2 6.9 13.2 7.2 14 7.9C14.7 8.5 15.1 9.5 15.1 10.8",
    "C15.1 11.6 14.9 12.4 14.6 12.9C14.3 13.5 13.8 13.9 13.2 14.2C12.6 14.5 11.8 14.7 10.9 14.7H7.7V6.9Z",
  ].join(""),
};

const R = {
  w: 24.8,
  d: [
    "M0 0H11.7C14 0 15.9.3 17.6 1C19.3 1.7 20.6 2.7 21.6 4.1C22.6 5.5 23.1 7.3 23.1 9.4",
    "C23.1 14 19.6 19.2 11.2 20L24.8 37H16.4L8.2 21.2V37H0V0Z",
    "M7.7 6.9H10.9C12.2 6.9 13.2 7.2 14 7.9C14.7 8.5 15.1 9.5 15.1 10.8",
    "C15.1 11.6 14.9 12.4 14.6 12.9C14.3 13.5 13.8 13.9 13.2 14.2C12.6 14.5 11.8 14.7 10.9 14.7H7.7V6.9Z",
  ].join(""),
};

const O = {
  w: 28.4,
  d: [
    "M14.2 0C22.05 0 28.4 8.28 28.4 18.5C28.4 28.72 22.05 37 14.2 37C6.35 37 0 28.72 0 18.5C0 8.28 6.35 0 14.2 0Z",
    "M14.2 7.6C17.55 7.6 20.6 12.4 20.6 18.5C20.6 24.6 17.55 29.4 14.2 29.4C10.85 29.4 7.8 24.6 7.8 18.5C7.8 12.4 10.85 7.6 14.2 7.6Z",
  ].join(""),
};

const I = {
  w: 8.2,
  d: "M0 0V37H8.2V0Z",
};

const U = {
  w: 24.6,
  d: "M0 0V37H24.6V0H16.4V29.3H8.2V0Z",
};

const GLYPHS = { T, H, E, L, A, W, M, P, O, R, I, U };

const KERN = {
  TH: 2.4,
  HE: 4.1,
  LA: 4.1,
  AW: -6.7,
  WE: 3.4,
  EM: 3.2,
  MP: 3.6,
  PO: 4.6,
  OR: 3.8,
  RI: 2.6,
  IU: 4.2,
  UM: 3.2,
};

function compose(text, extraGap = 0) {
  const parts = [];
  let x = 0;
  const letters = text.replace(/ /g, "·").split("");
  let prev = null;
  for (const ch of letters) {
    if (ch === "·") {
      x += 13.34;
      prev = " ";
      continue;
    }
    if (prev && prev !== " ") {
      const pair = prev + ch;
      x += (KERN[pair] ?? 4.1) + extraGap;
    }
    const g = GLYPHS[ch];
    if (!g) throw new Error("missing " + ch);
    parts.push(translate(g.d, r(x)));
    x += g.w;
    prev = ch;
  }
  return { d: parts.join(""), width: r(x) };
}

const PAD = 0.6;
const lockup = compose("THE LAW EMPORIUM");
const vbW = r(lockup.width + PAD * 2);
const vbH = r(37 + PAD * 2);

console.log({
  width: lockup.width,
  vbW,
  vbH,
  aspect: r(vbW / vbH),
});

const svg = `<svg viewBox="0 0 ${vbW} ${vbH}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet">
  <g fill="currentColor" fill-rule="evenodd" transform="translate(${PAD} ${PAD})">
    <path d="${lockup.d}" />
  </g>
</svg>`;

console.log("---SVG---");
console.log(svg);
