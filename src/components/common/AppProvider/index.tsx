import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import ErrorBoundary from "../ErrorBoundary";
import store from "@app/redux/store";
import { ApolloProvider } from "@apollo/client";
import client from "@app/graphql/client";

const AppProvider: React.FC = ({ children }) => (
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>{children}</NavigationContainer>
      </Provider>
    </ApolloProvider>
  </ErrorBoundary>
);

export default AppProvider;
