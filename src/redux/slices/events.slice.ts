import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EventsState {
  currentEventId: string | null;
}

const initialState: EventsState = {
  currentEventId: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setCurrentEventId: (state, action: PayloadAction<string | null>) => {
      state.currentEventId = action.payload;
    },
  },
});

export const { setCurrentEventId } = eventsSlice.actions;

export default eventsSlice.reducer;
