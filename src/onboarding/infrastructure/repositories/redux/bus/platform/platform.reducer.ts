import { PayloadAction } from "@reduxjs/toolkit";
import { IInitialStateReduxDTO } from "../onboarding.slice";
import { IPlatformReduxDTO } from "../../../../../domain/models/redux/bus/platform";

export const updatePlatformReducer = (state: IInitialStateReduxDTO, action: PayloadAction<IPlatformReduxDTO>) => {
  state.platform = action.payload;
};
