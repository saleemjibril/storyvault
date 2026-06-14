import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import StoryVaultAI from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div style={{ padding: 24, maxWidth: 1280, margin: "0 auto" }}>
      <StoryVaultAI />
    </div>
  </React.StrictMode>
);