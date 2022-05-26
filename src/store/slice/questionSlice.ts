import { createSlice } from "@reduxjs/toolkit";

import { Question } from "../../types/question";
import reducers from "../reducer/questionReducer";
export interface ErrorMessage {
  id: string;
  message: string;
}

export interface QuestionState {
  questions: Question[];
  editingQuestionId: string | null;
  currentStep: number;
  editingFormPage: number;
  isEditingOption: boolean;
  editingOptionQuantity: number;
  isEditingMatrix: boolean;
  editingMatrixQuantity: number;
}

const initialState: QuestionState = {
  questions: [],
  editingQuestionId: null,
  currentStep: 1,
  editingFormPage: 1,
  isEditingOption: false,
  editingOptionQuantity: 0,
  isEditingMatrix: false,
  editingMatrixQuantity: 0,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers,
});

export const questionReducer = questionSlice.reducer;
export const questionActions = questionSlice.actions;
