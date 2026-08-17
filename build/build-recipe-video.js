#!/usr/bin/env node
/* Recipe of the Week generator — turns any recipe id into a faceless episode:
 *   1080x1920 scene stills (also usable as an IG carousel) + assembly script.
 *
 * Usage:  node build/build-recipe-video.js <recipe-id> [outDir]
 *         → writes scenes + ffmpeg-assemble.sh into outDir (default: dist/rotw/<id>/)
 *         → then: bash <outDir>/ffmpeg-assemble.sh   (needs ffmpeg on PATH)
 *
 * Brand: deep green #143527, gold #E0B13A, Fraunces + DM Sans (Google Fonts, needs network).
 * Layout keeps all text inside TikTok/IG safe zones (top 260 / bottom 520 / right 90).
 */
const path = require('path');
const fs = require('fs');
const ROOT = path.join(__dirname, '..');
const puppeteer = require(path.join(ROOT, 'node_modules', 'puppeteer'));

global.window = {};
require(path.join(ROOT, 'js', 'recipes-data.js'));
const id = process.argv[2];
const recipe = (window.RECIPES || []).find(r => r.id === id);
if (!recipe) { console.error(`Recipe "${id}" not found. Pass a valid recipe id.`); process.exit(1); }
const OUT = process.argv[3] || path.join(ROOT, 'dist', 'rotw', id);
fs.mkdirSync(OUT, { recursive: true });

const photo = path.join(ROOT, 'img', 'recipes', `${id}.jpg`);
const photo64 = fs.readFileSync(photo).toString('base64');
const totalTime = (recipe.time?.prep || 0) + (recipe.time?.cook || 0);
const m = recipe.macros;

const FONT = `<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,900&family=DM+Sans:wght@500;700&display=swap" rel="stylesheet">`;
const CSS = `*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1920px;overflow:hidden}
body{background:#143527;font-family:'DM Sans',sans-serif;color:#fff}
.serif{font-family:'Fraunces',serif}.gold{color:#E0B13A}
.chip{display:inline-block;background:rgba(20,53,39,.92);border:3px solid #E0B13A;color:#fff;font-weight:700;font-size:44px;padding:18px 36px;border-radius:60px}
.full{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,26,19,.72) 0%,rgba(10,26,19,.12) 34%,rgba(10,26,19,.05) 55%,rgba(10,26,19,.82) 100%)}
.wrap{position:absolute;inset:0;padding:260px 90px 520px 90px;display:flex;flex-direction:column}`;

