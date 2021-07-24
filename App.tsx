import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import AppProvider from "@app/components/common/AppProvider";
import Navigation from "@app/navigation";
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";
import Toast from "react-native-toast-message";

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black,
    Montserrat_900Black_Italic,
  });

  const getCachedResources = useCallback(async () => {
    // Load cached assets here
    // Can use expo-asset for cache control
  }, []);

  if (!isReady || !fontsLoaded) {
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
      <Navigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <StatusBar style="auto" hidden />
    </AppProvider>
  );
};

export default App;
