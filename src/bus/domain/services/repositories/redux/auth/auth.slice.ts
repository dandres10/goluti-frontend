import { createSlice } from "@reduxjs/toolkit";
import { addPlatformReducer } from "./auth.reducer";
import { IPlatformReduxDTO } from "@/bus/domain/models/redux/platform";


export const keyAuth = "bus";

export interface IInitialStateRedux {
  platform: IPlatformReduxDTO | null;
}

const initialState: IInitialStateRedux = {
  platform: null,
};

export const authSlice = createSlice({
  name: keyAuth,
  initialState,
  reducers: {
    addPlatformAction: addPlatformReducer,
  },
});
