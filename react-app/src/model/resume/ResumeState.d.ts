import JsObject from "../JsObject";
import { ResumeData } from "./ResumeData";
import KeithState from "../KeithState";

declare class ResumeState extends KeithState {
	loading: boolean;
	resumeData: ResumeData;
}

export default ResumeState;
