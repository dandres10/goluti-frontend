import { configureStore } from "@reduxjs/toolkit";
import { keyAppointment, appointmentSlice } from "../../../infrastructure/repositories/redux/bus/appointment.slice";

export const storeAppointment = configureStore({
  reducer: {
    [keyAppointment]: appointmentSlice.reducer
  },
  devTools: {
    name: 'goluti - appointment',
    trace: true, 
  },
});



export type RootState = ReturnType<typeof storeAppointment.getState>;
export type AppDispatch = typeof storeAppointment.dispatch;
