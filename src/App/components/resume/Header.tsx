import * as React from "react";
import * as Scroll from "react-scroll";
import getArticleFor from "src/lib/IndefiniteArticle";
import { HeaderProps, HeaderState } from "src/model/resume/HeaderModel";
import KeithComponent from "./KeithComponent";

class Header extends KeithComponent<HeaderProps, HeaderState> {
	constructor(props: HeaderProps) {
		super(props);
		this.state = {
			name: props.data.name,
			occupation: props.data.occupation,
			description: props.data.description,
			address: props.data.address,
			social: props.data.social
		};
	}

	public render() {
		const { name, occupation, description, address, social } = this.state;

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
			<header id="home">
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
						top: "100px"
					}}
				>
					<div className="banner-text header-cont-div">
						<h1 className="responsive-headline">I'm {name}.</h1>
						<h3>
							I'm {getArticleFor(address.city)} {address.city},{" "}
							{address.state} based <span>{occupation}</span>.{" "}
							{description}.
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

export default Header;
