import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import FourOhFourPage from "./App/pages/404";
import D3Page from "./App/pages/D3Page";
import Home from "./App/pages/Home";
import JSONFormatter from "./App/pages/JSONFormatter";
import RayTracer from "./App/pages/RayTracer";
import Resume from "./App/pages/Resume";
import WindowsUpdate from "./App/pages/WindowsUpdate";

export default class App extends React.Component {
  public render() {
    const AppObject = () => (
      <div className="transparent">
        <Switch>
          <Route
            exact={true}
            path="/"
            render={() => <Redirect to="/resume" />}
          />
          <Route path="/home" component={Home} />
          <Route path="/resume" component={Resume} />
          <Route path="/json" component={JSONFormatter} />
          <Route path="/d3" component={D3Page} />
          <Route path="/rayTracer" component={RayTracer} />
          <Route path="/update/windows" component={WindowsUpdate} />
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
