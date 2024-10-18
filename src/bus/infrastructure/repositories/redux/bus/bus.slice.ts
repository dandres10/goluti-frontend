import { createSlice } from "@reduxjs/toolkit";
import { addPlatformReducer } from "./platform/platform.reducer";
import { IPlatformReduxDTO } from "../../../../domain/models/redux/bus/platform";


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
