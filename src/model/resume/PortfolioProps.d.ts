import KeithProps from "../KeithProps";
import JsObject from "../JsObject";

declare class Project {
	image: string;
	url: string;
	title: string;
	category: string;
}

declare class PortfolioData {
	projects: Project[];
}

declare class PortfolioProps extends KeithProps {
	data: PortfolioData;
}

export default PortfolioProps;

export { PortfolioData, Project };
