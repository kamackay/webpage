import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";
import { getCurrentIp } from "./utils";
import * as device from "react-device-detect";

try {
  const element = document.getElementById("static-loading")!;
  element.parentElement!.removeChild(element);
} catch (err) {
  // No-op
}

setTimeout(() => {
  const {
    osName,
    osVersion,
    isMobile,
    mobileModel,
    browserName,
    fullBrowserVersion,
  } = device;
  getCurrentIp().then((ip) =>
    axios
      .put(`https://api.keithm.io/page/`, {
        ip,
        additional: {
          mobile: isMobile,
          os: osName,
          osVersion,
          mobileModel,
          browser: browserName,
          browserVersion: fullBrowserVersion,
        },
      })
      .catch(() => {
        // No-op
      })
  );
}, 10);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
