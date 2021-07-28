import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "../slices/user.slice";
import eventReducer from "../slices/event.slice";

export default combineReducers({
  user: userReducer,
  events: eventReducer,
});
