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

const createNewFormId: CaseReducer<Admin, PayloadAction<string>> = (
  state,
  action
) => {
  state.newFormId = action.payload;
};

export default {
  updateLoginState,
  switchEditingGroup,
  createNewFormId,
};
