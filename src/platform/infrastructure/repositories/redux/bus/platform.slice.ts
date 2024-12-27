import { createSlice } from "@reduxjs/toolkit";
import { updatePlatformReducer } from "./platform/platform.reducer";
import { IPlatformReduxDTO } from "../../../../domain/models/redux/bus/platform";


export const keyPlatform = "platform";

export interface IInitialStateReduxDTO {
  platform: IPlatformReduxDTO | null;
}

const initialState: IInitialStateReduxDTO = {
  platform: null,
};

export const platformSlice = createSlice({
  name: keyPlatform,
  initialState,
  reducers: {
    updatePlatformAction: updatePlatformReducer,
  },
});
