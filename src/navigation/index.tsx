import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SCREEN_NAMES from "./screen.names";
import { HomeScreen } from "@app/screens";

const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator initialRouteName={SCREEN_NAMES.home} headerMode="none">
    <Stack.Screen name={SCREEN_NAMES.home} component={HomeScreen} />
  </Stack.Navigator>
);

export default RootStack;
