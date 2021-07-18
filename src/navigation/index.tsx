import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeNavigation,
  EventsNavigation,
  ProfileNavigation,
  RequestsNavigation,
  VolunteerNavigation,
} from "./page-navigators";
import SCREEN_NAMES from "@app/navigation/screen.names";

const Tab = createBottomTabNavigator();

const AppNavigation: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen name={SCREEN_NAMES.app.home} component={HomeNavigation} />
    <Tab.Screen name={SCREEN_NAMES.app.events} component={EventsNavigation} />
    <Tab.Screen name={SCREEN_NAMES.app.profile} component={ProfileNavigation} />
    <Tab.Screen
      name={SCREEN_NAMES.app.requests}
      component={RequestsNavigation}
    />
    <Tab.Screen
      name={SCREEN_NAMES.app.volunteer}
      component={VolunteerNavigation}
    />
  </Tab.Navigator>
);

export default AppNavigation;
