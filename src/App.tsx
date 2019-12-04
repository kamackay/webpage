import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import asyncComponent from "./App/components/asyncComponent";
import FourOhFourPage from "./App/pages/404";
import D3Page from "./App/pages/D3Page";
import GiftIdeaPage from "./App/pages/GiftIdeasPage";
import Home from "./App/pages/Home";
import JSONFormatter from "./App/pages/JSONFormatter";
import NewsPage from "./App/pages/NewsPage";
import QRPage from "./App/pages/QRPage";
import RayTracer from "./App/pages/RayTracer";
import Resume from "./App/pages/Resume";
import WindowsUpdate from "./App/pages/WindowsUpdate";
import Tracker from "./utils/Tracker";

// const AsyncNewsPage = asyncComponent(() => import("./App/pages/NewsPage"));
// const AsyncResumePage = asyncComponent(() => import("./App/pages/Resume"));
// const AsyncJsonPage = asyncComponent(() => import("./App/pages/JSONFormatter"));
// const AsyncQrPage = asyncComponent(() => import("./App/pages/QRPage"));
// const AsyncGiftPage = asyncComponent(() => import("./App/pages/GiftIdeasPage"));
const TestPage = asyncComponent(() => import("./App/pages/TestPage"));

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
          <Route path="/resume" component={Resume} />
          <Route path="/json" component={JSONFormatter} />
          <Route path="/d3" component={D3Page} />
          <Route path="/qr" component={QRPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/gift-ideas" component={GiftIdeaPage} />
          <Route path="/rayTracer" component={RayTracer} />
          <Route path="/update/windows" component={WindowsUpdate} />
          <Route path="/test" component={TestPage} />

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
