import { chromium } from "playwright";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

const BASE = process.env.BASE || "http://localhost:5173";
const outDir = path.join(os.tmpdir(), "cs-shots");
fs.mkdirSync(outDir, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();

/* 1) live deck header (skip intro) — confirm Download button present */
const ctxA = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctxA.addInitScript(() => {
  try { sessionStorage.setItem("caresignal_deck_intro_seen", "1"); } catch {}
});
const a = await ctxA.newPage();
await a.goto(`${BASE}/pitchdeck`, { waitUntil: "networkidle" });
await wait(1500);
await a.screenshot({ path: path.join(outDir, "live-deck-header.png") });
console.log("shot live-deck-header");
await ctxA.close();

/* 2) the downloaded standalone file via file:// — confirm it plays the deck */
const fileUrl = pathToFileURL(path.resolve("public/caresignal-pitchdeck.html")).href;
const ctxB = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const b = await ctxB.newPage();
const errors = [];
b.on("pageerror", (e) => errors.push(e.message));
await b.goto(fileUrl, { waitUntil: "load" });
await wait(2400); // let the intro play + slide 1 settle
await b.screenshot({ path: path.join(outDir, "standalone-01.png") });
console.log("shot standalone-01");
// step a couple builds to confirm interactivity works offline
await b.keyboard.press("ArrowRight");
await wait(1600);
await b.keyboard.press("ArrowRight");
await wait(1600);
await b.screenshot({ path: path.join(outDir, "standalone-02.png") });
console.log("shot standalone-02 (hash:", await b.evaluate(() => location.hash), ")");
console.log("standalone page errors:", errors.length ? errors : "none");
await ctxB.close();

await browser.close();
console.log("DONE ->", outDir);
