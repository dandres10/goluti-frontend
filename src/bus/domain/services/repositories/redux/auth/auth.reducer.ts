import { PayloadAction } from "@reduxjs/toolkit";

export const addPlatformReducer = (state: any, action: PayloadAction<object>) => {
  state.platform = action.payload;
};
