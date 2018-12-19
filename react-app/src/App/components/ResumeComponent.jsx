import React, { Component } from "react";
import { Element } from "react-scroll";

const percentColors = [
	{ pct: 0.0, color: { r: 0xaa, g: 0x00, b: 0 } },
	{ pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
	{ pct: 1.0, color: { r: 0x00, g: 0xff, b: 0x00 } }
];

const bullet = "•";

class ResumeComponent extends Component {
	getSkillImage(skill, size) {
		size = size || "25px";
		if (skill.img) {
			return (
				<img style={{ height: size, width: size }} src={skill.img} />
			);
		}
		return null;
	}

	getColorForPercentage(pct) {
		for (var i = 1; i < percentColors.length - 1; i++) {
			if (pct < percentColors[i].pct) {
				break;
			}
		}
		var lower = percentColors[i - 1];
		var upper = percentColors[i];
		var range = upper.pct - lower.pct;
		var rangePct = (pct - lower.pct) / range;
		var pctLower = 1 - rangePct;
		var pctUpper = rangePct;
		var color = {
			b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
			g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
			r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper)
		};
		return `rgba(${[color.r, color.g, color.b].join(",")},.85)`;
		// or output as hex if preferred
	}

	percentStringToNumber(str) {
		return parseInt(str, 10) / 100;
	}

	render() {
		let skillsData;
		let skillMessage;
		let workData;
		let educationData;

		if (this.props.data) {
			skillMessage = this.props.data.skillmessage;
			educationData = this.props.data.education.map(education => {
				return (
					<div key={education.school}>
						<h3>{education.school}</h3>
						<p className="info">
							{education.degree} <span>&bull;</span>
							<em className="date">{education.graduated}</em>
						</p>
						<p>{education.description}</p>
						<p>
							{education.classes ? education.classes
								.map(className => (
									<span key={"class-" + className}>
										{className}
									</span>
								))
								.reduce((prev, curr) => [
									prev,
									` ${bullet} `,
									curr
								]): null}
						</p>
					</div>
				);
			});
			workData = this.props.data.work.map(work => {
				return (
					<div key={"company-" + work.company + Math.random()}>
						<h3>{work.company}</h3>
						<p className="info">
							{work.title}
							<span>&bull;</span>{" "}
							<em className="date">{work.years}</em>
						</p>
						<p>{work.description}</p>
					</div>
				);
			});

			skillsData = this.props.data.skills.map(skill => {
				const className = `bar-expand ${skill.name.toLowerCase()}`;
				return (
					<li key={skill.name}>
						<span
							style={{
								background: this.getColorForPercentage(
									this.percentStringToNumber(skill.level)
								),
								display: "inline",
								width: skill.level
							}}
							className={className}
						/>
						<em>
							{this.getSkillImage(skill)}&nbsp;{skill.name}
						</em>
					</li>
				);
			});
		}

		return (
			<div>
				<Element name="resume" />
				<section id="resume">
					<div className="row education">
						<div className="three columns header-col">
							<h1>
								<span>Education</span>
							</h1>
						</div>

						<div className="nine columns main-col">
							<div className="row item">
								<div className="twelve columns">
									{educationData}
								</div>
							</div>
						</div>
					</div>

					<div className="row work">
						<div className="three columns header-col">
							<h1>
								<span>Work</span>
							</h1>
						</div>

						<div className="nine columns main-col">{workData}</div>
					</div>

					<div className="row skill">
						<div className="three columns header-col">
							<h1>
								<span>Skills</span>
							</h1>
						</div>

						<div className="nine columns main-col">
							<p>{skillMessage}</p>

							<div className="bars">
								<ul className="skills">{skillsData}</ul>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default ResumeComponent;
