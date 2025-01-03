import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { busSlice, keyBus } from "@bus/infrastructure/repositories/redux/bus/bus.slice";
import { keyPlatform, platformSlice } from "@platform/infrastructure/repositories/redux/bus/platform.slice";
import { appointmentSlice, keyAppointment } from "@/appointment/infrastructure/repositories/redux/bus/appointment.slice";
import { commercialSlice, keyCommercial } from "@/commercial/infrastructure/repositories/redux/bus/commercial.slice";
import { keyOnboarding, onboardingSlice } from "@/onboarding/infrastructure/repositories/redux/bus/onboarding.slice";

const rootReducer = combineReducers({
    [keyBus]: busSlice.reducer,
    [keyPlatform]: platformSlice.reducer,
    [keyAppointment]: appointmentSlice.reducer,
    [keyCommercial]: commercialSlice.reducer,
    [keyOnboarding]: onboardingSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;