import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

try {
  const element = document.getElementById("static-loading")!;
  element.parentElement!.removeChild(element);
  (window as any).jsLoaded = true;
} catch (err) {
  // No-op
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
