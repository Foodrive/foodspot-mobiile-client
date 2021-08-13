import React from "react";
import { Text, TouchableHighlight } from "react-native";
import { useStyles } from "./styles";
import { colors } from "@app/utils";

interface MenuItemProps {
  label: string;
  onPress: (value: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onPress }) => {
  const styles = useStyles();
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() => onPress(label)}
      underlayColor={colors.lightbrown}
    >
      <Text>{label}</Text>
    </TouchableHighlight>
  );
};

export default MenuItem;
