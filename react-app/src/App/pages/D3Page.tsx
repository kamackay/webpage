import { Checkbox, FormControlLabel } from "@material-ui/core";
import * as d3 from "d3";
import * as React from "react";
import { D3Props, D3State } from "src/model/d3/D3Model";
import Point from "src/model/Point";
import Optional from "typescript-optional";
import "../../bootstrap.min.css";
import LoadingComponent from "../components/LoadingComponent";
import "./Home.css";

class D3Page extends LoadingComponent<D3Props, D3State> {
	private speedRef = React.createRef<HTMLInputElement>();

	constructor(p: D3Props) {
		super(p);
		this.state = {
			faviconUrl: "images/d3.png",
			loading: true,
			running: true,
			updateInterval: 10,
			moveDelta: 0.001,
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
		const { currentLocation, keepPath } = this.state;

		if (currentLocation) {
			if (!keepPath) {
				d3.select("svg")
					.select("circle")
					.remove();
			}

			d3.select("svg")
				.append("circle")
				.attr("r", 5)
				.attr("cx", currentLocation.x)
				.attr("cy", currentLocation.y)
				.attr("fill", "red");
		}
		return (
			<div>
				<svg style={{ width: "500vw", height: "500vh" }} />
				<span style={{ position: "fixed", right: 10, bottom: 10 }}>
					<form>
						<FormControlLabel
							control={
								<Checkbox
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
						<label>
							Speed:
							<input
								type="number"
								min="1"
								max="100"
								ref={this.speedRef}
								value={this.state.moveDelta * 1000}
								onChange={this.speedChange}
							/>
						</label>
					</form>
				</span>
			</div>
		);
	}

	protected getLoadTime(): number {
		return 1000;
	}

	private speedChange() {
		const { value } = this.speedRef.current!;
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
					this.setState({
						...this.state,
						currentLocation: {
							x: current.x - vector[0] * this.state.moveDelta,
							y: current.y - vector[1] * this.state.moveDelta
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

	private mouseMove(e: MouseEvent): any {
		this.setState({ ...this.state, lastClick: { x: e.pageX, y: e.pageY } });
	}
}
export default D3Page;
