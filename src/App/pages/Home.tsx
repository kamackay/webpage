import { Card, CardHeader, Typography } from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import { HomeProps, HomeState } from "src/model/HomeModel";
import LinkBean from "src/model/LinkBean";
import "../../bootstrap.min.css";
import "./Home.css";
import Page from "./Page";

export default class Home extends Page<HomeProps, HomeState> {
  private mounted = false;

  constructor(p: HomeProps) {
    super(p);
    this.state = {
      loading: true
    };
    this.setState = this.setState.bind(this);
  }

  public onLoad = () => {
    this.mounted = true;
    this.get(
      "./homeData.json",
      ((data: LinkBean[]) => {
        if (this.mounted) {
          this.setState({ ...this.state, links: data });
        }
      }).bind(this)
    );
  };

  public renderPostLoad() {
    const { links } = this.state;

    return links ? (
      <div
        className="App transparent"
        style={{
          borderRadius: 15,
          margin: 20
        }}
      >
        <Typography
          component="h2"
          variant="h1"
          gutterBottom={true}
          color="primary"
        >
          Welcome!
        </Typography>
        <hr />

        <Typography
          component="h2"
          variant="h3"
          gutterBottom={true}
          style={{ color: "white" }}
        >
          Here are some of the projects available
        </Typography>
        {links!.map(this.generateLink)}
      </div>
    ) : (
      this.loadingElement
    );
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  protected getLoadTime(): number {
    return 1000;
  }

  private generateLink(link: LinkBean) {
    return (
      <div
        key={link.name}
        style={{
          textAlign: "center",
          display: "inline-block",
          float: "left",
          margin: 10
        }}
        className={classNames("link")}
      >
        <Link to={link.url}>
          <Card className="card-link" style={{ padding: 15, maxWidth: 400 }}>
            <CardHeader title={link.name} subheader={link.subheader} />
            <img
              style={{ height: 150 }}
              src={link.img}
              title={`${link.name} Image`}
            />
          </Card>
        </Link>
      </div>
    );
  }
}
