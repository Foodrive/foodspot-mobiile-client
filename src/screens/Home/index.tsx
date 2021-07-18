import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import Input from "@app/components/ui/Input";

interface HomeScreenProps {
  appName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ appName }) => (
  <View style={styles.container}>
    <Input id="home-input" type="email" />
    <Text style={styles.text}>This is the home screen of {appName}</Text>
  </View>
);

export default HomeScreen;
