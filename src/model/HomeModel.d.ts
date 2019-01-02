import KeithState from "./KeithState";
import KeithProps from "./KeithProps";
import LinkBean from "./LinkBean";

declare class HomeState extends KeithState {
	loading: boolean;
	links?: LinkBean[];
}

declare class HomeProps extends KeithProps {}

export { HomeState, HomeProps };
