import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { StyleState } from "../slice/styleSlice";
import styleActionType from "../actionType/styleActionType";

import type { StyledComponentTheme } from "../theme/theme";
import themes from "../theme/theme";

const changeStyle: CaseReducer<
  StyleState,
  PayloadAction<{
    actionType: string;
    theme?: string;
    fontTraditional?: number;
    fontEnglish?: number;
    backgroundImages?: string[];
  }>
> = (state, action) => {
  try {
    switch (action.payload.actionType) {
      case styleActionType.THEME: {
        if (action.payload.theme) {
          return {
            ...state,
            theme: themes[action.payload.theme],
          };
        }
      }

      case styleActionType.FONT_TRADITIONAL: {
        if (action.payload.fontTraditional) {
          return {
            ...state,
            fontTraditional: action.payload.fontTraditional,
          };
        }
      }

      case styleActionType.FONT_ENGLISH: {
        if (action.payload.fontEnglish) {
          return {
            ...state,
            fontEnglish: action.payload.fontEnglish,
          };
        }
      }
      // 每次傳進來的資料都要按照分頁順序
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

export default { changeStyle };
