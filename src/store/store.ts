import { configureStore } from '@reduxjs/toolkit';
import stepReducer from '../slices/stepSlice';

import upcomingPageReducer from '../slices/upcomingPageSlice';

export const store = configureStore({
  reducer: {
    step: stepReducer,
    upcomingPage: upcomingPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;