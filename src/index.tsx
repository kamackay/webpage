import * as React from "react";
import * as ReactDOM from "react-dom";
import HttpsRedirect from "react-https-redirect";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter>
    <HttpsRedirect>
      <App />
    </HttpsRedirect>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
