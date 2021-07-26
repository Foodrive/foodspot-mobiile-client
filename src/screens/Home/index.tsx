import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

interface HomeScreenProps {
  appName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = () => (
  <View style={styles.container}>
    <Text>home page</Text>
  </View>
);

export default HomeScreen;
