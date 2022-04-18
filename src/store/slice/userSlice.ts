import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/userReducer";

export interface User {
  uid: string;
  editingGroupId: string;
  newSurveyId: string;
}

const initialState: User = {
  uid: "",
  editingGroupId: "d4HICCM6",
  newSurveyId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
