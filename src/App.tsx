import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import asyncComponent from "./App/components/asyncComponent";
import RayTracer from "./App/pages/RayTracer";
import WindowsUpdate from "./App/pages/WindowsUpdate";
import Tracker from "./utils/Tracker";

const JsonPage = asyncComponent(() => import("./App/pages/JSONFormatter"));
const GiftIdeaPage = asyncComponent(() => import("./App/pages/GiftIdeasPage"));
const FourOhFourPage = asyncComponent(() => import("./App/pages/404"));
const NewsPage = asyncComponent(() => import("./App/pages/NewsPage"));
const TestPage = asyncComponent(() => import("./App/pages/TestPage"));
const Resume = asyncComponent(() => import("./App/pages/Resume"));
const QrPage = asyncComponent(() => import("./App/pages/QRPage"));
const D3Page = asyncComponent(() => import("./App/pages/D3Page"));
const Home = asyncComponent(() => import("./App/pages/Home"));

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
              return <Redirect to="/home" />;
            }}
          />
          <Route path="/home" component={Home} />
          <Route path="/index.html" component={Home} />
          <Route path="/resume" component={Resume} />
          <Route path="/json" component={JsonPage} />
          <Route path="/d3" component={D3Page} />
          <Route path="/qr" component={QrPage} />
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
