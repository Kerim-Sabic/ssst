import { chromium } from "playwright";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

const BASE = process.env.BASE || "http://localhost:5173";
const outDir = path.join(os.tmpdir(), "cs-shots");
fs.mkdirSync(outDir, { recursive: true });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  // skip the one-time deck intro so slides shoot cleanly
  // (set before any page script runs)
});
await ctx.addInitScript(() => {
  try {
    sessionStorage.setItem("caresignal_deck_intro_seen", "1");
  } catch {}
});
const page = await ctx.newPage();
const shot = async (name) => {
  await page.screenshot({ path: path.join(outDir, `${name}.png`) });
  console.log("shot", name);
};

/* ---------------- Pitch deck ---------------- */
await page.goto(`${BASE}/pitchdeck`, { waitUntil: "networkidle" });
await wait(1500);
for (let i = 0; i < 19; i++) {
  const hash = await page.evaluate(() => location.hash || "#1");
  await shot(`deck-${String(i).padStart(2, "0")}-h${hash.replace("#", "")}`);
  await page.keyboard.press("ArrowRight");
  await wait(1900);
}

/* ---------------- App ---------------- */
async function appShot(name) {
  await wait(1100);
  await shot(`app-${name}`);
}
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await appShot("01-landing");

// Demo → check-in
try {
  await page.getByRole("button", { name: "Demo", exact: true }).first().click();
  await appShot("02-checkin");
} catch (e) {
  console.log("checkin nav failed", e.message);
}

// Safety → risk result (default HF scenario)
try {
  await page.getByRole("button", { name: "Safety", exact: true }).first().click();
  await appShot("03-result");
} catch (e) {
  console.log("result nav failed", e.message);
}

// from result → trend timeline
try {
  await page.getByRole("button", { name: /View trend timeline/i }).first().click();
  await appShot("04-timeline");
} catch (e) {
  console.log("timeline nav failed", e.message);
}

// Doctor summary via nav
try {
  await page.getByRole("button", { name: "Doctor summary", exact: true }).first().click();
  await appShot("05-doctor");
} catch (e) {
  console.log("doctor nav failed", e.message);
}

// Validation via Pitch mode → Suspicious BP reading
try {
  await page.getByRole("button", { name: /Pitch mode/i }).first().click();
  await wait(500);
  await page.getByText("Suspicious BP reading").first().click();
  await appShot("06-validation");
} catch (e) {
  console.log("validation nav failed", e.message);
}

await browser.close();
console.log("DONE ->", outDir);
