import { LoadingState } from "../LoadingModel";

declare class JSONFormatState extends LoadingState {
	value: string;
	rows: number;
	fontSize: number;
}
