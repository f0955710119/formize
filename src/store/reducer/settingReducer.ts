import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { SettingState } from "../slice/settingSlice";
import settingActionType from "../actionType/settingActionType";

const updateSingleSettingInput: CaseReducer<
  SettingState,
  PayloadAction<{
    title?: string;
    status?: number;
    mode?: number;
    limitedAnswerTime?: number | null;
    limitedResponseQuantity?: number | null;
    startPageImageFile?: object | null;
    startPageParagraph?: string;
    endPageImageFile?: object | null;
    endPageParagraph?: string;
  }>
> = (state, action) => {
  try {
    switch (action.type) {
      case settingActionType.TITLE: {
        if (action.payload.title) {
          return {
            ...state,
            title: action.payload.title,
          };
        }
      }

      case settingActionType.STATUS: {
        if (action.payload.status) {
          return {
            ...state,
            status: action.payload.status,
          };
        }
      }

      case settingActionType.MODE: {
        if (action.payload.mode) {
          return {
            ...state,
            mode: action.payload.mode,
          };
        }
      }

      case settingActionType.LIMITED_ANSWER_TIME: {
        if (action.payload.limitedAnswerTime !== undefined) {
          return {
            ...state,
            limitedAnswerTime: action.payload.limitedAnswerTime,
          };
        }
      }

      case settingActionType.LIMITED_RESPONSE_QUANTITY: {
        if (action.payload.limitedResponseQuantity !== undefined) {
          return {
            ...state,
            limitedResponseQuantity: action.payload.limitedResponseQuantity,
          };
        }
      }

      case settingActionType.START_PAGE_IMAGE_FILE: {
        if (action.payload.startPageImageFile !== undefined) {
          return {
            ...state,
            startPageImageFile: action.payload.startPageImageFile,
          };
        }
      }

      case settingActionType.START_PAGE_PARAGRAPH: {
        if (action.payload.startPageParagraph) {
          return {
            ...state,
            startPageParagraph: action.payload.startPageParagraph,
          };
        }
      }

      case settingActionType.END_PAGE_IMAGE_FILE: {
        if (action.payload.endPageImageFile !== undefined) {
          return {
            ...state,
            endPageImageFile: action.payload.endPageImageFile,
          };
        }
      }

      case settingActionType.END_PAGE_PARAGRAPH: {
        if (action.payload.endPageParagraph) {
          return {
            ...state,
            endPageParagraph: action.payload.endPageParagraph,
          };
        }
      }

      default: {
        throw new Error("檢查更新問卷setting的型態有沒有給錯");
      }
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

export default {
  updateSingleSettingInput,
};

/*
{
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
    updateStartPageParagraph: (state, action: PayloadAction<string>) => {
      state.startPageParagraph = action.payload;
    },
    updateEndPageImageFile: (state, action: PayloadAction<object>) => {
      state.endPageImageFile = action.payload;
    },
    updateEndPageParagraph: (state, action: PayloadAction<string>) => {
      state.endPageParagraph = action.payload;
    },
  },
*/
