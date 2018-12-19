import React, { Component } from "react";
import { Element } from "react-scroll";

class Portfolio extends Component {
	render() {
		if (this.props.data) {
			var projectData = this.props.data.projects.map(projects => {
				var projectImage = "images/portfolio/" + projects.image;
				return (
					<div
						key={projects.title}
						className="columns portfolio-item"
					>
						<div className="item-wrap">
							<a href={projects.url} title={projects.title}>
								<img alt={projects.title} src={projectImage} />
								<div className="overlay">
									<div className="portfolio-item-meta">
										<h5>{projects.title}</h5>
										<p>{projects.category}</p>
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
		}

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

export default Portfolio;
