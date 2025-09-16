import type { articles } from "@/lib/responseType";

export interface ThemeState {
  isDark: boolean;
}

export interface StateType {
  theme: {
    isDark: boolean;
  };
  news: articles[];
}

export interface HistoryType {
  title: string;
  image: string;
  publishedAt: string;
  visitedDate: string;
  url: string;
}
