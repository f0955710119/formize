import { configureStore } from "@reduxjs/toolkit";
import { settingReducer } from "./slice/settingSlice";
import { questionReducer } from "./slice/questionSlice";
import { styleReducer } from "./slice/styleSlice";
import { userReducer } from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    setting: settingReducer,
    question: questionReducer,
    style: styleReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
