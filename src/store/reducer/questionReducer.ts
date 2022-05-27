import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

import questionDefaultConfig from "../../configs/questionDefaultConfig";
import type { Question, UpdateValue } from "../../types/question";
import type { Validation } from "../../types/validation";
import helper from "../../utils/helper";
import questionActionType from "../actionType/questionActionType";
import type { QuestionState } from "../slice/questionSlice";

const initQuestion: CaseReducer<QuestionState> = (state) => {
  state.currentStep = 1;
  state.editingFormPage = 1;
  state.editingQuestionId = null;
  state.questions = [];
};

const addNewQuestion: CaseReducer<QuestionState, PayloadAction<Question>> = (state, action) => {
  state.questions.push(action.payload);
  state.questions = state.questions.sort((a, b) => a.page - b.page);
};

const deleteExistedQuestion: CaseReducer<
  QuestionState,
  PayloadAction<{ id: string; deletingPageQuestionPage: number }>
> = (state, action) => {
  const { id, deletingPageQuestionPage } = action.payload;
  state.questions = state.questions.filter((question) => question.id !== id);
  state.editingQuestionId = null;
  state.editingFormPage =
    deletingPageQuestionPage === 1 ? deletingPageQuestionPage : deletingPageQuestionPage - 1;
};

const updateSiglePropOfQuestion: CaseReducer<
  QuestionState,
  PayloadAction<{
    id: string;
    actionType: string;
    text?: string;
    number?: number;
    stringArr?: string[];
    validations?: Validation;
  }>
> = (state, action) => {
  const { id, actionType, text, number, stringArr, validations } = action.payload;

  const responsedActionTypeConfig: { [key: string]: string } = {
    ...questionActionType,
  };

  const updateValueConfig: { [key: string]: UpdateValue } = {
    title: text,
    note: text,
    type: text,
    page: number,
    options: stringArr,
    matrixs: stringArr,
    validations: validations,
  };

  const updateStateKey = responsedActionTypeConfig[actionType.toUpperCase()];
  const updateStateValue = updateValueConfig[updateStateKey];

  state.questions = state.questions.map((question) => {
    if (question.id !== id) return question;
    return {
      ...question,
      [updateStateKey]: updateStateValue,
    };
  });
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

const switchEditingField: CaseReducer<
  QuestionState,
  PayloadAction<{
    id: string | null;
    page: number;
  }>
> = (state, action) => {
  const { id, page } = action.payload;
  state.editingQuestionId = id;
  state.editingFormPage = page;
};

const switchEditingQuestion: CaseReducer<QuestionState, PayloadAction<string | null>> = (
  state,
  action
) => {
  state.editingQuestionId = action.payload;
};

const switchCreatingFormStep: CaseReducer<QuestionState, PayloadAction<number>> = (
  state,
  action
) => {
  state.currentStep = action.payload;
};

const setIsEditngQuestionContent: CaseReducer<
  QuestionState,
  PayloadAction<{ setEditingState: boolean; isReset: boolean; contentType: string }>
> = (state, action) => {
  const { setEditingState, isReset, contentType } = action.payload;
  const isOptionContent = contentType === "option";
  const editingContent = isOptionContent ? "isEditingOption" : "isEditingMatrix";
  const editingContentQuantity = isOptionContent
    ? "editingOptionQuantity"
    : "editingMatrixQuantity";

  if (isReset) {
    state[editingContent] = false;
    return;
  }

  const upateEditingOptionQuantity = setEditingState
    ? state[editingContentQuantity] + 1
    : state[editingContentQuantity] - 1;

  state[editingContentQuantity] = upateEditingOptionQuantity;
  const setEditingContent = upateEditingOptionQuantity > 0 ? true : false;
  state[editingContent] = setEditingContent;
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

  const id = helper.generateId(8);

  const defaultQuestion = {
    ...questionDefaultConfig[defaultQuestionType],
    id,
    page: action.payload.newPage,
  };

  state.editingQuestionId = id;
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
  switchEditingField,
  switchCreatingFormStep,
  setIsEditngQuestionContent,
  addNewFormPage,
  updateQuestionPage,
};
