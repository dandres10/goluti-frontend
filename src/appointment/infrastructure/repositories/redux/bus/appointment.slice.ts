import { createSlice } from "@reduxjs/toolkit";
import { updatePlatformReducer } from "./platform/platform.reducer";
import { IPlatformReduxDTO } from "../../../../domain/models/redux/bus/platform";


export const keyAppointment = "appointment";

export interface IInitialStateReduxDTO {
  platform: IPlatformReduxDTO | null;
}

const initialState: IInitialStateReduxDTO = {
  platform: null,
};

export const appointmentSlice = createSlice({
  name: keyAppointment,
  initialState,
  reducers: {
    updatePlatformAction: updatePlatformReducer,
  },
});
