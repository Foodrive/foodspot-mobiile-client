import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventCreateData, EventType } from "@app/types/event.types";

// Payload Types
type CreateDataChange = Partial<EventCreateData>;

export interface EventsState {
  createData?: EventCreateData;
  currentEventId: string | null;
}

const initialState: EventsState = {
  currentEventId: null,
  createData: undefined,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setCurrentEventId: (state, action: PayloadAction<string | null>) => {
      state.currentEventId = action.payload;
    },
    resetCreateData(state) {
      state.createData = undefined;
    },
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

export const {
  setCurrentEventId,
  initCreate,
  updateCreateData,
  resetCreateData,
} = eventsSlice.actions;

export default eventsSlice.reducer;
