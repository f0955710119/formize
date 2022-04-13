import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/questionReducer";

export interface Validation {
  required: boolean;
  length?: number;
  textType?: number;
  max?: number;
  min?: number;
  decimal?: number;
  unit?: string;
  interval?: number;
  maxSelected?: number;
  maxMartixTitleQuantity?: number;
  multipleDate?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface Question {
  id: string;
  page: number;
  title: string;
  note: string;
  placeholder?: string;
  type: number;
  options?: string[];
  martixs?: string[];
  validations: Validation;
}

export interface QuestionState {
  questionIds: string[];
  questions: Question[];
}

const initialState: QuestionState = {
  questionIds: [""],
  questions: [],
};

// BUG: 把 type 是引言的濾掉產生的 array 長度 + 1，就是題號，題目長度有更新就要跑這個function
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers,
});

export const questionReducer = questionSlice.reducer;
export const questionActions = questionSlice.actions;
