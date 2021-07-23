import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import Input from "@app/components/ui/Input";
import Card from "@app/components/ui/Card";
import Button from "@app/components/ui/Button";
import IconButton from "@app/components/ui/IconButton";

interface HomeScreenProps {
  appName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ appName }) => {
  return (
    <View style={styles.container}>
      <Card id="home-Card" title="Free food!!" info={<Text>Info FC</Text>}>
        <Text>Add Children Here</Text>
      </Card>
      <IconButton
        icon="add"
        color="secondary"
        size="md"
        onPress={() => console.log("bbb")}
      />
      <Input id="home-input" type="email" />
      <Text style={styles.text}>This is the home screen of {appName}</Text>
      <Button
        id="my nem jeff"
        title="my nem jeff"
        color="secondary"
        onPress={() => {
          alert("my nem jeff");
        }}
      />
    </View>
  );
};

export default HomeScreen;
