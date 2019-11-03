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
  description: string;
  pubDate: string;
  categories: string[];
  guid: string;
}
