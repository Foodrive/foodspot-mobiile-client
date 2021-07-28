import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventCreateData, EventType } from "@app/types/event.types";

// Payload Types
type CreateDataChange = Partial<EventCreateData>;

// State

interface EventState {
  createData?: EventCreateData;
}

const initialState: EventState = {
  createData: undefined,
};

// Slice

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    initCreate(state, action: PayloadAction<EventType>) {
      state.createData = {
        type: action.payload,
      };
    },
    updateCreateData(state, action: PayloadAction<CreateDataChange>) {
      if (!state.createData) {
        return;
      }
      const { payload } = action;
      state.createData = {
        ...state.createData,
        ...payload,
      };
    },
  },
});

export const { initCreate, updateCreateData } = eventSlice.actions;

export default eventSlice.reducer;
