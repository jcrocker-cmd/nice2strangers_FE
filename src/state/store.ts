import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import submissionReducer from "./submission/submissionSlice";
import navbarReducer from "./navbar/navbarSlice";
import expandedMenuReducer from "./expand_menu/expandMenuSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    submission: submissionReducer,
    navbar: navbarReducer,
    expandedMenu: expandedMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
