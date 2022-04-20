import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/adminReducer";

export interface Admin {
  uid: string;
  editingGroupId: string;
  newSurveyId: string;
  driveToken: string;
}

const initialState: Admin = {
  uid: "",
  editingGroupId: "d4HICCM6",
  newSurveyId: "",
  driveToken: "",
};

const adminSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const adminReducer = adminSlice.reducer;
export const adminActions = adminSlice.actions;
