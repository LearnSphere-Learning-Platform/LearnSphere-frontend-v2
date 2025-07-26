import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// Handle browser zoom level changes
const handleZoomChange = () => {
  const zoomLevel = window.devicePixelRatio;
  const root = document.documentElement;
  
  // Adjust font size and spacing based on zoom level
  if (zoomLevel !== 1) {
    root.style.fontSize = `${16 / zoomLevel}px`;
  } else {
    root.style.fontSize = '16px';
  }
};

// Listen for zoom changes
window.addEventListener('resize', handleZoomChange);
window.addEventListener('orientationchange', handleZoomChange);

// Initial call
handleZoomChange();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);