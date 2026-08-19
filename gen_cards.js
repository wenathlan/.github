const fs = require("fs");
const dir = "profile/windgets";
const FF = "'Inter','Segoe UI',system-ui,sans-serif";

function cardOpen(id, W, H) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">
  <defs>
    <linearGradient id="a${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d4430c"/><stop offset="1" stop-color="#0b5cad"/></linearGradient>
    <linearGradient id="b${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fb923c"/><stop offset="1" stop-color="#d4430c"/></linearGradient>
    <filter id="s${id}" x="-10%" y="-10%" width="120%" height="135%"><feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#5a2a00" flood-opacity="0.12"/></filter>
    <clipPath id="cl"><rect x="0" y="0" width="${W}" height="${H}" rx="20"/></clipPath>
  </defs>
  <g clip-path="url(#cl)">
    <rect x="0" y="0" width="${W}" height="${H}" rx="20" fill="#ffffff" stroke="#f0e6df" filter="url(#s${id})"/>
    <circle cx="${W-24}" cy="20" r="58" fill="url(#a${id})" opacity=".06"/>
    <rect x="0" y="0" width="6" height="${H}" rx="3" fill="url(#a${id})"/>
`;
}
const cardClose = `  </g>
</svg>`;
function pill(id, label) {
  const w = label.length * 7.6 + 30;
  return `    <g transform="translate(26 22)"><rect x="0" y="-2" width="${w}" height="26" rx="13" fill="url(#a${id})"/><text x="15" y="16" font-family="${FF}" font-size="12" font-weight="700" fill="#ffffff" letter-spacing="1.4">${label}</text></g>\n`;
}
function project(id, d) {
  const W = 400, H = 156;
  const gl = GLYPHS[d.g];
  const gw = gl.stroke
    ? `<path d="${gl.d}" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<path d="${gl.d}" fill="#ffffff"/>`;
  let lines = "";
  d.lines.forEach((t, i) => { lines += `    <text x="26" y="${96 + i * 16}" font-family="${FF}" font-size="11.5" font-weight="500" fill="#6b7280">${t}</text>\n`; });
  const pw = d.pct * 3;
  return cardOpen(id, W, H) + pill(id, d.label) +
    `    <text x="26" y="70" font-family="${FF}" font-size="18" font-weight="800" fill="#1f2937">${d.title}</text>\n` +
    `    <g transform="translate(336 44)"><rect width="40" height="40" rx="12" fill="url(#a${id})"/>${gw.replace("<path", '<path transform="translate(8 8)"')}</g>\n` +
    lines +
    `    <rect x="26" y="130" width="300" height="6" rx="3" fill="#f0e6df"/>\n` +
    `    <rect x="26" y="130" height="6" rx="3" fill="url(#b${id})"><animate attributeName="width" values="0;${pw};${pw}" dur="1.4s" fill="freeze"/><animate attributeName="width" values="${pw};${pw + 8};${pw}" dur="3.2s" repeatCount="indefinite" begin="1.4s"/></rect>\n` +
    `    <text x="332" y="136" font-family="${FF}" font-size="11" font-weight="700" fill="#9a3412">${d.pct}%</text>\n` +
    cardClose();
}
function whoami(id) {
  const W = 400, H = 200;
  const paras = ["We are a studio crafting audio AI,", "open-source tooling and bold product", "experiences — designed with care."];
  let lines = "";
  paras.forEach((t, i) => { lines += `    <text x="26" y="${100 + i * 18}" font-family="${FF}" font-size="11.5" font-weight="500" fill="#6b7280">${t}</text>\n`; });
  return cardOpen(id, W, H) + pill(id, "WHO WE ARE") +
    `    <text x="26" y="70" font-family="${FF}" font-size="20" font-weight="800" fill="#1f2937">Nathlan Bros</text>\n` +
    `    <rect x="26" y="80" width="68" height="3" rx="1.5" fill="url(#a${id})"/>\n` + lines + cardClose
}
function status(id) {
  const W = 400, H = 200;
  const items = [["Building in public", true], ["Open to collaborations", true], ["Ship · learn · repeat", false]];
  let rows = "";
  items.forEach(([t, on], i) => {
    const y = 96 + i * 28;
    rows += `    <circle cx="34" cy="${y - 4}" r="5" fill="${on ? "#16a34a" : "#d4430c"}">${on ? '<animate attributeName="opacity" values="1;.35;1" dur="2s" repeatCount="indefinite"/>' : ""}</circle>\n`;
    rows += `    <text x="50" y="${y}" font-family="${FF}" font-size="13" font-weight="600" fill="#1f2937">${t}</text>\n`;
  });
  return cardOpen(id, W, H) + pill(id, "STATUS") + rows + cardClose
}
function team(id) {
  const W = 400, H = 216;
  const people = [["A", "Allan"], ["N", "Nathlan"], ["S", "Studio"]];
  let av = "";
  people.forEach(([ini, name], i) => {
    const cx = 92 + i * 108;
    av += `    <circle cx="${cx}" cy="104" r="30" fill="url(#a${id})"/>\n`;
    av += `    <text x="${cx}" y="112" text-anchor="middle" font-family="${FF}" font-size="22" font-weight="800" fill="#ffffff">${ini}</text>\n`;
    av += `    <text x="${cx}" y="154" text-anchor="middle" font-family="${FF}" font-size="13" font-weight="700" fill="#1f2937">${name}</text>\n`;
  });
  return cardOpen(id, W, H) + pill(id, "TEAM") + av + cardClose
}
function connect(id) {
  const W = 400, H = 268;
  const socials = [["GitHub", "@iNathlan", ICONS.github], ["X", "@wenathlan", ICONS.x], ["Instagram", "@wenathlan", ICONS.ig], ["YouTube", "@wenathlan", ICONS.yt], ["Twitch", "@wenathlan", ICONS.tw], ["Bluesky", "@wenathlan", ICONS.bs]];
  let rows = "";
  socials.forEach(([name, h, d], i) => {
    const y = 64 + i * 32;
    rows += `    <g transform="translate(26 ${y})">\n      <rect width="30" height="30" rx="9" fill="url(#a${id})" opacity=".12"/>\n      <g transform="translate(3 3)"><path d="${d}" fill="url(#a${id})"/></g>\n      <text x="44" y="13" font-family="${FF}" font-size="13" font-weight="700" fill="#1f2937">${name}</text>\n      <text x="44" y="26" font-family="${FF}" font-size="11" font-weight="500" fill="#6b7280">${h}</text>\n    </g>\n`;
  });
  return cardOpen(id, W, H) + pill(id, "CONNECT") + rows + cardClose
}

