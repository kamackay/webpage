import KeithProps from "./KeithProps";
import KeithState from "./KeithState";

declare class LoadingState extends KeithState {
	loading: boolean;
}

declare class LoadingProps extends KeithProps {}

export { LoadingProps, LoadingState };
