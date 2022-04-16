import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { Login } from "../slice/loginSlice";

const updateLoginState: CaseReducer<Login, PayloadAction<string>> = (
  state,
  action
) => {
  state.uid = action.payload;
};

export default {
  updateLoginState,
};
