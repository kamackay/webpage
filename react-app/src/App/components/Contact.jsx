import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Element } from "react-scroll";
import { Snackbar, Button, IconButton } from "@material-ui/core";

const styles = theme => ({
	close: {
		padding: theme.spacing.unit / 2
	}
});
let setState;

class Contact extends Component {
	constructor(props) {
		super(props);
		setState = this.setState.bind(this);
	}
	state = {
		snackbarOpen: false
	};

	handleClick() {
		this.setState({ snackbarOpen: true });
	}

	handleClose(event, reason) {
		if (reason === "clickaway") {
			return;
		}

		setState({ snackbarOpen: false });
	}

	render() {
		if (this.props.data) {
			var name = this.props.data.name;
			var street = this.props.data.address.street;
			var city = this.props.data.address.city;
			var state = this.props.data.address.state;
			var zip = this.props.data.address.zip;
			var phone = this.props.data.phone;
			var email = this.props.data.email;
			var message = this.props.data.contactmessage;
		}

		return (
			<div>
				<Element name="contact" />
				<section id="contact">
					<div className="row section-head">
						<div className="two columns header-col">
							<h1>
								<span>Get In Touch!</span>
							</h1>
						</div>

						<div className="ten columns">
							<p className="lead">{message}</p>
						</div>
					</div>

					<div className="row">
						<div className="eight columns">
							<form action="" id="contactForm" name="contactForm">
								<fieldset>
									<div>
										<label htmlFor="contactName">
											Name{" "}
											<span className="required">*</span>
										</label>
										<input
											type="text"
											defaultValue=""
											size="35"
											id="contactName"
											name="contactName"
											onChange={this.handleChange}
										/>
									</div>

									<div>
										<label htmlFor="contactEmail">
											Email{" "}
											<span className="required">*</span>
										</label>
										<input
											type="text"
											defaultValue=""
											size="35"
											id="contactEmail"
											name="contactEmail"
											onChange={this.handleChange}
										/>
									</div>

									<div>
										<label htmlFor="contactSubject">
											Subject
										</label>
										<input
											type="text"
											defaultValue=""
											size="35"
											id="contactSubject"
											name="contactSubject"
											onChange={this.handleChange}
										/>
									</div>

									<div>
										<label htmlFor="contactMessage">
											Message{" "}
											<span className="required">*</span>
										</label>
										<textarea
											cols="50"
											rows="15"
											id="contactMessage"
											name="contactMessage"
										/>
									</div>

									<div>
										<Button
											type="button"
											variant="contained"
											color="primary"
											onClick={e => {
												e.stopPropagation();
												this.handleClick();
											}}
										>
											Submit
										</Button>
										<span id="image-loader">
											<img
												alt=""
												src="images/loader.gif"
											/>
										</span>
									</div>
								</fieldset>
							</form>

							<div id="message-warning"> Error boy</div>
							<div id="message-success">
								<i className="fa fa-check" />
								Your message was sent, thank you!
								<br />
							</div>
						</div>

						<aside className="four columns footer-widgets">
							<div className="widget widget_contact">
								<h4>Address and Phone</h4>
								<p className="address">
									{name}
									<br />
									{street} <br />
									{city}, {state} {zip}
									<br />
									<span>{phone}</span>
								</p>
							</div>

							<div className="widget widget_tweets">
								<h4 className="widget-title">Latest Tweets</h4>
								<ul id="twitter">
									<li>
										<span>
											This is Photoshop's version of Lorem
											Ipsum. Proin gravida nibh vel velit
											auctor aliquet. Aenean sollicitudin,
											lorem quis bibendum auctor, nisi
											elit consequat ipsum
											<a href="#">
												http://t.co/CGIrdxIlI3
											</a>
										</span>
										<b>
											<a href="#">2 Days Ago</a>
										</b>
									</li>
									<li>
										<span>
											Sed ut perspiciatis unde omnis iste
											natus error sit voluptatem
											accusantium doloremque laudantium,
											totam rem aperiam, eaque ipsa quae
											ab illo inventore veritatis et quasi
											<a href="#">
												http://t.co/CGIrdxIlI3
											</a>
										</span>
										<b>
											<a href="#">3 Days Ago</a>
										</b>
									</li>
								</ul>
							</div>
						</aside>
					</div>
					<Snackbar
						anchorOrigin={{
							horizontal: "left",
							vertical: "bottom"
						}}
						open={this.state.snackbarOpen}
						autoHideDuration={6000}
						onClose={this.handleClose}
						ContentProps={{
							"aria-describedby": "message-id"
						}}
						message={
							<span id="message-id">
								Feature not currently working
							</span>
						}
						action={[
							<IconButton
								key="close"
								aria-label="Close"
								color="inherit"
								style={{}}
								onClick={this.handleClose}
							>
								<CloseIcon />
							</IconButton>
						]}
					/>
				</section>
			</div>
		);
	}
}

export default Contact;
