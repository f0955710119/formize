import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/styleReducer";

export interface StyleState {
  theme: number;
  fontTraditional: number;
  fontEnglish: number;
  backgroundImages: string[];
}

const initialState: StyleState = {
  theme: 0,
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
