/*
 * build-cookbook.js
 * ------------------------------------------------------------------
 * Renders cookbook.html to a sellable, print-quality PDF using
 * headless Chromium (Puppeteer). Outputs dist/<file>.pdf with a
 * running header (book title) and footer (page X of Y).
 *
 *   npm install         # one time (downloads Chromium)
 *   npm run build:pdf
 *
 * Switch PAGE_SIZE to "Letter" for a US-Letter edition.
 */
const path = require("path");
const fs = require("fs");

const PAGE_SIZE = "A4";                       // or "Letter"
const TITLE = "The 70 g Protein Cookbook";
const OUT_DIR = path.join(__dirname, "..", "dist");
const OUT_FILE = path.join(OUT_DIR, "the-70g-protein-cookbook.pdf");
const SRC = "file://" + path.join(__dirname, "..", "cookbook.html");

async function main() {
  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch (e) {
    console.error("\nPuppeteer is not installed. Run:  npm install\n");
    process.exit(1);
  }

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log("Launching headless Chromium…");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  console.log("Loading " + SRC);
  await page.goto(SRC, { waitUntil: "networkidle0" });
  // wait until cookbook.js signals it has rendered all pages
  await page.waitForSelector('body[data-rendered="1"]', { timeout: 15000 });
  const pageCount = await page.$$eval(".page", function (els) { return els.length; });
  console.log("Rendered " + pageCount + " book pages. Writing PDF…");

  const footer =
    '<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:8px;' +
    'color:#6b7770;text-align:center;padding:0 12mm;">' +
    '<span class="pageNumber"></span> / <span class="totalPages"></span></div>';
  const header =
    '<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:8px;' +
    'color:#9aa39b;text-align:center;">' + TITLE + "</div>";

  await page.pdf({
    path: OUT_FILE,
    format: PAGE_SIZE,
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: header,
    footerTemplate: footer,
    margin: { top: "14mm", bottom: "14mm", left: "0mm", right: "0mm" }
  });

  await browser.close();
  const kb = Math.round(fs.statSync(OUT_FILE).size / 1024);
  console.log("\n✓ Done → " + path.relative(process.cwd(), OUT_FILE) + "  (" + kb + " KB, " + pageCount + " pages)\n");
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
