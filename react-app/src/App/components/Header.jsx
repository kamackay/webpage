import React, { Component } from "react";
import * as Scroll from "react-scroll";

const scroll = Scroll.animateScroll;
const stopScroll = e => e.stopPropagation();

class Header extends Component {
	render() {
		if (this.props.data) {
			var name = this.props.data.name;
			var occupation = this.props.data.occupation;
			var description = this.props.data.description;
			var city = this.props.data.address.city;
			var state = this.props.data.address.state;
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
			<header id="home">
				<Scroll.Element name="home" />
				<nav id="nav-wrap">
					<a
						className="mobile-btn"
						href="#nav-wrap"
						title="Show navigation"
					>
						Show navigation
					</a>
					<a
						className="mobile-btn"
						href="#home"
						title="Hide navigation"
					>
						Hide navigation
					</a>

					<ul id="nav" className="nav">
						<li className="current">
							<Scroll.Link
								className="smoothscroll"
								to="home"
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
						<li>
							<Scroll.Link
								className="smoothscroll"
								to="portfolio"
								smooth={true}
								style={{ cursor: "pointer" }}
							>
								Portfolio
							</Scroll.Link>
						</li>
						<li>
							<Scroll.Link
								className="smoothscroll"
								to="testimonials"
								smooth={true}
								style={{ cursor: "pointer" }}
							>
								Testimonials
							</Scroll.Link>
						</li>
						<li>
							<Scroll.Link
								className="smoothscroll"
								to="contact"
								smooth={true}
								style={{ cursor: "pointer" }}
							>
								Contact
							</Scroll.Link>
						</li>
					</ul>
				</nav>

				<div
					className="row banner"
					style={{
						left: "100px",
						position: "absolute",
						top: "100px",
					}}
				>
					<div className="banner-text header-cont-div">
						<h1 className="responsive-headline">I'm {name}.</h1>
						<h3>
							I'm a {city}, {state} based{" "}
							<span>{occupation}</span>. {description}.
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
						style={{cursor: "pointer"}}
					>
						<i className="icon-down-circle" />
					</Scroll.Link>
				</p>
			</header>
		);
	}
}

export default Header;
