import Button from '@material-ui/core/Button';
import * as React from "react";
import { Link } from 'react-router-dom';

class Home extends React.Component {
	public render() {
		return (
			<div className="App">
				<h1>Project Home</h1>
				{/* Link to List.js */}
				<Link to={"./holidays"}>
					<Button variant="contained" color="primary">View All Holidays</Button>
				</Link>

				<Link to={"./resume"}>
					<Button variant="contained" color="primary">Resume</Button>
				</Link>
			</div>
		);
	}
}
export default Home;
