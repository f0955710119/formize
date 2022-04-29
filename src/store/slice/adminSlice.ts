import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/adminReducer";

export interface Admin {
  uid: string;
  editingGroupId: string;
  newFormId: string;
  driveToken?: {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    expiry_date: number;
  };
}

const initialState: Admin = {
  uid: "",
  editingGroupId: "d4HICCM6",
  newFormId: "",
};

const adminSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const adminReducer = adminSlice.reducer;
export const adminActions = adminSlice.actions;
