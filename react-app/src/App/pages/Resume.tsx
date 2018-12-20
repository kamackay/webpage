import * as $ from "jquery";
import * as React from "react";
import * as Spinner from "react-spinkit";
import { AboutData } from "src/model/AboutModel";
import { ContactData } from "src/model/ContactModel";
import { FooterData } from "src/model/FooterModel";
import { HeaderData } from 'src/model/HeaderModel';
import { PortfolioData } from "src/model/PortfolioProps";
import { ResumeData } from "src/model/ResumeData";
import ResumeState from "src/model/ResumeState";
import "../../bootstrap.min.css";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import KeithComponent from "../components/KeithComponent";
import Portfolio from "../components/Portfolio";
import ResumeComponent from "../components/ResumeComponent.jsx";
import Testimonials from "../components/Testimonials.jsx";
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

class Resume extends KeithComponent<string[], ResumeState> {
	// Initialize the state
	constructor(props: string[]) {
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
				setTimeout(() => setState({ loading: false }), 100);
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
				<Header data={this.state.resumeData.main as HeaderData} />
				<About data={this.state.resumeData.main as AboutData} />
				<ResumeComponent data={this.state.resumeData.resume} />
				<Portfolio
					data={this.state.resumeData.portfolio as PortfolioData}
				/>
				<Testimonials data={this.state.resumeData.testimonials} />
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
