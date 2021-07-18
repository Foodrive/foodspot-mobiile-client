import { createPageNavigator, NavScreen } from "./utils";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { Attending } from "@app/screens";

const screens: NavScreen[] = [
  {
    name: SCREEN_NAMES.volunteer.attending,
    component: Attending,
  },
];

export default createPageNavigator(screens, SCREEN_NAMES.volunteer.attending);
