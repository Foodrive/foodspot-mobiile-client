import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import DateTimeInput from "@app/components/ui/DateTimeInput/DateTimeInput";
import Input from "@app/components/ui/Input";
import Card from "@app/components/ui/Card";
import Button from "@app/components/ui/Button";

interface HomeScreenProps {
  appName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ appName }) => {
  const [date, setDate] = useState<string>("2021-07-22T10:18:00.000Z");
  return (
    <View style={styles.container}>
      <Input id="normal-input" type="email" placeholder="Enter email" />
      <DateTimeInput
        id="date-input"
        onConfirm={(newDate) => setDate(newDate)}
        value={date}
      />
      <Card id="home-Card" title="Free food!!" info={<Text>Info FC</Text>}>
        <Text>Add Children Here</Text>
      </Card>
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
