import * as React from "react";
import KeithProps from "../../model/KeithProps";
import KeithState from "../../model/KeithState";
import {
  OpenInNewRounded,
  ExpandLess as Expanded,
  ExpandMore as NotExpanded
} from "@material-ui/icons";
import KeithComponent from "./KeithComponent";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Button
} from "@material-ui/core";
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
    const {
      content,
      title,
      description,
      source,
      categories,
      guid
    } = this.props.news;
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
            component="h1"
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
          {/* <this.html
            className={classNames("description")}
            content={expanded ? description : undefined}
          /> */}
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
                color="primary"
                variant="contained"
                className={classNames("category")}
                key={`${guid}-category-${category}-${x}`}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();

                  // TODO Filter to this category
                }}
              >
                {category}
              </Button>
            ))}
          </CardActions>
        ) : null}
      </Card>
    );
  };

  private toggle = () =>
    this.setState(p => {
      console.log(`Setting Expanded to ${!p.expanded}`);
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
