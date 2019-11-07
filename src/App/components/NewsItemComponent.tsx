import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography
} from "@material-ui/core";
import {
  ExpandLess as Expanded,
  ExpandMore as NotExpanded,
  OpenInNewRounded
} from "@material-ui/icons";
import classNames from "classnames";
import * as React from "react";
import { Button } from "semantic-ui-react";
import "../../index.css";
import KeithProps from "../../model/KeithProps";
import KeithState from "../../model/KeithState";
import KeithComponent from "./KeithComponent";

interface NewsItemProps extends KeithProps {
  news: NewsItem;
  visible: boolean;
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
      fontSize: 18
    },
    noselect: {
      userSelect: "none"
    }
  };

  constructor(props: NewsItemProps) {
    super(props);
    this.state = {
      expanded: props.news.indexInFeed === 0
    };
    this.styles.card.cursor = !!props.news.description ? "pointer" : "default";
  }

  public render = () => {
    const {
      content,
      title,
      description,
      source,
      categories,
      guid,
      pubDate,
      "dc:creator": creator
    } = this.props.news;
    if (!this.props.visible) {
      return null;
    }
    const { expanded } = this.state;
    const body =
      (description || "").length > (content || "").length
        ? description
        : content;
    return (
      <Card
        className={classNames("news")}
        style={this.styles.card}
        onClick={this.toggle}
      >
        <CardContent>
          <span style={{ float: "right" }}>
            {expanded ? <Expanded /> : <NotExpanded />}
          </span>
          <Typography
            component="h2"
            gutterBottom={true}
            style={this.styles.title}
            className={classNames("noselect", "title")}
          >
            <IconButton onClick={this.open} color="primary">
              <OpenInNewRounded />
              {source.site}
            </IconButton>
            - {title}
          </Typography>
          <Typography
            component="h4"
            gutterBottom={true}
            style={{ ...this.styles.title, marginLeft: 10 }}
            className={classNames("noselect", "secondary-header")}
          >
            {creator ? <i>{creator}</i> : null}
            {"   - "}
            <span style={{ fontSize: 15 }}>{this.getDate(pubDate)}</span>
          </Typography>
          <this.html
            className={classNames("body")}
            content={expanded ? body : undefined}
          />
        </CardContent>
        {categories ? (
          <CardActions
            style={{ maxWidth: "100%", overflowX: "auto" }}
            disableSpacing={true}
          >
            {categories.map((category, x) => (
              <Button
                color="blue"
                basic={true}
                size="medium"
                content={category}
                className={classNames("category")}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();

                  // TODO
                }}
                key={`${guid}-category-${category}-${x}`}
              />
            ))}
          </CardActions>
        ) : null}
      </Card>
    );
  };

  private getDate = (date: string): string => {
    try {
      return new Date(Date.parse(date)).toLocaleString();
    } catch (err) {
      return "";
    }
  };

  private toggle = () =>
    this.setState(p => {
      return { ...p, expanded: !p.expanded };
    });

  private open = () => window.open(this.props.news.link, "_blank");

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
