import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/questionReducer";
import { Question } from "../../types/question";
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
