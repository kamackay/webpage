import { Card, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as React from "react";
import { Link } from "react-router-dom";
import { HomeProps, HomeState } from "src/model/HomeModel";
import LinkBean from "src/model/LinkBean";
import LoadingComponent from "../components/LoadingComponent";

const links: LinkBean[] = [
	{
		name: "Resume",
		url: "./resume"
	}
];

class Home extends LoadingComponent<HomeProps, HomeState> {
	constructor(p: HomeProps) {
		super(p);
		this.state = {
			loading: true
		};
	}

	public renderPostLoad() {
		return (
			<div className="App">
				<Paper>{links.map(this.generateLink)}</Paper>
			</div>
		);
	}

	private generateLink(link: LinkBean) {
		return (
			<span key={link.name}>
				<Link to={link.url}>
					<Card style={{ padding: "15px" }}>
						<Button variant="contained" color="primary">
							{link.name}
						</Button>
					</Card>
				</Link>
			</span>
		);
	}
}
export default Home;
