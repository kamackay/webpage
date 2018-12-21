import KeithState from "./KeithState";
import KeithProps from "./KeithProps";

declare class HomeState extends KeithState {
	loading: boolean;
}

declare class HomeProps extends KeithProps {}

export { HomeState, HomeProps };
