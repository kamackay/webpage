declare interface NewsItem {
  source: {
    url: string;
    site: string;
    group: string;
  };
  time: number;
  importance: number;
  title: string;
  link: string;
  "dc:creator": string;
  content: string;
  indexInFeed: number;
  description: string;
  pubDate: string;
  categories: string[];
  guid: string;
  // Other Attributes
  [key: string]: any;
}
