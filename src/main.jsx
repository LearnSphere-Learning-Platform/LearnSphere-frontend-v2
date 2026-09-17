import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// NOTE: a previous "browser zoom" handler here set the root font-size to
// 16 / window.devicePixelRatio on every resize/orientationchange. That was
// meant to detect browser zoom, but devicePixelRatio is a hardware/DPI
// signal, not a zoom signal - on real phones (DPR 2-3) it collapsed every
// rem-based size app-wide (e.g. to ~5.3px on a 3x-DPR phone), breaking
// layout on mobile instead of helping it. Removed - see the audit report.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);