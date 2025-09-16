import type { articles } from "@/lib/responseType";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const news = createSlice({
  name: "news",
  initialState: [] as articles[],
  reducers: {
    addData: (state, action: PayloadAction<articles[]>) => {
      return [...state, ...action.payload];
    },
  },
});

export const { addData } = news.actions;

export default news.reducer;
