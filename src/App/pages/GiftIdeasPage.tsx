import { Paper, Typography } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import axios from "axios";
import classNames from "classnames";
import React from "react";
import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import LoadingComponent from "../components/LoadingComponent";
import "./GiftIdeasPage.css";

interface Idea {
  id: string;
  title: string;
  link?: string;
  additional?: string;
  claimed?: boolean;
  expired?: boolean;
  priority?: number;
  hidden?: boolean;
}

interface GiftState extends LoadingState {
  ideas: Idea[];
}

export default class GiftIdeaPage extends LoadingComponent<
  LoadingProps,
  GiftState
> {
  constructor(p: LoadingProps) {
    super(p);
    this.state = {
      loading: true,
      loadAfter: [this.loadData()],
      title: "Gift Ideas",
      ideas: []
    };
  }

  public componentDidMount() {
    super.componentDidMount();
  }

  public renderPostLoad() {
    const { ideas } = this.state;
    return (
      <div className={classNames("container")}>
        <Paper className="paper">
          <Typography variant="h2" component="h2" className="gift-header">
            Gift Ideas
          </Typography>

          <ul className={classNames("ideas-list")}>
            {ideas
              .filter(idea => !idea.hidden)
              .sort((a, b) => {
                const priority = (b.priority || 0) - (a.priority || 0);
                return priority === 0 ? a.id.localeCompare(b.id) : priority;
              })
              .map((idea, x) => (
                <this.Item idea={idea} key={`idea-${x}`} />
              ))}
          </ul>
        </Paper>
      </div>
    );
  }

  private Item = (p: { idea: Idea }): JSX.Element => {
    const { idea } = p;
    return (
      <li className={classNames("idea", { claimed: !!idea.claimed })}>
        <AddCircle />{" "}
        {!!idea.link ? (
          <a href={idea.link} target="_blank">
            {idea.title}
          </a>
        ) : (
          <span>{idea.title}</span>
        )}
        {idea.additional && (
          <span className={classNames("additional")}> - {idea.additional}</span>
        )}
      </li>
    );
  };

  private loadData = () => {
    return new Promise(resolve => {
      axios
        .get(`https://api.keithmackay.com/gift-ideas`)
        .then(r => r.data)
        .then((data: Idea[]) => {
          this.setState(p => ({ ...p, ideas: [...p.ideas, ...data] }), resolve);
        })
        .catch(err => {
          console.log(err);
          resolve();
        });
    });
  };
}
