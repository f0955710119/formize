import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/styleReducer";

import type { StyledComponentTheme } from "../theme/theme";
import themes from "../theme/theme";
import fonts from "../theme/font";

export interface StyleState {
  theme: StyledComponentTheme;
  font: string;
  backgroundImages: string[];
}

const initialState: StyleState = {
  theme: themes.main,
  font: fonts.default,
  backgroundImages: [""],
};

const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers,
});

export const styleReducer = styleSlice.reducer;
export const styleActions = styleSlice.actions;
