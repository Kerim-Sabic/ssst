import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";

/**
 * Builds the pitch deck as ONE self-contained HTML file (JS, CSS and fonts
 * all inlined) so it can be downloaded and opened offline — with every
 * animation and interaction intact. Output: public/caresignal-pitchdeck.html
 * (which the main build then copies into dist/ for the in-app download link).
 */
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  // we emit a single file directly into public/ — no static assets to copy
  publicDir: false,
  build: {
    outDir: "public",
    emptyOutDir: false,
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 100_000,
    rollupOptions: {
      input: path.resolve(__dirname, "caresignal-pitchdeck.html"),
    },
  },
});
