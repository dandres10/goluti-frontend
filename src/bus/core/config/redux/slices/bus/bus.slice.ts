import { createSlice } from "@reduxjs/toolkit";
import { IPlatformReduxDTO } from "../../../../../domain/models/redux/bus/platform";
import { addPlatformReducer } from "../../../../../infrastructure/repositories/redux/bus/platform/platform.reducer";



export const keyBus = "bus";

export interface IInitialStateReduxDTO {
  platform: IPlatformReduxDTO | null;
}

const initialState: IInitialStateReduxDTO = {
  platform: null,
};

export const busSlice = createSlice({
  name: keyBus,
  initialState,
  reducers: {
    addPlatformAction: addPlatformReducer,
  },
});
