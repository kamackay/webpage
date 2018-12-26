import { Button, FormControlLabel, Switch, TextField } from "@material-ui/core";
import * as d3 from "d3";
import * as React from "react";
import { D3Props, D3State } from "src/model/d3/D3Model";
import Point from "src/model/Point";
import Optional from "typescript-optional";
import "../../bootstrap.min.css";
import LoadingComponent from "../components/LoadingComponent";
import "./D3Page.css";

const classes = {
	formBar: {
		paddingRight: 5,
		paddingLeft: 5
	}
};

class D3Page extends LoadingComponent<D3Props, D3State> {
	constructor(p: D3Props) {
		super(p);
		this.state = {
			faviconUrl: "images/d3.png",
			circleSize: 10,
			loading: true,
			running: true,
			updateInterval: 1000 / 60,
			moveDelta: 0.02,
			keepPath: false
		};

		this.log = this.log.bind(this);
		this.pause = this.pause.bind(this);
		this.setState = this.setState.bind(this);
		this.stepTo = this.stepTo.bind(this);
		this.speedChange = this.speedChange.bind(this);
		this.mouseMove = this.mouseMove.bind(this);

		setInterval(() => {
			if (this.state.running) {
				this.stepTo(this.state.lastClick);
			}
		}, this.state.updateInterval);
	}

	public onLoad() {
		document.addEventListener("mousemove", this.mouseMove);
	}

	public componentWillUnmount() {
		document.removeEventListener("mousemove", this.mouseMove);
	}

	public renderPostLoad() {
		const { currentLocation, keepPath, circleSize } = this.state;

		if (currentLocation) {
			if (!keepPath) {
				d3.select("svg")
					.select("circle")
					.remove();
			}

			d3.select("svg")
				.append("circle")
				.attr("r", 5)
				.attr("cx", currentLocation.x - circleSize / 2)
				.attr("cy", currentLocation.y - circleSize / 2)
				.attr("r", circleSize)
				.attr("fill", "red");
		}
		return (
			<div>
				<svg
					style={{ width: "500vw", height: "500vh", cursor: "none" }}
				/>
				<span
					style={{
						position: "fixed",
						right: 10,
						bottom: 10,
						cursor: "auto"
					}}
				>
					<form
						style={{
							background: "rgba(128, 128, 128, .5)",
							borderRadius: 15,
							padding: 5,
							paddingLeft: 15,
							paddingRight: 15,
						}}
					>
						<Button
							variant="outlined"
							color="secondary"
							style={classes.formBar}
							onClick={this.clearPath}
						>
							Clear Path
						</Button>
						<FormControlLabel
							style={classes.formBar}
							control={
								<Switch
									checked={this.state.keepPath}
									value="keepPath"
									onClick={() =>
										this.setState({
											...this.state,
											keepPath: !this.state.keepPath
										})
									}
								/>
							}
							label="Keep Path"
						/>
						<TextField
							variant="outlined"
							label="Speed"
							value={this.state.moveDelta * 1000}
							style={{
								...classes.formBar,
								maxWidth: 80
							}}
							onChange={this.speedChange}
							type="number"
							InputProps={{
								min: "0",
								max: "100",
								step: "1",
								style: { fontSize: 15 }
							}}
							InputLabelProps={{
								shrink: true,
								style: { fontSize: 12 }
							}}
							margin="normal"
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={this.pause}
						>
							{this.state.running ? "Pause" : "Play"}
						</Button>
					</form>
				</span>
			</div>
		);
	}

	protected getLoadTime(): number {
		return 1000;
	}

	private speedChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const { value } = event.target;
		this.setState({ ...this.state, moveDelta: parseInt(value, 10) / 1000 });
	}

	private stepTo(loc?: Point) {
		Optional.ofNullable(loc).ifPresent(location => {
			Optional.ofNullable(this.state.currentLocation).ifPresentOrElse(
				current => {
					const vector = [
						current.x - location.x,
						current.y - location.y
					];
					const min = (x: number): number =>
						Math.abs(x) <= 1 ? x : x * this.state.moveDelta;
					this.setState({
						...this.state,
						currentLocation: {
							x: current.x - min(vector[0]),
							y: current.y - min(vector[1])
						}
					});
				},
				() => {
					this.setState({ ...this.state, currentLocation: location });
				}
			);
		});
	}

	private pause() {
		this.setState({ ...this.state, running: !this.state.running });
	}

	private clearPath() {
		d3.select("svg")
			.selectAll("circle")
			.remove();
	}

	private mouseMove(e: MouseEvent): any {
		this.setState({ ...this.state, lastClick: { x: e.pageX, y: e.pageY } });
	}
}
export default D3Page;
