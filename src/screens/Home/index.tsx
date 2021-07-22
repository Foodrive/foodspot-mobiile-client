import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import DateTimeInput from "@app/components/ui/DateTimeInput/DateTimeInput";
import Input from "@app/components/ui/Input";

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
      <Text style={styles.text}>This is the home screen of {appName}</Text>
    </View>
  );
};

export default HomeScreen;
