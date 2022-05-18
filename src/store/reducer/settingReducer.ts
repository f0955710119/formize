import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

import type { SettingState } from "../slice/settingSlice";

const initSetting: CaseReducer<SettingState> = (state) => {
  state.title = "空白問卷";
  state.status = "0";
  state.mode = "0";
  state.pageQuantity = 1;
  state.limitedAnswerTime = null;
  state.limitedResponseQuantity = null;
  state.startPageImageFile = null;
  state.startPageParagraph = "";
  state.endPageImageFile = null;
  state.endPageParagraph = "";
};

const updateSingleSettingInput: CaseReducer<
  SettingState,
  PayloadAction<{
    actionType: string;
    value: string | number | object | null;
  }>
> = (state, action) => {
  return {
    ...state,
    [action.payload.actionType]: action.payload.value,
  };
};

export default {
  initSetting,
  updateSingleSettingInput,
};
