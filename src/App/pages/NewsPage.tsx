import React from "react";
import Settings from "src/lib/Settings";
import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import LoadingComponent from "../components/LoadingComponent";
import "./QRPage.css";
import { Typography, Fab } from "@material-ui/core";
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
      loadAfter: [this.loadData(true)()],
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
      <div style={{ width: "99vw", height: "100vh" }}>
        <div id="page" className="container">
          <Typography
            component="h1"
            style={this.styles.header}
            color="textPrimary"
          >
            News
          </Typography>

          <div>
            {this.state.news
              ? this.state.news.map((news, x) => (
                  <NewsItemComponent news={news} key={`news-${x}`} />
                ))
              : this.loadingElement}
          </div>
        </div>
        <div style={{ position: "fixed", bottom: 10, right: 5 }}>
          <Fab
            aria-label="refresh"
            color="primary"
            onClick={this.loadData(true)}
            style={{ float: "right" }}
          >
            <Refresh />
          </Fab>
        </div>
      </div>
    );
  }

  private loadData = (clearFirst?: boolean) => () => {
    if (this.state && clearFirst) {
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
