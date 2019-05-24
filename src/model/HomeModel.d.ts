import KeithProps from "./KeithProps";
import KeithState from "./KeithState";
import LinkBean from "./LinkBean";

export class HomeState extends KeithState {
  loading: boolean;
  links?: LinkBean[];
}

export class HomeProps extends KeithProps {}
