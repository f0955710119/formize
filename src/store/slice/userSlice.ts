import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/userReducer";

import type { UserAnswer, UserAnswerErrorMessage } from "../../types/userForm";

export interface UserState {
  answers: UserAnswer[];
  questionIdKeys: {
    [key: string]: number | string;
  };
  errorMessages: UserAnswerErrorMessage[];
  errorMessagesIdKeys: {
    [key: string]: number;
  };
}

const initialState: UserState = {
  answers: [],
  questionIdKeys: {},
  errorMessages: [],
  errorMessagesIdKeys: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
