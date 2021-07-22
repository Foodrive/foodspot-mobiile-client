import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import Input from "@app/components/ui/Input";
import Card from "@app/components/ui/Card";

interface HomeScreenProps {
  appName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ appName }) => {
  return (
    <View style={styles.container}>
      <Card id="home-Card" title="Free food!!" info={<Text>Info FC</Text>}>
        <Text>Add Children Here</Text>
      </Card>
      <Input id="home-input" type="email" />
      <Text style={styles.text}>This is the home screen of {appName}</Text>
    </View>
  );
};

export default HomeScreen;
