import * as React from "react";
import { Element } from "react-scroll";
import PortfolioProps from "src/model/resume/PortfolioProps";
import PortfolioState from "src/model/resume/PortfolioState";
import KeithComponent from "../KeithComponent";

export default class Portfolio extends KeithComponent<
  PortfolioProps,
  PortfolioState
> {
  public render() {
    if (!this.props.data) {
      return <div />;
    }

    const projectData = this.props.data.projects.map((project, x) => {
      const projectImage = "images/portfolio/" + project.image;
      return (
        <div key={`${x}-${project.title}`} className="columns portfolio-item">
          <div className="item-wrap">
            <a href={project.url} title={project.title}>
              <img alt={project.title} src={projectImage} />
              <div className="overlay">
                <div className="portfolio-item-meta">
                  <h5>{project.title}</h5>
                  <p>{project.category}</p>
                </div>
              </div>
              <div className="link-icon">
                <i className="fa fa-link" />
              </div>
            </a>
          </div>
        </div>
      );
    });

    return (
      <div>
        <Element name="portfolio" />
        <section id="portfolio">
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>Check Out Some of My Works.</h1>

              <div
                id="portfolio-wrapper"
                className="bgrid-quarters s-bgrid-thirds cf"
              >
                {projectData}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
