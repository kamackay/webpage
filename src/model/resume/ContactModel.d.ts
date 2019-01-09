import KeithState from "../KeithState";
import KeithProps from "../KeithProps";
import Address from "../Address";

export class ContactState extends KeithState {
	snackbarOpen: boolean;
	name: string;
	address: Address;
	phone: string;
	email: string;
	message: string;
}

export class ContactProps extends KeithProps {
	data: ContactData;
}

export class ContactData {
	name: string;
	address: Address;
	phone: string;
	email: string;
	message: string;
}
