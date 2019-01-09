import KeithProps from "../KeithProps";
import KeithState from "../KeithState";
import Address from "../Address";

export class AboutData {
	name: string;
	image: string;
	bio: string;
	address: Address;
	phone: string;
	email: string;
	resumeDownload: string;
}

export class AboutProps extends KeithProps {
	data: AboutData;
}

export class AboutState extends KeithState {
	name: string;
	profilePic: string;
	bio: string;
	address: Address;
	phone: string;
	email: string;
	resumeDownload: string;
}
