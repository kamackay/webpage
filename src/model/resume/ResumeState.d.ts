import JsObject from "../JsObject";
import KeithState from "../KeithState";
import { LoadingState } from "../LoadingModel";
import ResumeData from "./ResumeData";

export default class ResumeState extends LoadingState {
  loading: boolean;
  resumeData: ResumeData;
}
