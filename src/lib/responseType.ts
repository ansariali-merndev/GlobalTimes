export interface articles {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  content: string;
}

export interface NewsPage {
  articles: articles[];
  information: object;
  totalArticles: number;
}
