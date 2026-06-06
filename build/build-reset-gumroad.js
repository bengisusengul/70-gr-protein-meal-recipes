/*
 * build-reset-gumroad.js — renders on-brand marketing images for the
 * "4-Week 70 g Protein Reset" Gumroad listing (cover 1600x900, square
 * thumbnail 800x800, and 3 gallery cards 1600x900). Rendered from HTML
 * with Puppeteer for full typographic control, then downscaled for crispness.
 *
 * Output: build/reset-gumroad/*.png  (move/upload to Gumroad).
 *   node build/build-reset-gumroad.js
 */
const path = require("path");
const fs = require("fs");
const ROOT = path.join(__dirname, "..");
const OUT = path.join(__dirname, "reset-gumroad");
const heroUrl = "file://" + path.join(ROOT, "img", "book", "hero.jpg");

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">`;

const BASE_CSS = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Inter",sans-serif;color:#1c241f}
  .frame{width:100%;height:100%;overflow:hidden;position:relative}
  .display{font-family:"Fraunces",serif}
  .gold{color:#e0b13a}
  .eyebrow{font-weight:700;letter-spacing:.2em;text-transform:uppercase}
`;

// each scene: {name, w, h, html}
function heroScene(w, h, opts) {
  const titleSize = opts.titleSize, square = opts.square;
  return `<div class="frame" style="background:linear-gradient(160deg,rgba(13,33,24,.55),rgba(13,33,24,.55) 38%,rgba(13,33,24,.93)),url('${heroUrl}');background-size:cover;background-position:center 42%;color:#fff;display:flex;flex-direction:column;justify-content:${square ? "center" : "flex-end"};padding:${square ? "70px 64px" : "70px 80px"}">
    <p class="eyebrow gold" style="font-size:${square ? 20 : 22}px;color:#f1dca6;margin-bottom:${square ? 18 : 14}px">A 28-Day Program${square ? "" : " · By Bengisu Sengul, Chef"}</p>
    <h1 class="display" style="font-weight:700;font-size:${titleSize}px;line-height:1.0;letter-spacing:-.02em;text-shadow:0 2px 30px rgba(0,0,0,.4)">The 4-Week<br><span class="gold" style="font-style:italic">70&nbsp;g Protein</span><br>Reset</h1>
    ${square ? "" : `<p style="font-family:Inter;font-size:25px;line-height:1.4;max-width:760px;margin-top:22px;opacity:.96">Eat real, crave-worthy food. Hit your protein. Cut the sugar. Feel like yourself again — in 28 days.</p>`}
    <div style="display:flex;gap:14px;margin-top:${square ? 26 : 30}px">
      ${[["28", "days mapped"], ["~210 g", "protein/day"], ["100", "recipes inside"]].map(b => `<div style="background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.3);border-radius:14px;padding:${square ? "10px 16px" : "14px 22px"};text-align:center"><div class="display" style="font-size:${square ? 26 : 32}px">${b[0]}</div><div style="font-size:${square ? 11 : 13}px;letter-spacing:.04em;text-transform:uppercase;opacity:.85;margin-top:2px">${b[1]}</div></div>`).join("")}
    </div>
  </div>`;
}

const card = (tag, title, lines) => `<div style="background:#fff;border:1px solid #e8e3d7;border-radius:18px;box-shadow:0 14px 30px rgba(20,40,28,.08);padding:30px;flex:1;display:flex;flex-direction:column">
  <span style="align-self:flex-start;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#e0b13a;background:#fbf3dd;padding:5px 12px;border-radius:999px">${tag}</span>
  <h3 class="display" style="font-size:27px;font-weight:600;margin:16px 0 10px;color:#1d4e34">${title}</h3>
  <ul style="list-style:none;color:#5b5048;font-size:18px;line-height:1.7">${lines.map(l => `<li style="padding-left:22px;position:relative"><span style="position:absolute;left:0;color:#2f7d52;font-weight:800">✓</span>${l}</li>`).join("")}</ul>
</div>`;

const SCENES = [
  { name: "cover", w: 1600, h: 900, html: heroScene(1600, 900, { titleSize: 92 }) },
  { name: "thumbnail", w: 800, h: 800, html: heroScene(800, 800, { titleSize: 70, square: true }) },
  {
    name: "gallery-1-whats-inside", w: 1600, h: 900,
    html: `<div class="frame" style="background:#faf8f3;padding:64px 60px;display:flex;flex-direction:column">
      <p class="eyebrow" style="font-size:20px;color:#2f7d52">Everything in one bundle</p>
      <h2 class="display" style="font-size:54px;font-weight:600;color:#1d4e34;margin:8px 0 30px">What you get</h2>
      <div style="display:flex;gap:22px;flex:1">
        ${card("The Program", "4-Week Reset Guide", ["Day-by-day meal plans", "A focus + habit each week", "The science, distilled", "Setup & troubleshooting"])}
        ${card("Done-for-you", "Printables Pack", ["4 weekly plan grids", "4 aisle shopping lists", "28-day habit tracker", "Weekly check-in log"])}
        ${card("Included free", "100-Recipe Cookbook", ["All 100 recipes + photos", "Macros & dietary swaps", "27 vegetarian options", "The cited science"])}
      </div>
    </div>`
  },
  {
    name: "gallery-2-arc", w: 1600, h: 900,
    html: `<div class="frame" style="background:#143527;padding:64px 60px;display:flex;flex-direction:column;color:#eef0e6">
      <p class="eyebrow gold" style="font-size:20px;color:#f1dca6">The four-week arc</p>
      <h2 class="display" style="font-size:54px;font-weight:600;color:#fff;margin:8px 0 30px">A plan that builds on itself</h2>
      <div style="display:flex;gap:18px;flex:1">
        ${[["Week 1", "Foundation", "Get the system in. Just hit protein, every meal."], ["Week 2", "Momentum", "Beat boredom with brighter Mediterranean flavours."], ["Week 3", "Lean & Light", "Dial it in: max protein, lowest calories."], ["Week 4", "Lock-In", "A favourites tour — then build it yourself."]].map(w => `<div style="flex:1;background:rgba(255,255,255,.06);border-top:4px solid #2f7d52;border-radius:14px;padding:24px"><div class="eyebrow" style="font-size:14px;color:#9ec9ad">${w[0]}</div><h3 class="display" style="font-size:26px;font-weight:600;color:#fff;margin:8px 0 10px">${w[1]}</h3><p style="font-size:17px;line-height:1.5;opacity:.9">${w[2]}</p></div>`).join("")}
      </div>
    </div>`
  },
  {
    name: "gallery-3-results", w: 1600, h: 900,
    html: `<div class="frame" style="background:#faf8f3;padding:64px 70px;display:flex;flex-direction:column">
      <p class="eyebrow" style="font-size:20px;color:#2f7d52">What changes</p>
      <h2 class="display" style="font-size:54px;font-weight:600;color:#1d4e34;margin:8px 0 14px">By the end of 28 days</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px 50px;margin-top:14px">
        ${["No more 3pm crash or sugar cravings", "Genuinely full on real food — no willpower battles", "Clothes, especially waistbands, fitting more easily", "Protein on autopilot — you stop needing the plan", "Steadier mood and better sleep", "A repeatable system you can run any time"].map(b => `<div style="display:flex;gap:16px;align-items:center;font-size:22px;color:#2c2620"><span style="flex:0 0 auto;width:38px;height:38px;border-radius:50%;background:#e2f1e8;color:#1d4e34;display:flex;align-items:center;justify-content:center;font-weight:800">✓</span>${b}</div>`).join("")}
      </div>
      <div style="margin-top:auto;display:flex;align-items:center;gap:18px;background:#fff;border:1px solid #e8e3d7;border-radius:16px;padding:22px 26px">
        <div style="flex:0 0 auto;width:62px;height:62px;border-radius:50%;border:3px solid #e0b13a;color:#b4881f;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;text-align:center;line-height:1.05">30<br>DAY</div>
        <div style="font-size:21px;color:#2c2620"><b>30-day money-back guarantee.</b> Try the whole program — if it's not for you, email me for a full refund.</div>
      </div>
    </div>`
  }
];

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const puppeteer = require("puppeteer");
  const sharp = (() => { try { return require("sharp"); } catch (e) { return null; } })();
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  for (const s of SCENES) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 2 });
    // Write to a temp file and navigate (file:// scheme) so file:// background
    // images load — setContent runs in an about:blank context that blocks them.
    const tmp = path.join(ROOT, "_gum-" + s.name + ".build.html");
    fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf8">${FONTS}<style>${BASE_CSS}
      html,body{width:${s.w}px;height:${s.h}px}</style></head><body>${s.html}</body></html>`);
    await page.goto("file://" + tmp, { waitUntil: "networkidle0" });
    // small delay for webfonts to paint
    await new Promise((r) => setTimeout(r, 400));
    const buf = await page.screenshot({ type: "png" });
    fs.writeFileSync(path.join(OUT, s.name + ".png"), buf);
    fs.unlinkSync(tmp);
    await page.close();
  }
  await browser.close();
  const list = fs.readdirSync(OUT).filter((f) => f.endsWith(".png"));
  list.forEach((f) => console.log("✓ build/reset-gumroad/" + f + " (" + Math.round(fs.statSync(path.join(OUT, f)).size / 1024) + " KB)"));
})().catch((e) => { console.error(e); process.exit(1); });
