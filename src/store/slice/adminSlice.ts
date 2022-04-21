import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/adminReducer";

export interface Admin {
  uid: string;
  editingGroupId: string;
  newSurveyId: string;
  driveToken: {
    accessToken: string;
    refreshToken: string;
    scope: string;
    tokenType: string;
    expiryDate: number;
  };
}

const initialState: Admin = {
  uid: "",
  editingGroupId: "d4HICCM6",
  newSurveyId: "",
  driveToken: {
    accessToken:
      "ya29.A0ARrdaM_fbI4lrse59c55TzKPylB-TGVdd2WJq8Dmj58d3ZMFX65BC-pEyaxPvFHlJoly4KbHRGBteVOfk2BWorOGOnA5ir82Sa-oKbWA5K02aGtQj67LNBlTr_D8BQyTL1tYIiIxn2V8FFZMrWO0GyYQSpfC",
    refreshToken: "",
    scope: "",
    tokenType: "",
    expiryDate: 0,
  },
};

const adminSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const adminReducer = adminSlice.reducer;
export const adminActions = adminSlice.actions;
