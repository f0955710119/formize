import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { StyleState } from "../slice/styleSlice";
import styleActionType from "../actionType/styleActionType";
import styleConfig from "../../configs/styleConfig";
import backgroundConfig from "../../configs/backgroundConfig";

const initStyle: CaseReducer<StyleState> = (state) => {
  state.theme = styleConfig.MAIN_CODE;
  state.font = styleConfig.OPENHUNNINN_CODE;
  state.backgroundImages = [backgroundConfig.YELLOW1];
};

const changeStyle: CaseReducer<
  StyleState,
  PayloadAction<{
    actionType: string;
    theme?: string;
    font?: string;
    backgroundImages?: string[];
  }>
> = (state, action) => {
  try {
    switch (action.payload.actionType) {
      case styleActionType.THEME: {
        if (action.payload.theme) {
          return {
            ...state,
            theme: action.payload.theme,
          };
        }
      }

      case styleActionType.FONT: {
        if (action.payload.font) {
          return {
            ...state,
            font: action.payload.font,
          };
        }
      }

      case styleActionType.BACKGROUND_IMAGES: {
        if (action.payload.backgroundImages) {
          return {
            ...state,
            backgroundImages: action.payload.backgroundImages,
          };
        }
      }
      default: {
        throw new Error("確認一下樣式的actionType");
      }
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

export default { initStyle, changeStyle };
