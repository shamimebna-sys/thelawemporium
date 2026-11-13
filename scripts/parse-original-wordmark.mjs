const d =
  "M156.84 37h7.3l-15.1-37-15.2 37h7.5l3-6.7h9.6zm-4.8-12.8h-5.8l2.9-7.3zm41.3-2.4c-.7-1.3-1.7-2.4-2.8-3.3-.8-.6-1.7-1-2.6-1.4 1.3-.7 2.4-1.6 3.2-2.7 1-1.4 1.5-3 1.5-5 0-2.1-.5-3.9-1.5-5.3s-2.3-2.4-4-3.1-3.6-1-5.9-1h-11.7v37h12.5c2.5 0 4.7-.4 6.6-1.1s3.3-1.8 4.3-3.4c1-1.5 1.5-3.5 1.5-6 0-1.8-.4-3.4-1.1-4.7zm-12.9-14.9c1.3 0 2.3.3 3.1 1 .7.6 1.1 1.6 1.1 2.9 0 .8-.2 1.6-.5 2.1-.3.6-.8 1-1.4 1.3s-1.4.5-2.3.5h-3.2V6.9zm5.3 21.2c-.5.7-1.1 1.2-1.9 1.5s-1.7.4-2.7.4h-3.9v-9.1h3.9c.8 0 1.5.1 2.1.2.6.2 1.2.4 1.7.8s.9.8 1.1 1.4c.3.6.4 1.2.4 2 0 1.2-.2 2.2-.7 2.8zM116.04 0v29.3h13.7V37h-21.9V0zM8.2 0v29.3h13.7V37H0V0zM49 37h7.3l-15-37L26 37h7.5l3-6.7h9.6zm-4.8-12.8h-5.8l2.9-7.3zm19.7-5.3L57.1 0h-7.5l13.5 37 9.5-22.4L82.9 37 94.5 0h-7.6l-5.6 18.9L72.1 0z";

const tokens = d.match(/[MmLlHhVvCcSsQqTtAaZz]|-?\d*\.?\d+/g);

let i = 0;
let cx = 0,
  cy = 0,
  sx = 0,
  sy = 0;
let lastCmd = "";
const subpaths = [];
let current = [];
let minX = Infinity,
  minY = Infinity,
  maxX = -Infinity,
  maxY = -Infinity;

function add(x, y, kind) {
  current.push({ x: round(x), y: round(y), kind });
  minX = Math.min(minX, x);
  minY = Math.min(minY, y);
  maxX = Math.max(maxX, x);
  maxY = Math.max(maxY, y);
}

function round(n) {
  return Math.round(n * 100) / 100;
}

function num() {
  return parseFloat(tokens[i++]);
}

function isNum(t) {
  return t !== undefined && !/^[MmLlHhVvCcSsQqTtAaZz]$/.test(t);
}

while (i < tokens.length) {
  let t = tokens[i];
  let cmd;
  if (/^[MmLlHhVvCcSsQqTtAaZz]$/.test(t)) {
    cmd = t;
    i++;
  } else {
    cmd =
      lastCmd === "M"
        ? "L"
        : lastCmd === "m"
          ? "l"
          : lastCmd;
  }
  lastCmd = cmd;
  const rel = cmd === cmd.toLowerCase();
  const C = cmd.toUpperCase();

  if (C === "Z") {
    current.push({ kind: "Z" });
    subpaths.push(current);
    current = [];
    cx = sx;
    cy = sy;
    continue;
  }
  if (C === "M") {
    if (current.length) subpaths.push(current);
    current = [];
    let x = num();
    let y = num();
    if (rel) {
      x += cx;
      y += cy;
    }
    cx = sx = x;
    cy = sy = y;
    add(cx, cy, "M");
    continue;
  }
  if (C === "L") {
    let x = num();
    let y = num();
    if (rel) {
      x += cx;
      y += cy;
    }
    cx = x;
    cy = y;
    add(cx, cy, "L");
    continue;
  }
  if (C === "H") {
    let x = num();
    if (rel) x += cx;
    cx = x;
    add(cx, cy, "H");
    continue;
  }
  if (C === "V") {
    let y = num();
    if (rel) y += cy;
    cy = y;
    add(cx, cy, "V");
    continue;
  }
  if (C === "C") {
    const pts = [];
    for (let k = 0; k < 3; k++) {
      let x = num();
      let y = num();
      if (rel) {
        x += cx;
        y += cy;
      }
      pts.push([x, y]);
    }
    cx = pts[2][0];
    cy = pts[2][1];
    current.push({
      kind: "C",
      x: round(cx),
      y: round(cy),
      c1: pts[0].map(round),
      c2: pts[1].map(round),
    });
    for (const [x, y] of pts) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
    continue;
  }
  if (C === "S") {
    let x2 = num();
    let y2 = num();
    let x = num();
    let y = num();
    if (rel) {
      x2 += cx;
      y2 += cy;
      x += cx;
      y += cy;
    }
    cx = x;
    cy = y;
    current.push({
      kind: "S",
      x: round(cx),
      y: round(cy),
      c2: [round(x2), round(y2)],
    });
    continue;
  }
  throw new Error("unhandled " + cmd + " at " + i);
}
if (current.length) subpaths.push(current);

subpaths.forEach((sp, idx) => {
  const xs = sp.filter((p) => p.x !== undefined).map((p) => p.x);
  const ys = sp.filter((p) => p.y !== undefined).map((p) => p.y);
  console.log(
    `\n=== subpath ${idx} bbox ${Math.min(...xs)},${Math.min(...ys)} → ${Math.max(...xs)},${Math.max(...ys)} ===`,
  );
  for (const p of sp) console.log(JSON.stringify(p));
});
