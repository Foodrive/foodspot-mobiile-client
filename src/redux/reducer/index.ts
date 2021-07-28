import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "../slices/user.slice";

export default combineReducers({
  user: userReducer,
});
