import * as React from "react";
import { Element } from "react-scroll";
import {
  TestimonialsProps,
  TestimonialsState
} from "src/model/resume/TestimonialsModel";
import KeithComponent from "../KeithComponent";

export default class Testimonials extends KeithComponent<
  TestimonialsProps,
  Partial<TestimonialsState>
> {
  constructor(props: TestimonialsProps) {
    super(props);
    this.state = {};
  }

  public render() {
    if (!this.props.data) {
      return <div />;
    }
    const { testimonials } = this.props.data;
    const testimonialsData = testimonials.map(testimonial => {
      return (
        <li key={testimonial.user}>
          <blockquote>
            <p>{testimonial.text}</p>
            <cite>{testimonial.user}</cite>
          </blockquote>
        </li>
      );
    });

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
                <ul className="slides testimonials-list">{testimonialsData}</ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
