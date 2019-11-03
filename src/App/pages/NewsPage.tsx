import React from "react";
import Settings from "src/lib/Settings";
import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import LoadingComponent from "../components/LoadingComponent";
import "./QRPage.css";
import { Typography, IconButton } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import axios from "axios";
import NewsItemComponent from "../components/NewsItemComponent";

interface NewsState extends LoadingState {
  news?: NewsItem[];
}

export default class NewsPage extends LoadingComponent<
  LoadingProps,
  NewsState
> {
  private styles: Styles = {
    header: { color: "white", fontSize: 35 }
  };
  private settings = Settings.getInstance();

  constructor(p: LoadingProps) {
    super(p);
    this.state = {
      loading: true,
      loadAfter: [this.loadData()],
      title: "News",
      news: undefined
    };
  }

  public componentDidMount() {
    super.componentDidMount();
    this.settings.get(""); // DELETE ME
  }

  public renderPostLoad() {
    return (
      <div id="page" className="container">
        <Typography
          component="h1"
          style={this.styles.header}
          color="textPrimary"
        >
          News
          <IconButton
            aria-label="refresh"
            color="inherit"
            onClick={this.loadData}
            style={{ float: "right" }}
          >
            <Refresh />
          </IconButton>
        </Typography>

        <div>
          {this.state.news
            ? this.state.news.map((news, x) => (
                <NewsItemComponent news={news} key={`news-${x}`} />
              ))
            : this.loadingElement}
        </div>
      </div>
    );
  }

  private loadData = () => {
    if (this.state) {
      this.setState(p => ({ ...p, news: undefined }));
    }
    return axios
      .get(`https://api.keithmackay.com/news/`)
      .then(r => r.data)
      .then(body => {
        this.setState(p => ({ ...p, news: body }));
      });
  };
}
