import * as React from "react";
import * as Scroll from "react-scroll";
import { getArticleFor } from "src/lib/IndefiniteArticle";
import { HeaderProps, HeaderState } from "src/model/resume/HeaderModel";
import KeithComponent from "../KeithComponent";
import TypingComponent from "../TypingComponent";

export default class Header extends KeithComponent<
  HeaderProps,
  Partial<HeaderState>
> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {};
  }

  public render() {
    if (!this.props.data) {
      return <div />;
    }

    const { name, occupation, description, address, social } = this.props.data;

    const networks = social.map(network => {
      return (
        <li key={network.name}>
          <a href={network.url}>
            <i className={network.className} />
          </a>
        </li>
      );
    });

    return (
      <header
        id="home"
        style={{
          background: `#161415 url(${this.props.background}) no-repeat top center`
        }}
      >
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <Scroll.Link
                className="smoothscroll"
                to="top"
                smooth={true}
                style={{ cursor: "pointer" }}
              >
                Home
              </Scroll.Link>
            </li>
            <li>
              <Scroll.Link
                className="smoothscroll"
                to="about"
                smooth={true}
                style={{ cursor: "pointer" }}
              >
                About
              </Scroll.Link>
            </li>
            <li>
              <Scroll.Link
                className="smoothscroll"
                to="resume"
                smooth={true}
                style={{ cursor: "pointer" }}
              >
                Resume
              </Scroll.Link>
            </li>
            {/* <li>
              <Scroll.Link
                className="smoothscroll"
                to="portfolio"
                smooth={true}
                style={{ cursor: "pointer" }}
              >
                Portfolio
              </Scroll.Link>
            </li> */}
            {/* <li>
              <Scroll.Link
                className="smoothscroll"
                to="testimonials"
                smooth={true}
                style={{ cursor: "pointer" }}
              >
                Testimonials
              </Scroll.Link>
            </li> */}
            {/* <li>
              <Scroll.Link
                className="smoothscroll"
                to="contact"
                smooth={true}
                style={{ cursor: "pointer" }}
              >
                Contact
              </Scroll.Link>
            </li> */}
          </ul>
        </nav>

        <div
          className="row banner"
          style={{
            left: "50px",
            right: "50px",
            position: "absolute",
            top: "100px"
          }}
        >
          <div className="banner-text header-cont-div">
            <h1 className="responsive-headline">{name}</h1>
            <h3>
              I'm {getArticleFor(address.city)} {address.city}, {address.state}{" "}
              based <span>{occupation}</span>. {description}.
            </h3>
            <h3 style={{ marginTop: 2 }}>
              Skilled with
              <span style={{ display: "inline-block" }}>
                <TypingComponent
                  items={this.props.data.skillNames}
                  font={`18px/1.9em "librebaskerville-regular", serif`}
                  color={`rgb(209, 207, 207)`}
                  delay={4}
                />
              </span>
            </h3>
            <hr />
            <ul className="social">{networks}</ul>
          </div>
        </div>

        <p className="scrolldown">
          <Scroll.Link
            className="smoothscroll"
            to="about"
            title="Explore"
            smooth={true}
            style={{ cursor: "pointer" }}
          >
            <i className="icon-down-circle" />
          </Scroll.Link>
        </p>
      </header>
    );
  }
}
