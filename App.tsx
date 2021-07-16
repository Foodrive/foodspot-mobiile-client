import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import AppProvider from "@app/components/common/AppProvider";
import RootStack from "@app/navigation";

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  const getCachedResources = useCallback(async () => {
    // Load cached assets here
    // Can use expo-asset for cache control
  }, []);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={getCachedResources}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AppProvider>
      <RootStack />
      <StatusBar style="auto" hidden />
    </AppProvider>
  );
};

export default App;
