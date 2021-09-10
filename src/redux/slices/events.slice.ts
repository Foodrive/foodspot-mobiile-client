import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventType, EventCreateData } from "@app/types/event.types";

// Payload Types
type CreateDataChange = Partial<EventCreateData>;

export interface EventsState {
  createData?: EventCreateData;
  currentEventId: string | null;
  ceEventFlowTitle?: string; // create or edit event title
}

const initialState: EventsState = {
  currentEventId: null,
  createData: undefined,
  ceEventFlowTitle: undefined,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setCurrentEventId: (state, action: PayloadAction<string | null>) => {
      state.currentEventId = action.payload;
    },
    resetCreateData(state) {
      state.ceEventFlowTitle = undefined;
      state.createData = undefined;
    },
    initCreate(state, action: PayloadAction<EventType>) {
      state.ceEventFlowTitle = "Create Event";
      state.createData = {
        type: action.payload,
      };
    },
    setCeEventFlowTitle(state, action: PayloadAction<string>) {
      state.ceEventFlowTitle = action.payload;
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
  setCeEventFlowTitle,
} = eventsSlice.actions;

export default eventsSlice.reducer;
