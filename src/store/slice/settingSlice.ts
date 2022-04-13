import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingState {
  title: string;
  status: number;
  mode: number;
  limitedAnswerTime: number | null;
  limitedResponseQuantity: number | null;
  startPageImageFile: object | null;
  startPageParagrphy: string;
  endPageImageFile: object | null;
  endPageParagrphy: string;
}

const initialState: SettingState = {
  title: "",
  status: 0,
  mode: 0,
  limitedAnswerTime: null,
  limitedResponseQuantity: null,
  startPageImageFile: null,
  startPageParagrphy: "",
  endPageImageFile: null,
  endPageParagrphy: "",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  //  感覺這包reducer能直接改寫
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateStatus: (state, action: PayloadAction<number>) => {
      state.status = action.payload;
    },
    updateMode: (state, action: PayloadAction<number>) => {
      state.mode = action.payload;
    },
    updateLimitedAnswerTime: (state, action: PayloadAction<number | null>) => {
      state.limitedAnswerTime = action.payload;
    },
    updateLimitedResponseQuantity: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.limitedResponseQuantity = action.payload;
    },
    updateStartPageImageFile: (state, action: PayloadAction<object>) => {
      state.startPageImageFile = action.payload;
    },
    updateStartPageParagrphy: (state, action: PayloadAction<string>) => {
      state.startPageParagrphy = action.payload;
    },
    updateEndPageImageFile: (state, action: PayloadAction<object>) => {
      state.endPageImageFile = action.payload;
    },
    updateEndPageParagrphy: (state, action: PayloadAction<string>) => {
      state.endPageParagrphy = action.payload;
    },
  },
});

export const settingReducer = settingSlice.reducer;
export const settingActions = settingSlice.actions;
