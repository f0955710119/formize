import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/loginReducer";

export interface Login {
  uid: string;
}

const initialState: Login = {
  uid: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers,
});

export const loginReducer = loginSlice.reducer;
export const loginActions = loginSlice.actions;
