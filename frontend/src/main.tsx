import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MyApp from "./App.tsx";
import "./App.css";
import { App } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <MyApp />
    </App>
  </StrictMode>
);
