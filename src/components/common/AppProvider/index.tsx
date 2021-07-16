import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import ErrorBoundary from "../ErrorBoundary";
import store from "@app/redux/store";

const AppProvider: React.FC = ({ children }) => (
  <ErrorBoundary>
    <Provider store={store}>
      <NavigationContainer>{children}</NavigationContainer>
    </Provider>
  </ErrorBoundary>
);

export default AppProvider;
