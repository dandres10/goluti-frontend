import { configureStore } from "@reduxjs/toolkit";
import { keyOnboarding, onboardingSlice } from "../../../infrastructure/repositories/redux/bus/onboarding.slice";

export const storeOnboarding = configureStore({
  reducer: {
    [keyOnboarding]: onboardingSlice.reducer
  },
  devTools: {
    name: 'goluti - onboarding',
    trace: true, 
  },
});

export type RootState = ReturnType<typeof storeOnboarding.getState>;
export type AppDispatch = typeof storeOnboarding.dispatch;
