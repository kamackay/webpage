import KeithState from "../KeithState";
import KeithProps from "../KeithProps";
import Address from "../Address";

declare class ContactState extends KeithState {
	snackbarOpen: boolean;
	name: string;
	address: Address;
	phone: string;
	email: string;
	message: string;
}
declare class ContactProps extends KeithProps {
	data: ContactData;
}

declare class ContactData {
	name: string;
	address: Address;
	phone: string;
	email: string;
	message: string;
}

export { ContactState, ContactProps, ContactData };
