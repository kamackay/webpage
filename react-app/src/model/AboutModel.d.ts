import KeithProps from "./KeithProps";
import KeithState from "./KeithState";
import Address from "./Address";

declare class AboutData {
	name: string;
	image: string;
	bio: string;
	address: Address;
	phone: string;
	email: string;
	resumeDownload: string;
}

declare class AboutProps extends KeithProps {
	data: AboutData;
}
declare class AboutState extends KeithState {
	name: string;
	profilePic: string;
	bio: string;
	address: Address;
	phone: string;
	email: string;
	resumeDownload: string;
}

export { AboutProps, AboutState, AboutData };
