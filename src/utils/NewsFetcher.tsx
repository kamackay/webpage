import axios from "axios";

export default class NewsFetcher {
  private rootUrl = `https://go.keithm.io/go/news`;

  public getAll = (): Promise<NewsItem[]> =>
    new Promise((resolve) => {
      axios
        .get(`${this.rootUrl}`)
        .then((r) => r.data)
        .then((body: NewsItem[]) => {
          resolve(body.sort(this.sortItems));
        });
    });

  public loadAfter = (time: number): Promise<NewsItem[]> =>
    new Promise((resolve) => {
      axios
        .get(`${this.rootUrl}/after/${time}`)
        .then((r) => r.data)
        .then((data: NewsItem[]) => resolve(data))
        .catch(() => resolve([]));
    });

  public getId = (id: string): Promise<NewsItem | null> =>
    new Promise((resolve) => {
      const storageId = `news-item-${id}`;
      const fromStorage = localStorage.getItem(storageId);
      if (!!fromStorage && false) {
        // console.log(`Pulling ${id} from localstorage`);
        // resolve(JSON.parse(fromStorage) as NewsItem);
      } else {
        axios
          .get(`${this.rootUrl}/id/${id}`)
          .then((r) => r.data as NewsItem)
          .then((item) => {
            localStorage.setItem(storageId, JSON.stringify(item));
            return item;
          })
          .then(resolve)
          .catch(() => resolve(null));
      }
    });

  public checkForNew = (time: number): Promise<number> =>
    new Promise((resolve) => {
      axios
        .get(`${this.rootUrl}/ids_after/${time}`)
        .then((r) => r.data)
        .then((data: string[]) => resolve(data.length))
        .catch(() => resolve(0));
    });

  public sortItems = (i1: NewsItem, i2: NewsItem): number => {
    return 0;
    // if (i1.indexInFeed === i2.indexInFeed) {
    //   return i2.time - i1.time;
    // }
    // return i1.indexInFeed - i2.indexInFeed;
  };
}
