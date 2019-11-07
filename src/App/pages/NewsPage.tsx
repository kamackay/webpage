import { CircularProgress, Fab, Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import classNames from "classnames";
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
  search: string;
}

export default class NewsPage extends LoadingComponent<
  LoadingProps,
  NewsState
> {
  // private styles: Styles = {
  //   header: { color: "white", fontSize: 35 }
  // };
  private updateInterval: NodeJS.Timeout;
  private fetcher = new NewsFetcher();

  constructor(p: LoadingProps) {
    super(p);
    this.state = {
      loading: true,
      faviconUrl: "images/news.png",
      newsLoading: true,
      loadAfter: [this.loadData(true)()],
      title: "News",
      news: undefined,
      search: ""
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
        <div className={classNames("header")}>
          <span className={classNames("header-title")}>News</span>
          {/* <input
            className={classNames("search")}
            onChange={this.searchChange}
          /> */}
        </div>

        <div id="page" className="container" style={{ marginTop: 45 }}>
          <div>
            {news
              ? news.map((item, x) => (
                  <NewsItemComponent
                    news={item}
                    key={`news-${x}`}
                    visible={true}
                  />
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
                style={{
                  fontSize: "1.5rem",
                  textTransform: "initial",
                  marginLeft: 4
                }}
              >
                {" "}
                {updates} New
              </Typography>
            )}
          </Fab>
        </div>
      </div>
    );
  }

  // private searchChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   event.persist();
  //   this.setState(p => ({ ...p, search: event.target.value }));
  // };

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
      console.log(`Finished Fetching News`);
      this.setState(
        p => ({ ...p, news: result, newsLoading: false, updates: 0 }),
        this.checkForUpdates
      );
    });
  };
}
