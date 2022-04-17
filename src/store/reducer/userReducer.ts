import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../slice/userSlice";

const updateLoginState: CaseReducer<User, PayloadAction<string>> = (
  state,
  action
) => {
  state.uid = action.payload;
};

const switchEditingGroup: CaseReducer<User, PayloadAction<string>> = (
  state,
  action
) => {
  state.editingGroupId = action.payload;
};

const createNewSurveyId: CaseReducer<User, PayloadAction<string>> = (
  state,
  action
) => {
  state.newSurveyId = action.payload;
};

export default {
  updateLoginState,
  switchEditingGroup,
  createNewSurveyId,
};
