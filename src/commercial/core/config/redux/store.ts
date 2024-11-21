import { configureStore } from "@reduxjs/toolkit";
import { keyCommercial, commercialSlice } from "../../../infrastructure/repositories/redux/bus/commercial.slice";

export const storeCommercial = configureStore({
  reducer: {
    [keyCommercial]: commercialSlice.reducer
  },
  devTools: {
    name: 'goluti - commercial',
    trace: true, 
  },
});

export type RootState = ReturnType<typeof storeCommercial.getState>;
export type AppDispatch = typeof storeCommercial.dispatch;
