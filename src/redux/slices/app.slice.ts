// TODO sample redux slice. Can remove
import { createSlice } from "@reduxjs/toolkit";
import Constants from "expo-constants";

export interface AppSlice {
  appName: string;
}

const initialState: AppSlice = {
  appName: Constants.manifest.name || "app-name",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppName(state, action) {
      state.appName = action.payload;
    },
  },
});

export const { setAppName } = appSlice.actions;

export default appSlice.reducer;
