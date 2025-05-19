import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import submissionReducer from "./submission/submissionSlice";
import navbarReducer from "./navbar/navbarSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    submission: submissionReducer,
    navbar: navbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
