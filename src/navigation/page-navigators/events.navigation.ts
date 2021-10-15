import { createPageNavigator, NavScreen } from "../utils";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { Events, EventProgress, PendingInvites } from "@app/screens";

const screens: NavScreen[] = [
  {
    name: SCREEN_NAMES.events.eventsListView,
    component: Events,
  },
  {
    name: SCREEN_NAMES.events.eventProgress,
    component: EventProgress,
  },
  {
    name: SCREEN_NAMES.events.pendingInvites,
    component: PendingInvites,
  },
];

export default createPageNavigator(screens, SCREEN_NAMES.events.eventsListView);
