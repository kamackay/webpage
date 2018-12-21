import * as React from "react";
import * as Spinner from "react-spinkit";
import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import KeithComponent from "./resume/KeithComponent";

abstract class LoadingComponent<
	P extends LoadingProps,
	S extends LoadingState
> extends KeithComponent<P, S> {

	public loadingElement = (
		<div
			className="container loading"
			style={{
				textAlign: "center"
			}}
		>
			<span
				style={{
					paddingTop: "250px",
					display: "block",
					marginLeft: "auto",
					marginRight: "auto"
				}}
			>
				<Spinner name="ball-scale-multiple" fadeIn="half" />
			</span>
		</div>
	);

	public componentDidMount() {
		const setState = this.setState.bind(this);
		const onLoad = this.onLoad.bind(this);
		window.addEventListener("load", () => {
			setTimeout(() => {
				setState({ ...this.state, loading: false });
				onLoad();
			}, 500);
		});
		setTimeout(() => {
			// If the page still hasn't rendered after 10 seconds, just go ahead and try
			setState({ ...this.state, loading: false });
		}, 10000);
	}

	public onLoad() {
		// NO-OP
	}

	public abstract renderPostLoad(): JSX.Element;

	public render() {
		const { loading } = this.state;
		if (loading) {
			return this.loadingElement;
		}

		return this.renderPostLoad();
	}
}

export default LoadingComponent;
