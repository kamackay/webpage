import KeithState from "../KeithState";
import KeithProps from "../KeithProps";
import Social from "./Social";

export class FooterProps extends KeithProps {
  data: FooterData;
}

export class FooterData {
  social: Social[];
}

export class FooterState extends KeithState {
  social: Social[];
}
