import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/ThemeSlice";
import newsReducer from "./slices/NewsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    news: newsReducer,
  },
});
