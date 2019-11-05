import axios from "axios";

export default class NewsFetcher {
  private rootUrl = `https://api.keithmackay.com/news`;

  public getAll = (): Promise<NewsItem[]> =>
    new Promise(resolve => {
      axios
        .get(`${this.rootUrl}/ids/`)
        .then(r => r.data)
        .then((data: string[]) => {
          Promise.all(data.map(this.getId)).then(result => {
            resolve(result
              .filter(item => !!item)
              .sort(this.sortItems) as NewsItem[]);
          });
        });
    });

  public getId = (id: string): Promise<NewsItem | null> =>
    new Promise(resolve => {
      const storageId = `news-item-${id}`;
      const fromStorage = localStorage.getItem(storageId);
      if (!!fromStorage) {
        resolve(JSON.parse(fromStorage) as NewsItem);
      } else {
        axios
          .get(`${this.rootUrl}/id/${id}`)
          .then(r => r.data as NewsItem)
          .then(item => {
            localStorage.setItem(storageId, JSON.stringify(item));
            return item;
          })
          .then(resolve)
          .catch(() => resolve(null));
      }
    });

  public checkForNew = (time: number): Promise<number> =>
    new Promise(resolve => {
      axios
        .get(`${this.rootUrl}/after/${time}`)
        .then(r => r.data)
        .then((data: NewsItem[]) => resolve(data.length))
        .catch(() => resolve(0));
    });

  private sortItems = (i1: NewsItem, i2: NewsItem): number => {
    if (i1.indexInFeed === i2.indexInFeed) {
      return i2.time - i1.time;
    }
    return i1.indexInFeed - i2.indexInFeed;
  };
}
