import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

interface HomeScreenProps {
  appName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ appName }) => (
  <View style={styles.container}>
    <Text style={styles.text}>This is the home screen of {appName}</Text>
  </View>
);

export default HomeScreen;
