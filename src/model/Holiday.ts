import SimpleDate from "./SimpleDate";

export default class Holiday {
  public date?: SimpleDate;
  public link: string;
  public name: string;

  public constructor(name: string, link: string, date?: SimpleDate) {
    this.name = name;
    this.link = link;
    this.date = date;
  }
}
