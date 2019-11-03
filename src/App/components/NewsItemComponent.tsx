import * as React from "react";
import KeithProps from "../../model/KeithProps";
import KeithState from "../../model/KeithState";
import { OpenInNewRounded } from "@material-ui/icons";
import KeithComponent from "./KeithComponent";
import { Card, CardContent, Typography, IconButton } from "@material-ui/core";
import classNames from "classnames";
import "../../index.css";

interface NewsItemProps extends KeithProps {
  news: NewsItem;
}

interface NewsItemState extends KeithState {
  expanded: boolean;
}

export default class NewsItemComponent extends KeithComponent<
  NewsItemProps,
  NewsItemState
> {
  private styles: Styles = {
    card: {
      margin: 1,
      marginBottom: 5,
      borderRadius: 4,
      paddingBottom: 4,
      border: "thin grey solid",
      boxShadow: "rgb(119, 119, 119) 7px 4px 7px"
    },
    title: {
      fontSize: 20
    },
    noselect: {
      userSelect: "none"
    }
  };

  constructor(props: NewsItemProps) {
    super(props);
    this.state = {
      expanded: props.news.importance === 0
    };
    this.styles.card.cursor = !!props.news.description ? "pointer" : "default";
  }

  public render = () => {
    const { link, content, title, source } = this.props.news;
    const { expanded } = this.state;
    return (
      <Card style={this.styles.card} onClick={this.toggle}>
        <CardContent>
          <Typography
            component="h1"
            gutterBottom={true}
            style={this.styles.title}
            className={classNames("noselect", "title")}
          >
            <IconButton onClick={() => window.open(link, "_blank")}>
              <OpenInNewRounded />
            </IconButton>
            <span style={{ color: "blue" }}>{source.site}</span> - {title}
          </Typography>
          {/* <this.html
            className={classNames("description")}
            content={expanded ? description : undefined}
          /> */}
          <this.html
            className={classNames("content")}
            content={expanded ? content : undefined}
          />
        </CardContent>
      </Card>
    );
  };

  private toggle = () =>
    this.setState(p => {
      console.log(`Setting Expanded to ${!p.expanded}`);
      return { ...p, expanded: !p.expanded };
    });

  private html = (p: { content?: string; className?: string }) => {
    const { content, className } = p;
    return !!content ? (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    ) : null;
  };
}
