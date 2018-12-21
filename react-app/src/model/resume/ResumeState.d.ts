import JsObject from "../JsObject";
import { ResumeData } from "./ResumeData";
import KeithState from "../KeithState";
import { LoadingState } from "../LoadingModel";

declare class ResumeState extends LoadingState {
	loading: boolean;
	resumeData: ResumeData;
}

export default ResumeState;
