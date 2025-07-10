import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ExpandedMenuState {
    expandMenu: boolean;
};

const initialState: ExpandedMenuState = {
    expandMenu: false,
};

const expandedMenuSlice = createSlice({
    name: "expandedMenu",
    initialState,
    reducers: {
        setExpandMenu(state, action: PayloadAction<boolean>) {
            state.expandMenu = action.payload;
        },
    },
});

export const { setExpandMenu } = expandedMenuSlice.actions;
export default expandedMenuSlice.reducer;