import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "../slices/user.slice";
import eventsReducer from "../slices/events.slice";

export default combineReducers({
  user: userReducer,
  events: eventsReducer,
});
