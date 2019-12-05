import Address from "../Address";
import KeithProps from "../KeithProps";
import KeithState from "../KeithState";
import Social from "./Social";

export class HeaderProps extends KeithProps {
  data: HeaderData;
  background?: string;
}

export class HeaderData {
  name: string;
  occupation: string;
  description: string;
  address: Address;
  social: Social[];
  skillNames: string[];
}

export class HeaderState extends KeithState {
  name: string;
  occupation: string;
  description: string;
  address: Address;
  social: Social[];
}
