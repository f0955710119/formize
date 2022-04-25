import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { Admin } from "../slice/adminSlice";

const updateLoginState: CaseReducer<Admin, PayloadAction<string>> = (
  state,
  action
) => {
  state.uid = action.payload;
};

const switchEditingGroup: CaseReducer<Admin, PayloadAction<string>> = (
  state,
  action
) => {
  state.editingGroupId = action.payload;
};

const createNewSurveyId: CaseReducer<Admin, PayloadAction<string>> = (
  state,
  action
) => {
  state.newSurveyId = action.payload;
};

// const setUserDriveToken: CaseReducer<
//   Admin,
//   PayloadAction<{
//     accessToken: string;
//     refreshToken: string;
//     scope: string;
//     tokenType: string;
//     expiryDate: number;
//   }>
// > = (state, action) => {
//   state.driveToken = action.payload;
// };

export default {
  updateLoginState,
  switchEditingGroup,
  createNewSurveyId,
  // setUserDriveToken,
};
