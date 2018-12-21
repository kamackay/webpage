import { Button, IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";
import { Element } from "react-scroll";
import { ContactProps, ContactState } from "src/model/resume/ContactModel";
import KeithComponent from "./KeithComponent";

let setState: (state: ContactState) => void;

class Contact extends KeithComponent<ContactProps, ContactState> {
	constructor(props: ContactProps) {
		super(props);
		this.state = {
			snackbarOpen: false,
			name: props.data.name,
			address: props.data.address,
			phone: props.data.phone,
			email: props.data.email,
			message: props.data.message
		};
		setState = this.setState.bind(this);
	}

	public render() {
		const { name, message, address, phone, email } = this.state;
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
											size={35}
											id="contactName"
											name="contactName"
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
											size={35}
											id="contactEmail"
											name="contactEmail"
										/>
									</div>

									<div>
										<label htmlFor="contactSubject">
											Subject
										</label>
										<input
											type="text"
											defaultValue=""
											size={35}
											id="contactSubject"
											name="contactSubject"
										/>
									</div>

									<div>
										<label htmlFor="contactMessage">
											Message{" "}
											<span className="required">*</span>
										</label>
										<textarea
											cols={50}
											rows={15}
											id="contactMessage"
											name="contactMessage"
										/>
									</div>

									<div>
										<Button
											type="button"
											variant="contained"
											color="primary"
											onClick={this.handleClick}
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
									{address.street} <br />
									{address.city}, {address.state}{" "}
									{address.zip}
									<br />
									<span>{phone}</span>
									<br />
									<a href={`mailto:${email}`}>{email}</a>
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

	private handleClick() {
		setState({ ...this.state, snackbarOpen: true });
	}

	private handleClose(event: React.MouseEvent<HTMLElement>) {
		setState({ ...this.state, snackbarOpen: false });
	}
}

export default Contact;
