import KeithProps from "./KeithProps";
import KeithState from "./KeithState";

export class LoadingState extends KeithState {
  loading: boolean;
  loadAfter?: Array<Promise<any>>;
}

export class LoadingProps extends KeithProps {}
