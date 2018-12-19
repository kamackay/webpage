import React, { Component } from "react";

class Footer extends Component {
	render() {
		if (this.props.data) {
			var networks = this.props.data.social.map(network => {
				return (
					<li key={network.name}>
						<a href={network.url}>
							<i className={network.className} />
						</a>
					</li>
				);
			});
		}

		return (
			<footer>
				<div className="row">
					<div className="twelve columns">
						<ul className="social-links">{networks}</ul>

						<ul className="copyright">
							<li>
								Thanks to{" "}
								<a href="http://www.timbakerdev.com/">
									Tim Baker
								</a>{" "}
								for the template to this webpage!
							</li>
							<li>
								Design by{" "}
								<a
									title="Styleshout"
									href="http://www.styleshout.com/"
								>
									Styleshout
								</a>
							</li>
						</ul>
					</div>
					<div id="go-top">
						<a
							className="smoothscroll"
							title="Back to Top"
							href="#home"
						>
							<i className="icon-up-open" />
						</a>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;