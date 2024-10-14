import { PayloadAction } from "@reduxjs/toolkit";
import { IInitialStateReduxDTO } from "../bus.slice";
import { IPlatformReduxDTO } from "../../../../../domain/models/redux/bus/platform";

export const addPlatformReducer = (state: IInitialStateReduxDTO, action: PayloadAction<IPlatformReduxDTO>) => {
  state.platform = action.payload;
};
