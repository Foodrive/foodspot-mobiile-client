import { createPageNavigator, NavScreen } from "./utils";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { UserEvents } from "@app/screens";

const screens: NavScreen[] = [
  {
    name: SCREEN_NAMES.events.userEvents,
    component: UserEvents,
  },
];

export default createPageNavigator(screens, SCREEN_NAMES.events.userEvents);
