import { createPageNavigator, NavScreen } from "./utils";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { HomeScreen } from "@app/screens";

const screens: NavScreen[] = [
  {
    name: SCREEN_NAMES.home.listView,
    component: HomeScreen,
  },
];

export default createPageNavigator(screens, SCREEN_NAMES.home.listView);
