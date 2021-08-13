import React, { ComponentClass, FC, FunctionComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ConnectedComponent } from "react-redux";

export interface NavScreen {
  name: string;
  component:
    | ConnectedComponent<FC<any>, any>
    | ComponentClass
    | FunctionComponent
    | FC<any>;
}

export const createPageNavigator = (
  screens: NavScreen[],
  initialRoute: string,
) => {
  const Stack = createStackNavigator();

  const NavigationComponent: React.FC = () => (
    <Stack.Navigator initialRouteName={initialRoute} headerMode="none">
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );

  return NavigationComponent;
};
