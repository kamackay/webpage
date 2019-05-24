import KeithProps from "../KeithProps";
import JsObject from "../JsObject";

export class Project {
  image: string;
  url: string;
  title: string;
  category: string;
}

export class PortfolioData {
  projects: Project[];
}

export default class PortfolioProps extends KeithProps {
  data: PortfolioData;
}
