import { createSlice } from "@reduxjs/toolkit";
import { addPlatformReducer } from "./platform/platform.reducer";
import { IPlatformReduxDTO } from "../../../../domain/models/redux/bus/platform";


export const keyOnboarding = "onboarding";

export interface IInitialStateReduxDTO {
  platform: IPlatformReduxDTO | null;
}

const initialState: IInitialStateReduxDTO = {
  platform: null,
};

export const onboardingSlice = createSlice({
  name: keyOnboarding,
  initialState,
  reducers: {
    addPlatformAction: addPlatformReducer,
  },
});
