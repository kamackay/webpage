import { Card, CardContent, Typography } from "@material-ui/core";
import * as React from "react";
import ResumeState from "src/model/ResumeState";

const styles = {
	card: {
		minWidth: 275,
		width: "fit-content",
	},
	title: {
		fontSize: 14
	}
};

class Resume extends React.Component<any, ResumeState> {
	// Initialize the state
	constructor(props: string[]) {
		super(props);
		this.state = {
			holidays: []
		};
	}

	public render() {
		return (
			<div className="container">
				<Card style={styles.card}>
					<CardContent>
						<Typography variant="h1" style={styles.title}>Resume</Typography>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default Resume;
