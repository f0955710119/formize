import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { QuestionState } from "../slice/questionSlice";
import type { Question } from "../../types/question";
import type { Validation } from "../../types/validation";
import questionActionType from "../actionType/questionActionType";
import helper from "../../utils/helper";
import questionDefaultConfig from "../../configs/questionDefaultConfig";

const initQuestion: CaseReducer<QuestionState> = (state) => {
  state.accumulatedInValidInputError = [{ id: "", message: "" }];
  state.currentStep = 1;
  state.editingFormPage = 1;
  state.editingQuestion = null;
  state.questions = [];
  state.willSwitcEditinghQuestion = false;
};

const addNewQuestion: CaseReducer<QuestionState, PayloadAction<Question>> = (
  state,
  action
) => {
  state.questions.push(action.payload);
  state.questions = state.questions.sort((a, b) => a.page - b.page);
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

        case questionActionType.MATRIXS: {
          if (action.payload.stringArr) {
            return {
              ...question,
              matrixs: action.payload.stringArr,
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

const initRangeDateOfDateQuestion: CaseReducer<
  QuestionState,
  PayloadAction<{
    id: string;
    startDate: string | null;
    endDate: string | null;
  }>
> = (state, action) => {
  state.questions = state.questions.map((question) => {
    if (question.id !== action.payload.id) return question;
    return {
      ...question,
      validations: {
        ...question.validations,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      },
    };
  });
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

const setIsEditingOption: CaseReducer<QuestionState, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.isEditingOption = action.payload;
};

const setIsSwitchingEditingOption: CaseReducer<
  QuestionState,
  PayloadAction<boolean>
> = (state, action) => {
  state.isSwitchingEditingOption = action.payload;
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
  state.questions = state.questions.sort((a, b) => a.page - b.page);
  state.editingFormPage = action.payload.newPage;
};

const updateQuestionPage: CaseReducer<
  QuestionState,
  PayloadAction<{ page: number; isSwitchMode?: boolean }>
> = (state, action) => {
  if (action.payload.isSwitchMode) {
    state.questions = state.questions.map((question) => {
      return {
        ...question,
        page: 1,
      };
    });
    return;
  }
  state.questions = state.questions.map((question) => {
    if (question.page === 1) return question;
    if (question.page < action.payload.page) return question;
    const updateQuestion = {
      ...question,
      page: question.page - 1,
    };
    return updateQuestion;
  });
};

export default {
  initQuestion,
  addNewQuestion,
  deleteExistedQuestion,
  updateSiglePropOfQuestion,
  initRangeDateOfDateQuestion,
  switchEditingQuestion,
  willChangeLimitationValue,
  switchCreatingFormStep,
  switchEditingFormPage,
  setIsEditingOption,
  setIsSwitchingEditingOption,
  addNewFormPage,
  updateQuestionPage,
};
