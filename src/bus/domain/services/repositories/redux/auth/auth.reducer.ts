import { IPlatformReduxDTO } from "@/bus/domain/models/redux/platform";
import { PayloadAction } from "@reduxjs/toolkit";
import { IInitialStateRedux } from "./auth.slice";

export const addPlatformReducer = (state: IInitialStateRedux, action: PayloadAction<IPlatformReduxDTO>) => {
  state.platform = action.payload;
};
