import * as $ from "jquery";
import * as React from "react";
import { Element } from "react-scroll";
import { scroller } from "react-scroll";
import * as Spinner from "react-spinkit";
import { AboutData } from "src/model/resume/AboutModel";
import { ContactData } from "src/model/resume/ContactModel";
import { FooterData } from "src/model/resume/FooterModel";
import { HeaderData } from "src/model/resume/HeaderModel";
import { PortfolioData } from "src/model/resume/PortfolioProps";
import { ResumeCompData } from "src/model/resume/ResumeCompModel";
import { ResumeData } from "src/model/resume/ResumeData";
import ResumeState from "src/model/resume/ResumeState";
import { TestimonialsData } from "src/model/resume/TestimonialsModel";
import "../../bootstrap.min.css";
import About from "../components/resume/About";
import Contact from "../components/resume/Contact";
import Footer from "../components/resume/Footer";
import Header from "../components/resume/Header";
import KeithComponent from "../components/resume/KeithComponent";
import Portfolio from "../components/resume/Portfolio";
import ResumeComponent from "../components/resume/ResumeComponent";
import Testimonials from "../components/resume/Testimonials";
import "./Resume.css";

const styles = {
	card: {
		minWidth: 275,
		width: "fit-content"
	},
	loading: {
		padding: "100px"
	},
	loadingSpinner: {
		height: "250px",
		width: "250px"
	},
	title: {
		color: "black"
	},
	keithImg: {
		maxHeight: "250px"
	}
};

class Resume extends KeithComponent<any, ResumeState> {
	// Initialize the state
	constructor(props: any) {
		super(props);
		this.state = {
			faviconUrl: "images/resume.ico",
			title: "Keith MacKay - Resume",
			loading: true,
			resumeData: new ResumeData()
		};
	}

	public componentDidMount() {
		const setState = this.setState.bind(this);
		// Wait for all resources to be loaded
		window.addEventListener("load", () => {
			this.getResumeData((data: ResumeData) => {
				setState({ resumeData: data });
				setTimeout(() => setState({ loading: false }), 1);
				setTimeout(() => {
					const url = window.location.href;
					const urlId = url.substring(url.lastIndexOf("#") + 1);
					if (urlId) {
						try {
							scroller.scrollTo(urlId, {
								duration: 1000,
								delay: 0,
								smooth: "easeInOutQuart"
							});
						} catch (e) {
							// NO-OP
						}
					}
				}, 100);
			});
		});
	}

	public render() {
		const { loading } = this.state;

		if (loading) {
			return (
				<div className="container loading" style={styles.loading}>
					<span>
						<Spinner name="ball-scale-multiple" fadeIn="half" />
					</span>
				</div>
			);
		}

		return (
			<div className="App">
				<Element name="home" />
				<Header data={this.state.resumeData.main as HeaderData} />
				<About data={this.state.resumeData.main as AboutData} />
				<ResumeComponent
					data={this.state.resumeData.resume as ResumeCompData}
				/>
				<Portfolio
					data={this.state.resumeData.portfolio as PortfolioData}
				/>
				<Testimonials
					data={
						this.state.resumeData.testimonials as TestimonialsData
					}
				/>
				<Contact data={this.state.resumeData.main as ContactData} />
				<Footer data={this.state.resumeData.main as FooterData} />
			</div>
		);
	}

	private getResumeData(callback: (data: ResumeData) => void) {
		$.ajax({
			url: "/resumeData.json",
			dataType: "json",
			cache: false,
			success: callback,
			error(xhr, status, err) {
				// tslint:disable-next-line:no-console
				console.log(err);
				alert(err);
			}
		});
	}
}

export default Resume;
