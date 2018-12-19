import React, { Component } from "react";
import { Element } from "react-scroll";

class Testimonials extends Component {
	render() {
		if (this.props.data) {
			var testimonialsData = this.props.data.testimonials.map(
				testimonials => {
					return (
						<li key={testimonials.user}>
							<blockquote>
								<p>{testimonials.text}</p>
								<cite>{testimonials.user}</cite>
							</blockquote>
						</li>
					);
				}
			);
		}

		return (
			<div>
				<Element name="testimonials" />
				<section id="testimonials">
					<div className="text-container">
						<div className="row">
							<div className="two columns header-col">
								<h1>
									<span>Client Testimonials</span>
								</h1>
							</div>
							<div className="ten columns flex-container">
								<ul className="slides testimonials-list">
									{testimonialsData}
								</ul>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Testimonials;
