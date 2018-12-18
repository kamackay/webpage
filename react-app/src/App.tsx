import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Holidays from './App/pages/Holidays';
import Home from "./App/pages/Home";
import Resume from './App/pages/Resume';

class App extends React.Component {
	public render() {
		const AppObject = () => (
			<div>
				<Switch>
					<Route exact={true} path="/" component={Home} />
					<Route path='/holidays' component={Holidays}/>
					<Route path='/resume' component={Resume}/>
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
