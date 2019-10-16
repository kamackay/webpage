import * as React from "react";
import { Element } from "react-scroll";
import { AboutProps, AboutState } from "src/model/resume/AboutModel";
import KeithComponent from "../KeithComponent";
import "./About.css";

export default class About extends KeithComponent<
  AboutProps,
  Partial<AboutState>
> {
  constructor(props: AboutProps) {
    super(props);
    if (this.props.data) {
      this.state = {};
    }
  }

  public render() {
    if (!this.props.data) {
      return <div />;
    }
    const { image, bio, address, phone, email, additional } = this.props.data;
    const profilePic = `images/${image}`;
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

              <p className="bio">{bio}</p>
              <div className="row">
                <div className="columns contact-details center-text">
                  <h2>Contact Details</h2>
                  <p className="address">
                    {name ? (
                      <span>
                        {name}
                        <br />
                      </span>
                    ) : null}
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
                <div className="columns download center-text">
                  <p>{additional.message}</p>
                  <img
                    style={{ width: 200, borderRadius: "100%" }}
                    src={`images/${additional.photo}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
