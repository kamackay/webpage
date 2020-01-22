import { Button, CircularProgress, Fab, Typography } from "@material-ui/core";
import { CloseRounded, Refresh } from "@material-ui/icons";
import classNames from "classnames";
import React from "react";
import { isMobile } from "react-device-detect";
import SmoothScroll from "smooth-scroll";
import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import NewsFetcher from "src/utils/NewsFetcher";
import LoadingComponent from "../components/LoadingComponent";
import NewsItemComponent from "../components/NewsItemComponent";
import "./NewsPage.css";

// const NewsItemComponent = asyncComponent(() => import("../components/NewsItemComponent"));
// const CloseRounded = asyncComponent(() => import("@material-ui/icons/CloseRounded"));
// const Refresh = asyncComponent(() => import("@material-ui/icons/Refresh"));

interface NewsState extends LoadingState {
  news: NewsItem[];
  updates?: number;
  newsLoading: boolean;
  search: string;
  categoryFilter?: string;
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
      newsLoading: true,
      loadAfter: [this.loadData(true)()],
      news: [],
      search: "",
      faviconUrl: "images/news.png",
      title: "News"
    };
  }

  public componentDidMount() {
    super.componentDidMount();
    this.updateInterval = setInterval(this.checkForUpdates, 1000 * 60);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  public componentWillUnmount() {
    clearInterval(this.updateInterval);
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  public renderPostLoad() {
    const { updates, news, newsLoading, categoryFilter } = this.state;
    return (
      <div style={{ width: "99vw", height: "100vh" }}>
        <div className={classNames("header")}>
          <span className={classNames("header-title")}>News</span>
          <div style={{ float: "right" }}>
            {categoryFilter && (
              <Button
                variant="contained"
                style={{ fontSize: 12, marginRight: 5 }}
                color="default"
                endIcon={<CloseRounded />}
                onClick={() => this.categoryClick(undefined)}
              >
                Category: {categoryFilter}
              </Button>
            )}
            <span style={{ fontSize: 15 }}>{news.length} Articles</span>
          </div>
        </div>

        <div id="page" className="container">
          <div id="top" />
          <div style={{ paddingTop: 45 }}>
            {news.map((item, x) => (
              <NewsItemComponent
                news={item}
                key={`news-${x}`}
                index={x}
                visible={
                  !categoryFilter ||
                  item.categories
                    .map(s => s.toLowerCase())
                    .includes(categoryFilter.toLowerCase())
                }
                categoryClick={this.categoryClick}
              />
            ))}
          </div>
        </div>
        <div style={{ position: "fixed", bottom: 10, right: 5 }}>
          <Fab
            variant="extended"
            aria-label="refresh"
            color="primary"
            onClick={newsLoading ? undefined : this.refresh}
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
                  marginLeft: 4,
                  color: "white"
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

  private handleKeyDown = (event: KeyboardEvent) => {
    switch (event.which) {
      case 82:
        if (event.metaKey || event.ctrlKey) {
          event.preventDefault();
          event.stopPropagation();
          this.refresh();
        }
        return;
    }
  };

  private categoryClick = (s?: string): void => {
    this.setState(prev => ({ ...prev, categoryFilter: s }));
  };

  private checkForUpdates = () => {
    if (!this.state.news) {
      return;
    }
    const maxTime = Math.max(...this.state.news.map(item => item.time));
    this.fetcher.checkForNew(maxTime).then(count => {
      this.setState(p => ({ ...p, updates: count }));
    });
  };

  private setNews = (newItems: NewsItem[], callback?: () => void) =>
    this.setState(
      p => {
        const items = [...(p.news || [])]
          .concat(newItems)
          .sort(this.fetcher.sortItems);
        return {
          ...p,
          news: isMobile ? items.splice(0, 100) : items,
          newsLoading: false,
          updates: 0
        };
      },
      () => {
        setTimeout(this.scrollToTop, 100);
        if (!!callback) {
          callback();
        }
      }
    );

  private refresh = () => {
    this.setState(
      p => ({ ...p, newsLoading: true }),
      () => {
        if (this.state.news) {
          this.fetcher
            .loadAfter(Math.max(...this.state.news.map(item => item.time)))
            .then(this.setNews);
        }
      }
    );
  };

  private scrollToTop = () => {
    const el = document.getElementById("top");
    new SmoothScroll().animateScroll(el, el, {
      easing: "easeInCubic",
      durationMax: 1000
    });
  };

  private loadData = (clearFirst?: boolean) => () => {
    if (this.state) {
      if (clearFirst) {
        this.setState(p => ({ ...p, news: [], newsLoading: true }));
      } else {
        this.setState(p => ({ ...p, newsLoading: true }));
      }
    }
    return this.fetcher.getAll().then(result => {
      console.log(`Finished Fetching News`);
      this.setNews(result, this.checkForUpdates);
    });
  };
}
