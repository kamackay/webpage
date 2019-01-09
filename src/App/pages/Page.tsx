import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import LoadingComponent from "../components/LoadingComponent";

export default abstract class Page<
	P extends LoadingProps,
	S extends LoadingState
> extends LoadingComponent<P, S> {
	public componentDidMount() {
		super.componentDidMount();
		window.addEventListener("resize", this.resize);
	}

	public componentWillUpdate() {
		window.removeEventListener("resize", this.resize);
	}

	protected resize(): void {
		// NO-OP
	}

	protected get(url: string, callback: (data: any) => void): any {
		return $.ajax({
			url,
			dataType: "json",
			cache: false,
			success: callback
		});
	}
}
