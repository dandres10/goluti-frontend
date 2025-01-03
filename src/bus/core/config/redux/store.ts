import { configureStore } from "@reduxjs/toolkit";
import { busSlice, keyBus } from "../../../infrastructure/repositories/redux/bus/bus.slice";



export const storeBus = configureStore({
  reducer: {
    [keyBus]: busSlice.reducer
  },
  devTools: {
    name: 'goluti - bus',
    trace: true, 
  },
});

export type RootState = ReturnType<typeof storeBus.getState>;
export type AppDispatch = typeof storeBus.dispatch;
