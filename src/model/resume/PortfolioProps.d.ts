import KeithProps from "../KeithProps";

export class Project {
  image: string;
  url: string;
  title: string;
  description: string;
}

export class PortfolioData {
  projects: Project[];
}

export default class PortfolioProps extends KeithProps {
  data: PortfolioData;
}
