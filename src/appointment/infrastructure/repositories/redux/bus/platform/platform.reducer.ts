import { PayloadAction } from "@reduxjs/toolkit";
import { IInitialStateReduxDTO } from "../appointment.slice";
import { IPlatformReduxDTO } from "../../../../../domain/models/redux/bus/platform";

export const addPlatformReducer = (state: IInitialStateReduxDTO, action: PayloadAction<IPlatformReduxDTO>) => {
  state.platform = action.payload;
};
