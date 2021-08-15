import { createPageNavigator, NavScreen } from "@app/navigation/utils";
import SCREEN_NAMES from "./screen.names";
import { AppNavigation } from "@app/navigation/AppNavigation";
import { EventDetails, LoginScreen, RegisterScreen } from "@app/screens";
import BasicDetails from "@app/screens/common/create-edit-events/BasicDetails/BasicDetails";

// Root screens. Put application-wide screens here

const screens: NavScreen[] = [
  {
    name: SCREEN_NAMES.common.app,
    component: AppNavigation,
  },
  {
    name: SCREEN_NAMES.common.login,
    component: LoginScreen,
  },
  {
    name: SCREEN_NAMES.common.registration,
    component: RegisterScreen,
  },
  {
    name: SCREEN_NAMES.common.events.eventDetails,
    component: EventDetails,
  },
  {
    name: SCREEN_NAMES.common.events.basicDetails,
    component: BasicDetails,
  },
];

export default createPageNavigator(screens, SCREEN_NAMES.common.login);
