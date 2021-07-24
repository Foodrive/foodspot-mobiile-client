import { createPageNavigator, NavScreen } from "../utils";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { UserProfile } from "@app/screens";

const screens: NavScreen[] = [
  {
    name: SCREEN_NAMES.profile.userProfile,
    component: UserProfile,
  },
];

export default createPageNavigator(screens, SCREEN_NAMES.profile.userProfile);