const GLYPHS = {
  g1: { d: "M3 12c1.5-6 3-6 4.5 0s3 6 4.5 0 3-6 4.5 0 3 6 4.5 0", stroke: true },
  g2: { d: "M4 8h11a2 2 0 0 1 2 2v7H6a2 2 0 0 1-2-2V8Zm3-3h11a2 2 0 0 1 2 2v8", stroke: true },
  g3: { d: "M12 4v3M12 17v3M4 12h3M17 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2 M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z", stroke: true },
  g4: { d: "M2 12h4l2-7 4 14 2-7h4l2 4h2", stroke: true },
  g5: { d: "M13 2 4 14h6l-1 8 9-12h-6z", stroke: false },
  g6: { d: "M14 3c-4 1-7 5-7 10v5l3-2 2 3 2-3 3 2v-5c0-5-3-9-7-10z M12 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z", stroke: false },
};
const ICONS = {
  github: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  x: "M17.53 3H20.5l-6.49 7.41L21.75 21h-6.06l-4.74-6.2L5.22 21H2.25l6.94-7.93L2.5 3h6.2l4.28 5.66L17.53 3Zm-1.06 16.2h1.7L7.6 4.72H5.79L16.47 19.2Z",
  ig: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4a3.6 3.6 0 0 0-1.35.88 3.6 3.6 0 0 0-.88 1.35c-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.22.55.47.94.88 1.35.41.41.8.66 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.64 3.64 0 0 0-.88-1.35 3.64 3.64 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92Zm0 1.62a3.84 3.84 0 1 0 0 7.68 3.84 3.84 0 0 0 0-7.68Zm5.65-2.52a1.28 1.28 0 1 1 0 2.56 1.28 1.28 0 0 1 0-2.56Z",
  yt: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6S4.5 3.6 2.6 4.1A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.7 15.3V8.7l6.3 3.3Z",
  tw: "M4 2 3 6v13h4v3h3l3-3h4l5-5V2H4Z M7 5h2v5H7z M13 5h2v5h-2z",
  bs: "M12 10.2C10.8 7 7.6 4.6 4.6 4.4c-1.2-.1-2.4 1-2.4 2.8 0 1 .5 8 3 8.8 1 .4 2-.3 2.6-1.2-.7 3 .8 4.7 3.2 4.7s2.5-1.7 3.2-4.7c.6.9 1.6 1.6 2.6 1.2 2.5-.8 3-7.8 3-8.8 0-1.8-1.2-2.9-2.4-2.8-3 .2-6.2 2.6-7.4 5.8Z",
};

const projects = [
  { g: "g1", label: "PROJECT 01", title: "AudioForge", lines: ["AI audio toolkit: separate, clean,", "master & synthesize in real time."], pct: 94 },
  { g: "g2", label: "PROJECT 02", title: "OpenDeck", lines: ["Self-hosted app & service launcher", "with a glassy, fast UI."], pct: 81 },
  { g: "g3", label: "PROJECT 03", title: "Lumen UI", lines: ["Accessible component library with", "motion built in from day one."], pct: 76 },
  { g: "g4", label: "PROJECT 04", title: "PulseAI", lines: ["Edge inference for voice & vision,", "running on-device, offline."], pct: 68 },
  { g: "g5", label: "PROJECT 05", title: "EdgeRunner", lines: ["Rust build pipeline for tiny,", "instant CLI tools."], pct: 72 },
  { g: "g6", label: "PROJECT 06", title: "Venture Lab", lines: ["Our incubator: shipping side", "projects into real products."], pct: 63 },
];

fs.writeFileSync(`${dir}/whoami.svg`, whoami("whoami"));
fs.writeFileSync(`${dir}/status.svg`, status("status"));
projects.forEach((p, i) => fs.writeFileSync(`${dir}/projects${i + 1}.svg`, project("p" + (i + 1), p)));
fs.writeFileSync(`${dir}/team.svg`, team("team"));
fs.writeFileSync(`${dir}/connect.svg`, connect("connect"));
console.log("cards written");
