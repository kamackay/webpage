import * as React from "react";
import { Element } from "react-scroll";
import { AboutProps, AboutState } from "src/model/resume/AboutModel";
import KeithComponent from "../KeithComponent";

export default class About extends KeithComponent<AboutProps, AboutState> {
  constructor(props: AboutProps) {
    super(props);
    if (this.props.data) {
      this.state = {
        name: this.props.data.name,
        profilePic: "images/" + this.props.data.image,
        bio: this.props.data.bio,
        address: {
          street: this.props.data.address.street,
          city: this.props.data.address.city,
          state: this.props.data.address.state,
          zip: this.props.data.address.zip
        },
        phone: this.props.data.phone,
        email: this.props.data.email,
        resumeDownload: this.props.data.resumeDownload
      };
    }
  }

  public render() {
    const { profilePic, bio, address, phone, email } = this.state;
    return (
      <div>
        <Element name="about" />
        <section id="about">
          <div className="row">
            <div className="three columns">
              <img
                className="profile-pic"
                src={profilePic}
                alt="Keith MacKay Profile Pic"
              />
            </div>
            <div className="nine columns main-col">
              <h2>About Me</h2>

              <p style={{ fontSize: "14px" }}>{bio}</p>
              <div className="row">
                <div className="columns contact-details">
                  <h2>Contact Details</h2>
                  <p className="address">
                    <span>{name}</span>
                    <br />
                    <span>
                      {address.street}
                      <br />
                      {address.city} {address.state}, {address.zip}
                    </span>
                    <br />
                    <span>{phone}</span>
                    <br />
                    <a href={`mailto:${email}`}>{email}</a>
                  </p>
                </div>
                {/* <div className="columns download">
                  <p>
                    <a href={resumeDownload} className="button">
                      <i className="fa fa-download" />
                      Download Resume
                    </a>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
