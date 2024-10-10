import { configureStore } from "@reduxjs/toolkit";
import { authSlice, keyAuth } from "../domain/services/repositories/redux/auth";

export const storeBus = configureStore({
  reducer: {
    [keyAuth]: authSlice.reducer
  },
});

export type RootState = ReturnType<typeof storeBus.getState>;
export type AppDispatch = typeof storeBus.dispatch;
