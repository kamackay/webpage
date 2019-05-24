import * as React from "react";
import { Link } from "react-scroll";
import { FooterProps, FooterState } from "src/model/resume/FooterModel";
import KeithComponent from "../KeithComponent";

export default class Footer extends KeithComponent<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
    this.state = {
      social: props.data.social
    };
  }

  public render() {
    const networks = this.state.social.map(network => {
      return (
        <li key={network.name}>
          <a href={network.url}>
            <i className={network.className} />
          </a>
        </li>
      );
    });

    return (
      <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="social-links">{networks}</ul>

            <ul className="copyright">
              <li>
                Thanks to <a href="http://www.timbakerdev.com/">Tim Baker</a>{" "}
                for the template to this webpage!
              </li>
              <li>
                Design by{" "}
                <a title="Styleshout" href="http://www.styleshout.com/">
                  Styleshout
                </a>
              </li>
            </ul>
          </div>
          <div id="go-top">
            <Link
              className="smoothscroll"
              title="Back To Top"
              to="home"
              smooth={true}
              style={{ cursor: "pointer" }}
            >
              <i className="icon-up-open" />
            </Link>
          </div>
        </div>
      </footer>
    );
  }
}
