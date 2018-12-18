import { Typography } from "@material-ui/core";
import * as React from "react";
import ResumeState from "src/model/ResumeState";
import "../../bootstrap.min.css";
import "./Resume.css";

const styles = {
	card: {
		minWidth: 275,
		width: "fit-content"
	},
	title: {
		color: "black",
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
				<Typography variant="h2" style={styles.title}>
					Keith MacKay's Resume
				</Typography>
			</div>
		);
	}
}

export default Resume;
