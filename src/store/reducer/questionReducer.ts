import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { QuestionState, ErrorMessage } from "../slice/questionSlice";
import type { Question } from "../../types/question";
import type { Validation } from "../../types/validation";
import questionActionType from "../actionType/questionActionType";
import questionConfig from "../../configs/questionConfig";
import helper from "../../utils/helper";
import questionDefaultConfig from "../../configs/questionDefaultConfig";

/*
  新增題目
  刪除題目
  改單一選項? ( 移除的話要帶 default 回來)
*/

// BUG: 這邊最好把格式直接寫好，用 switch 去產生 default question 格式
const addNewQuestion: CaseReducer<QuestionState, PayloadAction<Question>> = (
  state,
  action
) => {
  state.questions.push(action.payload);
};

const deleteExistedQuestion: CaseReducer<
  QuestionState,
  PayloadAction<string>
> = (state, action) => {
  state.questions = state.questions.filter(
    (question) => question.id !== action.payload
  );
};

const updateSiglePropOfQuestion: CaseReducer<
  QuestionState,
  PayloadAction<{
    id: string;
    actionType: string;
    text?: string;
    number?: number;
    booleanOption?: boolean;
    date?: Date;
    stringArr?: string[];
    validations?: Validation;
  }>
> = (state, action) => {
  try {
    state.questions = state.questions.map((question) => {
      if (question.id !== action.payload.id) return question;
      switch (action.payload.actionType) {
        case questionActionType.TITLE: {
          if (action.payload.text) {
            return {
              ...question,
              title: action.payload.text,
            };
          }
        }
        case questionActionType.NOTE: {
          if (action.payload.text) {
            return {
              ...question,
              note: action.payload.text,
            };
          }
        }
        case questionActionType.PLACEHOLDER: {
          if (action.payload.text) {
            return {
              ...question,
              placeholder: action.payload.text,
            };
          }
        }

        case questionActionType.TYPE: {
          if (action.payload.text) {
            return {
              ...question,
              type: action.payload.text,
            };
          }
        }

        case questionActionType.PAGE: {
          if (action.payload.number) {
            return {
              ...question,
              page: action.payload.number,
            };
          }
        }

        case questionActionType.OPTIONS: {
          if (action.payload.stringArr) {
            return {
              ...question,
              options: action.payload.stringArr,
            };
          }
        }

        case questionActionType.MARTIXS: {
          if (action.payload.stringArr) {
            return {
              ...question,
              martixs: action.payload.stringArr,
            };
          }
        }

        case questionActionType.VALIDATIONS: {
          if (action.payload.validations) {
            return {
              ...question,
              validations: action.payload.validations,
            };
          }
        }

        default: {
          throw new Error(
            "updateQuestionDisplayText只能用來更新題目內容是文字類的欄位"
          );
        }
      }
    });
  } catch (error: any) {
    console.error(error.message);
  }
};

const switchEditingQuestion: CaseReducer<
  QuestionState,
  PayloadAction<Question | null>
> = (state, action) => {
  state.editingQuestion = action.payload;
};

const willChangeLimitationValue: CaseReducer<
  QuestionState,
  PayloadAction<boolean>
> = (state, action) => {
  state.willSwitcEditinghQuestion = action.payload;
};

const switchCreatingFormStep: CaseReducer<
  QuestionState,
  PayloadAction<number>
> = (state, action) => {
  state.currentStep = action.payload;
};

const switchEditingFormPage: CaseReducer<
  QuestionState,
  PayloadAction<number>
> = (state, action) => {
  state.editingFormPage = action.payload;
};

const addNewFormPage: CaseReducer<
  QuestionState,
  PayloadAction<{
    questionType: string;
    newPage: number;
  }>
> = (state, action) => {
  const defaultQuestionType = helper.generateResponsedQuestionDefault(
    action.payload.questionType
  );

  const defaultQuestion = {
    ...questionDefaultConfig[defaultQuestionType],
    id: helper.generateId(8),
    page: action.payload.newPage,
  };

  state.editingQuestion = defaultQuestion;
  state.questions.push(defaultQuestion);
  state.editingFormPage = action.payload.newPage;
};

const updateQuestionPage: CaseReducer<QuestionState, PayloadAction<number>> = (
  state,
  action
) => {
  // action.payload 是被改變的頁數
  state.questions = state.questions.map((question) => {
    // 如果是刪除第一頁，而第一頁後面有其他頁
    // if (question.page === 1 && question.page === action.payload) {

    // }
    // 如果是刪除頁數的前面頁數
    if (question.page === 1) return question;
    if (question.page < action.payload) return question;
    // 如果是刪除頁後面的頁數
    const updateQuestion = {
      ...question,
      page: question.page - 1,
    };
    return updateQuestion;
  });
};

export default {
  addNewQuestion,
  deleteExistedQuestion,
  updateSiglePropOfQuestion,
  switchEditingQuestion,
  willChangeLimitationValue,
  switchCreatingFormStep,
  switchEditingFormPage,
  addNewFormPage,
  updateQuestionPage,
};
