import { PayloadAction } from "@reduxjs/toolkit";
import { IInitialStateReduxDTO } from "../platform.slice";
import { IPlatformReduxDTO } from "../../../../../domain/models/redux/bus/platform";

export const updatePlatformReducer = (state: IInitialStateReduxDTO, action: PayloadAction<IPlatformReduxDTO | null>) => {
  state.platform = action.payload;
};
