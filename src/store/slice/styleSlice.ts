import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/styleReducer";

import type { StyledComponentTheme } from "../theme/theme";
import themes from "../theme/theme";

export interface StyleState {
  theme: StyledComponentTheme;
  fontTraditional: number;
  fontEnglish: number;
  backgroundImages: string[];
}

const initialState: StyleState = {
  theme: themes.main,
  fontTraditional: 0,
  fontEnglish: 0,
  backgroundImages: [""],
};

const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers,
});

export const styleReducer = styleSlice.reducer;
export const styleActions = styleSlice.actions;
