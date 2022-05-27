import { configureStore } from "@reduxjs/toolkit";

import { questionReducer } from "./slice/questionSlice";
import { userReducer } from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    question: questionReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
