import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/userReducer";

export interface Answer {
  questionId: string;
  input: string;
}

export interface UserState {
  answers: Answer[];
  questionIdKeys: {
    [key: string]: string;
  };
}

const initialState: UserState = {
  answers: [],
  questionIdKeys: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
