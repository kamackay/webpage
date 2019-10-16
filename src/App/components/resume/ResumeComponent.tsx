import * as React from "react";
import { Element } from "react-scroll";
import {
  ResumeCompProps,
  ResumeCompState,
  Skill
} from "src/model/resume/ResumeCompModel";
import KeithComponent from "../KeithComponent";

const percentColors = [
  { pct: 0.0, color: { r: 0xaa, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0x00 } }
];

const bullet = " • ";

export default class ResumeComponent extends KeithComponent<
  ResumeCompProps,
  Partial<ResumeCompState>
> {
  constructor(p: ResumeCompProps) {
    super(p);
    this.state = {};
  }

  public render() {
    if (!this.props.data) {
      return <div />;
    }

    const { skillMessage, education, work, skills } = this.props.data;

    const educationData = education.map(ed => {
      return (
        <div key={ed.school}>
          <h3>{ed.school}</h3>
          <p className="info">
            {ed.degree} <span>&bull;</span>
            <em className="date">{ed.graduated}</em>
          </p>
          <p style={{ fontSize: 14 }}>{ed.description}</p>
          <p style={{ fontSize: 13 }}>
            {ed.classes
              ? ed.classes
                  .map(className => (
                    <span key={"class-" + className}>{className}</span>
                  ))
                  .reduce((p, n) => (p === null ? [n] : [p, bullet, n]), null)
              : null}
          </p>
        </div>
      );
    });
    const workData = work.map(job => {
      return (
        <div key={"company-" + job.company + Math.random()}>
          <span>
            <h3 style={{ display: "inline-block" }}>{job.company}</h3>
            <img
              src={job.img}
              style={{
                marginLeft: "25px",
                maxHeight: "50px"
              }}
            />
          </span>
          <p className="info">
            {job.title}
            <span>&bull;</span> <em className="date">{job.years}</em>
          </p>
          <h5>{job.description}</h5>
          <hr />
        </div>
      );
    });

    const skillsData = skills.map(skill => {
      const className = `bar-expand ${skill.name.toLowerCase()}`;
      return (
        <li key={skill.name}>
          <span
            style={{
              background: this.getColorForPercentage(skill.level / 100),
              display: "inline",
              width: `${skill.level}%`
            }}
            className={className}
          />
          <em>
            {this.getSkillImage(skill)}&nbsp;{skill.name}
          </em>
        </li>
      );
    });

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
                <div className="twelve columns">{educationData}</div>
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
          <Element name="skills" />
          <div className="row skill" id="skillDiv">
            <div className="skillWrapper">
              <div className="three columns header-col">
                <h1>
                  <span>Skills</span>
                </h1>
              </div>

              <div className="nine columns main-col">
                <h4>{skillMessage}</h4>

                <div className="bars">
                  <ul className="skills">{skillsData}</ul>
                </div>
              </div>
            </div>
          </div>
          {/* <Card>
            <iframe
              id="resumeiFrame"
              frameBorder="0"
              style={{ height: "1000px", width: "80%" }}
              src="https://docs.google.com/document/d/1ikNvJ2xforZmuJJPRIPLtuRBk7CnA9cbdq741Zb5KtA/pub?embedded=true"
            />
          </Card> */}
        </section>
      </div>
    );
  }
  private getSkillImage(skill: Skill, size: number = 25) {
    const sizePx = `${size}px`;
    if (skill.img) {
      return <img style={{ height: sizePx, width: sizePx }} src={skill.img} />;
    }
    return null;
  }

  private getColorForPercentage(pct: number): string {
    let i;
    for (i = 1; i < percentColors.length - 1; i++) {
      if (pct < percentColors[i].pct) {
        break;
      }
    }
    const lower = percentColors[i - 1];
    const upper = percentColors[i];
    const range = upper.pct - lower.pct;
    const rangePct = (pct - lower.pct) / range;
    const pctLower = 1 - rangePct;
    const pctUpper = rangePct;
    const color = {
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper)
    };
    return `rgba(${[color.r, color.g, color.b].join(",")},.85)`;
    // or output as hex if preferred
  }
}
