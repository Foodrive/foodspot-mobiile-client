import React from "react";
import { StatusBar } from "expo-status-bar";
import AppProvider from "@app/components/common/AppProvider";
import RootStack from "@app/navigation";

export default function App() {
  return (
    <AppProvider>
      <RootStack />
      <StatusBar style="auto" hidden />
    </AppProvider>
  );
}
