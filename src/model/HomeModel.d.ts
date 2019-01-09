import KeithState from "./KeithState";
import KeithProps from "./KeithProps";
import LinkBean from "./LinkBean";

export class HomeState extends KeithState {
	loading: boolean;
	links?: LinkBean[];
}

export class HomeProps extends KeithProps {}
