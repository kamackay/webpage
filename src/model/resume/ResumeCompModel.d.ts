import KeithState from "../KeithState";
import KeithProps from "../KeithProps";
import Education from "./Education";
import Work from "./Work";

export class ResumeCompProps extends KeithProps {
  data: ResumeCompData;
}

export class ResumeCompData {
  skillMessage: string;
  education: Education[];
  work: Work[];
  skills: Skill[];
}

export class ResumeCompState extends KeithState {
  skillMessage: string;
  education: Education[];
  work: Work[];
  skills: Skill[];
}

export class Skill {
  name: string;
  level: number;
  img: string;
}
