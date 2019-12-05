import JsObject from "../JsObject";
import { ResumeCompData } from "./ResumeCompModel";

export default class ResumeData {
  public main?: JsObject;
  public resume?: ResumeCompData;
  public portfolio?: JsObject;
  public testimonials?: JsObject;
}
