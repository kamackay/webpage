import { Card, CardHeader, Typography } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { HomeProps, HomeState } from "src/model/HomeModel";
import LinkBean from "src/model/LinkBean";
import "../../bootstrap.min.css";
import LoadingComponent from "../components/LoadingComponent";
import "./Home.css";

class Home extends LoadingComponent<HomeProps, HomeState> {
	constructor(p: HomeProps) {
		super(p);
		this.state = {
			loading: true
		};
		const setState = this.setState.bind(this);
		this.fetchData((data: LinkBean[]) => {
			setState({ ...this.state, links: data });
		});
	}

	public renderPostLoad() {
		const { links } = this.state;

		if (!links) {
			return this.loadingElement;
		}

		return (
			<div
				className="App transparent"
				style={{
					borderRadius: 15,
					margin: 20
				}}
			>
				<Typography component="h2" variant="h1" gutterBottom={true}>
					Welcome!
				</Typography>
				<hr />

				<Typography component="h2" variant="h3" gutterBottom={true}>
					Here are some of the projects available
				</Typography>
				{links!.map(this.generateLink)}
			</div>
		);
	}

	protected getLoadTime(): number {
		return 1000;
	}

	private generateLink(link: LinkBean) {
		return (
			<div
				key={link.name}
				style={{
					textAlign: "center",
					display: "inline-block",
					float: "left",
					margin: 10
				}}
			>
				<Link to={link.url}>
					<Card
						className="card-link"
						style={{ padding: 15, maxWidth: 400 }}
					>
						<CardHeader
							title={link.name}
							subheader={link.subheader}
						/>
						<img
							style={{ height: 150 }}
							src={link.img}
							title={`${link.name} Image`}
						/>
					</Card>
				</Link>
			</div>
		);
	}

	private fetchData(callback: (data: LinkBean[]) => void) {
		const log = this.log.bind(this);
		$.ajax({
			url: "/homeData.json",
			dataType: "json",
			cache: false,
			success: callback,
			error(xhr, status, err) {
				log(err);
				alert(err);
			}
		});
	}
}
export default Home;