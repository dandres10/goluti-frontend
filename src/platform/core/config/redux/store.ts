import { configureStore } from "@reduxjs/toolkit";
import { keyPlatform, platformSlice } from "../../../infrastructure/repositories/redux/bus/platform.slice";

export const storePlatform = configureStore({
  reducer: {
    [keyPlatform]: platformSlice.reducer
  },
  devTools: {
    name: 'goluti - platform',
    trace: true,
  },
});



export type RootState = ReturnType<typeof storePlatform.getState>;
export type AppDispatch = typeof storePlatform.dispatch;
