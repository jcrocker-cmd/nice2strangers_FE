// navbarSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface NavbarState {
  isOpen: boolean;
}

const initialState: NavbarState = {
  isOpen: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = navbarSlice.actions;
export default navbarSlice.reducer;
