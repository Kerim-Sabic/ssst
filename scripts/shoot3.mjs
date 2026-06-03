import { chromium } from "playwright";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

const BASE = process.env.BASE || "http://localhost:5173";
const outDir = path.join(os.tmpdir(), "cs-shots");
fs.mkdirSync(outDir, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => {
  try { sessionStorage.setItem("caresignal_deck_intro_seen", "1"); } catch {}
});

const slides = { 10: "architecture", 11: "security", 12: "safety", 13: "roadmap", 14: "closing" };
for (const [n, name] of Object.entries(slides)) {
  const page = await ctx.newPage();
  await page.goto(`${BASE}/pitchdeck#${n}`, { waitUntil: "networkidle" });
  await wait(2000);
  await page.screenshot({ path: path.join(outDir, `new-${n}-${name}.png`) });
  console.log("shot", n, name, "hash:", await page.evaluate(() => location.hash));
  await page.close();
}
await browser.close();
console.log("DONE ->", outDir);
