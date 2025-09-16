import { createSlice } from "@reduxjs/toolkit";
import type { ThemeState } from "../Type";

const getInitialState = (): boolean => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("isDark");
    if (saved !== null) {
      const isDarkMode = saved === "true";
      if (isDarkMode) {
        document.body.classList.add("dark");
      }
      return isDarkMode;
    }
    return false;
  }
  return false;
};

const initialState: ThemeState = {
  isDark: getInitialState(),
};

export const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleTheme } = theme.actions;
export default theme.reducer;
