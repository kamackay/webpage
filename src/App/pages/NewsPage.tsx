import { CircularProgress, Fab, Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import React from "react";
import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import NewsFetcher from "src/utils/NewsFetcher";
import LoadingComponent from "../components/LoadingComponent";
import NewsItemComponent from "../components/NewsItemComponent";
import "./QRPage.css";

interface NewsState extends LoadingState {
  news?: NewsItem[];
  updates?: number;
  newsLoading: boolean;
}

export default class NewsPage extends LoadingComponent<
  LoadingProps,
  NewsState
> {
  private styles: Styles = {
    header: { color: "white", fontSize: 35 }
  };
  private updateInterval: NodeJS.Timeout;
  private fetcher = new NewsFetcher();

  constructor(p: LoadingProps) {
    super(p);
    this.state = {
      loading: true,
      newsLoading: true,
      loadAfter: [this.loadData(true)()],
      title: "News",
      news: undefined
    };
  }

  public componentDidMount() {
    super.componentDidMount();
    this.updateInterval = setInterval(this.checkForUpdates, 1000 * 60);
  }

  public componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  public renderPostLoad() {
    const { updates, news, newsLoading } = this.state;
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
            {news
              ? news.map((item, x) => (
                  <NewsItemComponent news={item} key={`news-${x}`} />
                ))
              : this.loadingElement}
          </div>
        </div>
        <div style={{ position: "fixed", bottom: 10, right: 5 }}>
          <Fab
            variant="extended"
            aria-label="refresh"
            color="primary"
            onClick={this.loadData(false)}
            style={{ float: "right" }}
          >
            {!newsLoading && !!news && <Refresh />}
            {newsLoading && <CircularProgress color="secondary" />}
            {!newsLoading && !!updates && !!news && (
              <Typography
                variant="h4"
                component="h4"
                style={{ fontSize: "1.5rem", textTransform: "initial" }}
              >
                {" - "}
                {updates} New
              </Typography>
            )}
          </Fab>
        </div>
      </div>
    );
  }

  private checkForUpdates = () => {
    if (!this.state.news) {
      return;
    }
    const maxTime = Math.max(...this.state.news.map(item => item.time));
    this.fetcher.checkForNew(maxTime).then(count => {
      this.setState(p => ({ ...p, updates: count }));
    });
  };

  private loadData = (clearFirst?: boolean) => () => {
    if (this.state) {
      if (clearFirst) {
        this.setState(p => ({ ...p, news: undefined, newsLoading: true }));
      } else {
        this.setState(p => ({ ...p, newsLoading: true }));
      }
    }
    return this.fetcher.getAll().then(result => {
      this.setState(
        p => ({ ...p, news: result, newsLoading: false, updates: 0 }),
        this.checkForUpdates
      );
    });
  };
}
