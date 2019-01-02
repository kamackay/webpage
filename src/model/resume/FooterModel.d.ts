import KeithState from "../KeithState";
import KeithProps from "../KeithProps";
import Social from "./Social";

declare class FooterProps extends KeithProps {
	data: FooterData;
}

declare class FooterData {
	social: Social[];
}

declare class FooterState extends KeithState {
	social: Social[];
}

export { FooterProps, FooterState, FooterData };
