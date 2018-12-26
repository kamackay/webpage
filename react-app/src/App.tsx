import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import D3Page from './App/pages/D3Page';
import Home from "./App/pages/Home";
import JSONFormatter from "./App/pages/JSONFormatter";
import Resume from "./App/pages/Resume";

class App extends React.Component {
	public render() {
		const AppObject = () => (
			<div className="transparent">
				<Switch>
					<Route exact={true} path="/" component={Home} />
					<Route path="/resume" component={Resume} />
					<Route path="/json" component={JSONFormatter} />
					<Route path="/d3" component={D3Page} />
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

export default App;
