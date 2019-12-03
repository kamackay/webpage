import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import FourOhFourPage from "./App/pages/404";
import D3Page from "./App/pages/D3Page";
import Home from "./App/pages/Home";
import RayTracer from "./App/pages/RayTracer";
import WindowsUpdate from "./App/pages/WindowsUpdate";
import Tracker from "./utils/Tracker";
import asyncComponent from "./App/components/asyncComponent";

const AsyncNewsPage = asyncComponent(() => import("./App/pages/NewsPage"));
const AsyncResumePage = asyncComponent(() => import("./App/pages/Resume"));
const AsyncJsonPage = asyncComponent(() => import("./App/pages/JSONFormatter"));
const AsyncQrPage = asyncComponent(() => import("./App/pages/QRPage"));

export default class App extends React.Component {
  public render() {
    const AppObject = () => (
      <div className="transparent">
        <Switch>
          <Route
            exact={true}
            path="/"
            render={() => {
              Tracker.send({
                feature: "SplashPage",
                data: { description: "User went to splash page" }
              });
              return <Redirect to="/resume" />;
            }}
          />
          <Route path="/home" component={Home} />
          <Route path="/index.html" component={Home} />
          <Route path="/resume" component={AsyncResumePage} />
          <Route path="/json" component={AsyncJsonPage} />
          <Route path="/d3" component={D3Page} />
          <Route path="/qr" component={AsyncQrPage} />
          <Route path="/news" component={AsyncNewsPage} />
          <Route path="/rayTracer" component={RayTracer} />
          <Route path="/update/windows" component={WindowsUpdate} />

          {/* Static Redirects, for using the page as a URL shortener */}
          {([
            {
              path: "offline-code",
              url: "https://www.get-offline.com/premium-referral/keithmackay"
            },
            {
              path: "dockerhub",
              url: "https://hub.docker.com/u/kamackay"
            },
            { path: "github", url: "https://github.com/kamackay" },
            {
              path: "linkedin",
              url: "https://www.linkedin.com/in/keith-mackay-047b9387/"
            }
          ] as RedirectModel[]).map(redirect => (
            <Route
              key={redirect.path}
              path={`/${redirect.path}`}
              component={() => {
                window.location.href = redirect.url;
                return null;
              }}
            />
          ))}

          <Route component={FourOhFourPage} />
        </Switch>
      </div>
    );
    return (
      <Switch>
        <AppObject />
      </Switch>
    );
  }
}
