import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepState {
  step: number;
  totalSteps: number;
}

const initialState: StepState = {
  step: 1,
  totalSteps: 14,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.step < state.totalSteps) {
        state.step += 1;
      }
    },
    previousStep: (state) => {
      if (state.step > 1) {
        state.step -= 1;
      }
    },
    setStep: (state, action: PayloadAction<number>) => {
      if (action.payload >= 1 && action.payload <= state.totalSteps) {
        state.step = action.payload;
      }
    },
    setTotalSteps: (state, action: PayloadAction<number>) => {
      state.totalSteps = action.payload;
    },
  },
});

export const { nextStep, previousStep, setStep, setTotalSteps } = stepSlice.actions;

export const selectStepState = (state: any) => state.step;

export default stepSlice.reducer;
