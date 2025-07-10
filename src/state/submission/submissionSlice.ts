// src/state/submissionSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SubmissionState {
  isSubmitting: boolean;
}

const initialState: SubmissionState = {
  isSubmitting: false, // Initially, it's false
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
  },
});

export const { setIsSubmitting } = submissionSlice.actions;

export default submissionSlice.reducer;
