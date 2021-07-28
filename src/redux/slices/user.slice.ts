import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  currentUser?: string; // username of logged in user
}

const initialState: UserState = {
  currentUser: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<string>) {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
