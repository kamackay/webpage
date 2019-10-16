import * as React from "react";
import { Element, scroller } from "react-scroll";
import { AboutData } from "src/model/resume/AboutModel";
import { FooterData } from "src/model/resume/FooterModel";
import { HeaderData } from "src/model/resume/HeaderModel";
import { ResumeCompData } from "src/model/resume/ResumeCompModel";
import ResumeData from "src/model/resume/ResumeData";
import ResumeState from "src/model/resume/ResumeState";
import "../../bootstrap.min.css";
import About from "../components/resume/About";
import Footer from "../components/resume/Footer";
import Header from "../components/resume/Header";
import ResumeComponent from "../components/resume/ResumeComponent";
import Page from "./Page";

export default class Resume extends Page<any, ResumeState> {
  // Initialize the state
  constructor(props: any) {
    super(props);
    this.state = {
      faviconUrl: "images/resume.ico",
      title: "Keith MacKay - Resume",
      loading: true,
      resumeData: new ResumeData(),
      loadAfter: [fetch("/images/header-background.jpg")]
    };
    this.get(
      "./resumeData.json",
      ((data: ResumeData) => {
        const setState = this.setState.bind(this);
        setState({ resumeData: data });
        setTimeout(() => {
          const url = window.location.href;
          const urlId = url.substring(url.lastIndexOf("#") + 1);
          console.log(`Scroll to ${urlId}`);
          if (urlId) {
            try {
              scroller.scrollTo(urlId, {
                duration: 250,
                delay: 0,
                smooth: "easeInOutQuart"
              });
            } catch (e) {
              // NO-OP
            }
          }
        }, 2000);
      }).bind(this)
    );
  }

  public renderPostLoad() {
    const { resumeData: r } = this.state;

    return r ? (
      <div className="App">
        <Element name="home" />
        <Header data={r.main as HeaderData} />
        <About data={r.main as AboutData} />
        <ResumeComponent data={r.resume as ResumeCompData} />
        {/* <Portfolio data={r.portfolio as PortfolioData} /> */}
        {/* <Testimonials data={r.testimonials as TestimonialsData} /> */}
        {/* <Contact data={r.main as ContactData} /> */}
        <Footer data={r.main as FooterData} />
      </div>
    ) : (
      this.loadingElement
    );
  }
}
