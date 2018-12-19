import * as $ from 'jquery';
import * as React from "react";
import * as Spinner from "react-spinkit";
import { ResumeData } from "src/model/ResumeData";
import ResumeState from "src/model/ResumeState";
import "../../bootstrap.min.css";
import About from "../components/About.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import KeithComponent from '../components/KeithComponent';
import Portfolio from '../components/Portfolio.jsx';
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

class Resume extends KeithComponent<ResumeState> {
	// Initialize the state
	constructor(props: string[]) {
		super(props);
		this.state = {
			title: "Keith MacKay - Resume",
			loading: true,
			resumeData: new ResumeData()
		};
	}

	public componentDidMount() {
		this.getResumeData();
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
				<Header data={this.state.resumeData.main} />
				<About data={this.state.resumeData.main} />
				<ResumeComponent data={this.state.resumeData.resume} />
				<Portfolio data={this.state.resumeData.portfolio} />
				<Testimonials data={this.state.resumeData.testimonials} />
				<Contact data={this.state.resumeData.main} />
				<Footer data={this.state.resumeData.main} />
			</div>
		);
	}

	private getResumeData() {
		const setState = this.setState.bind(this);
		$.ajax({
			url: "/resumeData.json",
			dataType: "json",
			cache: false,
			success: (data: ResumeData) => {
				setState({ resumeData: data });
				setTimeout(() => setState({ loading: false }), 2500);
			},
			error(xhr, status, err) {
				// tslint:disable-next-line:no-console
				console.log(err);
				alert(err);
			}
		});
	}
}

export default Resume;
