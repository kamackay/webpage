import { LoadingState } from "../LoadingModel";

export default class JSONFormatState extends LoadingState {
	value: string;
	rows: number;
	fontSize: number;
}