function svg(inner, size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" stroke="#E0B13A" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}
const ICONS = {
  pan:      '<circle cx="44" cy="62" r="26"/><path d="M70 62 h26"/><path d="M34 16 q7 9 0 18"/><path d="M54 12 q7 9 0 18"/>',
  bowl:     '<path d="M18 48 h64 a32 32 0 0 1 -64 0 z"/><path d="M34 34 q6 -10 16 -10"/>',
  knife:    '<path d="M20 58 Q48 20 78 26 Q72 48 34 64 Z"/><path d="M34 64 L18 84"/>',
  meat:     '<path d="M26 38 q12 -14 32 -10 q24 5 20 24 q-4 18 -28 18 q-28 0 -28 -16 q0 -8 4 -16 z"/><path d="M38 44 q14 -4 26 6"/>',
  dairy:    '<path d="M38 18 h24 v14 l8 14 v36 a6 6 0 0 1 -6 6 h-28 a6 6 0 0 1 -6 -6 v-36 l8 -14 z"/><path d="M30 50 h40"/>',
  tomato:   '<circle cx="50" cy="56" r="26"/><path d="M50 30 q-4 -10 4 -14 M50 30 q10 -6 16 0 M50 30 q-12 -4 -18 2"/>',
  veg:      '<path d="M50 18 q32 18 25 47 q-7 20 -25 17 q-18 3 -25 -17 q-7 -29 25 -47 z"/><path d="M50 28 v46"/>',
  spice:    '<path d="M50 20 v60"/><path d="M50 38 q-15 -3 -21 -17 q17 -2 21 17 z"/><path d="M50 38 q15 -3 21 -17 q-17 -2 -21 17 z"/><path d="M50 60 q-15 -3 -21 -17 q17 -2 21 17 z"/><path d="M50 60 q15 -3 21 -17 q-17 -2 -21 17 z"/>',
  dumbbell: '<rect x="14" y="38" width="12" height="24" rx="3"/><rect x="74" y="38" width="12" height="24" rx="3"/><path d="M26 50 h48"/>',
  leaf:     '<path d="M50 18 q32 18 25 47 q-7 20 -25 17 q-18 3 -25 -17 q-7 -29 25 -47 z"/><path d="M50 28 v46"/>',
  flame:    '<path d="M50 16 q19 20 21 37 a21 21 0 1 1 -42 0 q2 -17 21 -37 z"/><path d="M50 52 q7 7 7 13 a7 7 0 1 1 -14 0 q0 -6 7 -13 z"/>',
  clock:    '<circle cx="50" cy="50" r="32"/><path d="M50 32 v18 l12 8"/>',
};
// crude keyword → icon mapping for ingredient rows
function ingIcon(item) {
  const s = item.toLowerCase();
  if (/(chicken|beef|steak|lamb|pork|turkey|mince|salmon|cod|tuna|shrimp|prawn|fish|trout|haddock|mackerel)/.test(s)) return 'meat';
  if (/(yogurt|cream|cheese|milk|butter|quark|feta|halloumi|paneer|egg)/.test(s)) return 'dairy';
  if (/(tomato)/.test(s)) return 'tomato';
  if (/(masala|spice|garlic|ginger|herb|thyme|cumin|paprika|season|salt|chilli|curry)/.test(s)) return 'spice';
  return 'veg';
}
const stepIcons = ['pan', 'bowl', 'knife'];
const stepLabels = ['PREP', 'COOK', 'SERVE'];

function dots(current, total) {
  return `<div style="display:flex;gap:22px">${Array.from({length: total}, (_, i) =>
    `<div style="width:22px;height:22px;border-radius:50%;${i + 1 === current
      ? 'background:#E0B13A' : 'border:3px solid rgba(224,177,58,.45)'}"></div>`).join('')}</div>`;
}

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const shortName = esc(recipe.name.replace(/ with /i, '\nwith ')).replace('\n', '<br>');

const scenes = {};
scenes['01-hook'] = `<!doctype html><html><head>${FONT}<style>${CSS}</style></head><body>
  <img class="full" src="data:image/jpeg;base64,${photo64}"><div class="shade"></div>
  <div class="wrap">
    <div style="font-weight:700;font-size:40px;letter-spacing:11px;color:#E0B13A;margin-bottom:34px">RECIPE OF THE WEEK</div>
    <div class="serif" style="font-weight:900;font-size:92px;line-height:1.12;text-shadow:0 4px 26px rgba(0,0,0,.55)">${shortName}</div>
    <div style="margin-top:auto"><div class="chip">${m.protein}g protein &middot; ${m.netCarbs}g net carbs &middot; ${totalTime} min</div></div>
  </div></body></html>`;

const ingRows = recipe.ingredients.slice(0, 6).map(i => {
  const qty = i.qty ? `${i.qty}${i.unit === 'g' || i.unit === 'ml' ? i.unit : ' ' + (i.unit || '')}` : (i.unit || '');
  return [ingIcon(i.item), esc(`${qty ? qty + ' ' : ''}${i.item}`)];
});
scenes['02-ingredients'] = `<!doctype html><html><head>${FONT}<style>${CSS}</style></head><body>
  <div class="wrap" style="justify-content:center;gap:${ingRows.length > 4 ? 38 : 50}px">
    <div class="serif gold" style="font-weight:900;font-size:96px">What you need</div>
    ${ingRows.map(([ic, t]) => `<div style="display:flex;align-items:center;gap:36px;border-bottom:3px solid rgba(224,177,58,.35);padding-bottom:${ingRows.length > 4 ? 24 : 32}px">
      ${svg(ICONS[ic], 80)}<div style="font-size:56px;font-weight:500">${t}</div></div>`).join('')}
  </div></body></html>`;

recipe.steps.slice(0, 3).forEach((step, i) => {
  scenes[`0${3 + i}-step${i + 1}`] = `<!doctype html><html><head>${FONT}<style>${CSS}</style></head><body>
  <div class="wrap" style="justify-content:center;gap:52px">
    <div style="width:180px;height:180px;border:5px solid #E0B13A;border-radius:50%;display:flex;align-items:center;justify-content:center">${svg(ICONS[stepIcons[i]], 126)}</div>
    <div style="font-weight:700;font-size:42px;letter-spacing:12px;color:#E0B13A">STEP ${i + 1} OF ${Math.min(recipe.steps.length, 3)} &middot; ${stepLabels[i]}</div>
    <div class="serif" style="font-weight:600;font-size:84px;line-height:1.25">${esc(step)}</div>
    <div style="margin-top:16px">${dots(i + 1, Math.min(recipe.steps.length, 3))}</div>
  </div></body></html>`;
});

