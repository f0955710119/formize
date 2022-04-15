import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/questionReducer";

export interface Validation {
  required: boolean;
  length?: number;
  textType?: string[];
  max?: number;
  min?: number;
  decimal?: number;
  unit?: string;
  interval?: number;
  maxSelected?: number;
  maxMartixTitleQuantity?: number;
  multipleDate?: boolean;
  startDate?: string | null;
  endDate?: string | null;
}

export interface Question {
  id: string;
  page: number;
  title: string;
  note: string;
  placeholder?: string;
  type: string;
  options?: string[];
  martixs?: string[];
  validations: Validation;
}
export interface ErrorMessage {
  id: string;
  message: string;
}

export interface QuestionState {
  questionIds: string[];
  questions: Question[];
  editingQuestion: Question | null;
  willSwitcEditinghQuestion: boolean;
  accumulatedInValidInputError: ErrorMessage[];
}

const initialState: QuestionState = {
  questionIds: [""],
  questions: [],
  editingQuestion: null,
  willSwitcEditinghQuestion: false,
  accumulatedInValidInputError: [{ id: "", message: "" }],
};

// BUG: 把 type 是引言的濾掉產生的 array 長度 index + 1 就是題號，題目長度有更新要跑處理這塊的function
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers,
});

export const questionReducer = questionSlice.reducer;
export const questionActions = questionSlice.actions;
