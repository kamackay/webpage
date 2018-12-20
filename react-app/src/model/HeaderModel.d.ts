import KeithState from "./KeithState";
import KeithProps from "./KeithProps";
import Social from "./Social";
import Address from "./Address";

declare class HeaderProps extends KeithProps {
	data: HeaderData;
}

declare class HeaderData {
	name: string;
	occupation: string;
	description: string;
	address: Address;
	social: Social[];
}

declare class HeaderState extends KeithState {
	name: string;
	occupation: string;
	description: string;
	address: Address;
	social: Social[];
}

export { HeaderProps, HeaderState, HeaderData };
