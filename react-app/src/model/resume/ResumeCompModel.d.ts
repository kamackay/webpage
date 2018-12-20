import KeithState from "../KeithState";
import KeithProps from "../KeithProps";
import Education from "./Education";
import Work from "./Work";

declare class ResumeCompProps extends KeithProps {
	data: ResumeCompData;
}

declare class ResumeCompData {
	skillMessage: string;
	education: Education[];
	work: Work[];
	skills: Skill[];
}

declare class ResumeCompState extends KeithState {
	skillMessage: string;
	education: Education[];
	work: Work[];
	skills: Skill[];
}

declare class Skill {
	name: string;
	level: number;
	img: string;
}

export { ResumeCompProps, ResumeCompState, ResumeCompData, Skill };
