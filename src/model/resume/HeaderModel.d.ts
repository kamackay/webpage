import KeithState from "../KeithState";
import KeithProps from "../KeithProps";
import Social from "./Social";
import Address from "../Address";

export class HeaderProps extends KeithProps {
  data: HeaderData;
}

export class HeaderData {
  name: string;
  occupation: string;
  description: string;
  address: Address;
  social: Social[];
}

export class HeaderState extends KeithState {
  name: string;
  occupation: string;
  description: string;
  address: Address;
  social: Social[];
}
