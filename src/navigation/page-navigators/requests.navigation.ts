import { createPageNavigator, NavScreen } from "./utils";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { RequestMap } from "@app/screens";

const screens: NavScreen[] = [
  {
    name: SCREEN_NAMES.requests.requestMap,
    component: RequestMap,
  },
];

export default createPageNavigator(screens, SCREEN_NAMES.requests.requestMap);
