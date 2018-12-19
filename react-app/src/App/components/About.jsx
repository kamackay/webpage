import React, { Component } from "react";
import { Element } from "react-scroll";

class About extends Component {
	render() {
		if (this.props.data) {
			var name = this.props.data.name;
			var profilepic = "images/" + this.props.data.image;
			var bio = this.props.data.bio;
			var street = this.props.data.address.street;
			var city = this.props.data.address.city;
			var state = this.props.data.address.state;
			var zip = this.props.data.address.zip;
			var phone = this.props.data.phone;
			var email = this.props.data.email;
			var resumeDownload = this.props.data.resumedownload;
		}

		return (
			<div>
				<Element name="about" />
				<section id="about">
					<div className="row">
						<div className="three columns">
							<img
								className="profile-pic"
								src={profilepic}
								alt="Tim Baker Profile Pic"
							/>
						</div>
						<div className="nine columns main-col">
							<h2>About Me</h2>

							<p style={{ fontSize: "12px" }}>{bio}</p>
							<div className="row">
								<div className="columns contact-details">
									<h2>Contact Details</h2>
									<p className="address">
										<span>{name}</span>
										<br />
										<span>
											{street}
											<br />
											{city} {state}, {zip}
										</span>
										<br />
										<span>{phone}</span>
										<br />
										<a href={`mailto:${email}`}>{email}</a>
									</p>
								</div>
								<div className="columns download">
									<p>
										<a
											href={resumeDownload}
											className="button"
										>
											<i className="fa fa-download" />
											Download Resume
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default About;
