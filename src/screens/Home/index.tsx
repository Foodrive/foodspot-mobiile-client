import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { ListItem } from "@app/components/ui";

interface HomeScreenProps {
  appName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ appName }) => (
  <View style={styles.container}>
    <View style={{ width: "100%", padding: 20 }}>
      <ListItem
        id="test"
        title="Something"
        otherInformation="Otherinfo"
        onClick={() => console.log("MMM")}
      />
    </View>
    <Text style={styles.text}>This is the home screen of {appName}</Text>
  </View>
);

export default HomeScreen;
