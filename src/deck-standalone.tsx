import React from "react";
import ReactDOM from "react-dom/client";
// Self-hosted Inter — inlined into the single-file build (offline-proof).
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import { PitchDeck } from "@/components/pitch/PitchDeck";
import "./index.css";

// Flag so the deck hides controls that don't make sense in the exported file.
declare global {
  interface Window {
    __CS_STANDALONE__?: boolean;
  }
}
window.__CS_STANDALONE__ = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PitchDeck />
  </React.StrictMode>
);
