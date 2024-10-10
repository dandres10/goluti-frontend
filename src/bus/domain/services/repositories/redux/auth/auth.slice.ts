import { createSlice } from "@reduxjs/toolkit";
import { addPlatformReducer } from "./auth.reducer";


export const keyAuth = "bus";

export interface IInitialStateRedux {
  platform: any;
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
