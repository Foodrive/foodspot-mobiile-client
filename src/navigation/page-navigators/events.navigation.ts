import { createPageNavigator, NavScreen } from "../utils";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { Events } from "@app/screens";

const screens: NavScreen[] = [
  {
    name: SCREEN_NAMES.events.eventsListView,
    component: Events,
  },
];

export default createPageNavigator(screens, SCREEN_NAMES.events.eventsListView);
