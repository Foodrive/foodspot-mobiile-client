import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeNavigation,
  EventsNavigation,
  ProfileNavigation,
  RequestsNavigation,
  VolunteerNavigation,
} from "../page-navigators";
import SCREEN_NAMES from "@app/navigation/screen.names";
import styles from "./styles";
import TabBarIcon from "./TabBarIcon";

const Tab = createBottomTabNavigator();

const screens = [
  {
    name: SCREEN_NAMES.app.home,
    component: HomeNavigation,
    icon: "home",
  },
  {
    name: SCREEN_NAMES.app.events,
    component: EventsNavigation,
    icon: "calendar",
  },
  {
    name: SCREEN_NAMES.app.volunteer,
    component: VolunteerNavigation,
    icon: "heart",
  },
  {
    name: SCREEN_NAMES.app.requests,
    component: RequestsNavigation,
    icon: "map",
  },
  {
    name: SCREEN_NAMES.app.profile,
    component: ProfileNavigation,
    icon: "person",
  },
];

const AppNavigation: React.FC = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      style: styles.tabStyles,
    }}
  >
    {screens.map((screen) => (
      <Tab.Screen
        key={screen.name}
        name={screen.name}
        component={screen.component}
        options={{
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              id={`${screen.name}-tab`}
              focused={focused}
              icon={screen.icon}
            />
          ),
        }}
      />
    ))}
  </Tab.Navigator>
);

export default AppNavigation;