scenes['06-macros'] = `<!doctype html><html><head>${FONT}<style>${CSS}</style></head><body>
  <div class="wrap" style="justify-content:center;gap:56px">
    ${[['dumbbell', `${m.protein}g`, 'protein'], ['leaf', `${m.netCarbs}g`, 'net carbs'], ['flame', `${m.calories}`, 'kcal'], ['clock', `${totalTime}`, 'minutes']]
      .map(([ic, n, l]) => `<div style="display:flex;align-items:center;gap:36px;border-bottom:3px solid rgba(224,177,58,.35);padding-bottom:36px">
      ${svg(ICONS[ic], 96)}<div class="serif gold" style="font-weight:900;font-size:118px;min-width:300px">${n}</div><div style="font-size:56px;font-weight:500">${l}</div></div>`).join('')}
  </div></body></html>`;

scenes['07-end'] = `<!doctype html><html><head>${FONT}<style>${CSS}</style></head><body>
  <div class="wrap" style="justify-content:center;gap:56px">
    <div style="width:130px;height:10px;background:#E0B13A;border-radius:6px"></div>
    <div class="serif" style="font-weight:900;font-size:104px;line-height:1.12">Full recipe <span class="gold">FREE</span> on my site &mdash; with 99 more.</div>
    <div class="serif" style="font-weight:600;font-size:64px;line-height:1.3;opacity:.95">&rarr; link in bio &nbsp;&middot;&nbsp; the70gprotein.com</div>
  </div></body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  for (const [name, html] of Object.entries(scenes)) {
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 220));
    await page.screenshot({ path: path.join(OUT, `${name}.png`) });
    console.log('rendered', name);
  }
  await browser.close();

  // assembly script: hook (zoompan) + stills + xfades; durations tuned from the steak episode
  const names = Object.keys(scenes);
  const durs = names.map(n => n.includes('hook') ? 3.5 : n.includes('ingredients') ? 5.0 : n.includes('end') ? 4.0 : 4.5);
  const fade = 0.4;
  let off = [], acc = 0;
  durs.forEach((d, i) => { if (i < durs.length - 1) { acc += d - fade; off.push(acc.toFixed(2)); } });
  const total = (durs.reduce((a, b) => a + b, 0) - fade * (durs.length - 1)).toFixed(1);
  const segs = names.map((n, i) => n.includes('hook')
    ? `ffmpeg -y -loglevel error -loop 1 -i ${n}.png -vf "scale=1350:2400,zoompan=z='1+0.0006*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${Math.round(durs[i] * 30)}:s=1080x1920:fps=30,unsharp=5:5:0.5" -t ${durs[i]} -pix_fmt yuv420p s${i}.mp4`
    : `ffmpeg -y -loglevel error -loop 1 -i ${n}.png -t ${durs[i]} -r 30 -pix_fmt yuv420p s${i}.mp4`).join(' && \\\n');
  const inputs = names.map((_, i) => `-i s${i}.mp4`).join(' ');
  const chain = off.map((o, i) => `[${i === 0 ? '0' : 'v' + i}][${i + 1}]xfade=transition=fade:duration=${fade}:offset=${o}[v${i + 1}]`).join(';');
  const script = `#!/bin/bash
cd "$(dirname "$0")"
${segs} && \\
ffmpeg -y -loglevel error ${inputs} -f lavfi -t ${Math.ceil(total)} -i anullsrc=channel_layout=stereo:sample_rate=44100 \\
 -filter_complex "${chain.replace(/\[v${'{'}off.length${'}'}\]$/, '')}" \\
 -map "[v${off.length}]" -map ${names.length}:a -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -c:a aac -shortest ${id}-rotw.mp4 && \\
rm -f s*.mp4 && echo "DONE: ${id}-rotw.mp4 (${total}s). Carousel = the numbered PNGs."
`;
  fs.writeFileSync(path.join(OUT, 'ffmpeg-assemble.sh'), script);
  console.log(`\nScenes + assembler written to ${OUT}`);
  console.log(`Assemble with:  bash ${path.join(OUT, 'ffmpeg-assemble.sh')}`);
})();
