import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/settingReducer";

export interface SettingState {
  title: string;
  status: number;
  mode: number;
  limitedAnswerTime: number | null;
  limitedResponseQuantity: number | null;
  startPageImageFile: object | null;
  startPageParagraph: string;
  endPageImageFile: object | null;
  endPageParagraph: string;
}

const initialState: SettingState = {
  title: "",
  status: 0,
  mode: 0,
  limitedAnswerTime: null,
  limitedResponseQuantity: null,
  startPageImageFile: null,
  startPageParagraph: "",
  endPageImageFile: null,
  endPageParagraph: "",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  //  感覺這包reducer能直接改寫
  reducers,
});

export const settingReducer = settingSlice.reducer;
export const settingActions = settingSlice.actions;
