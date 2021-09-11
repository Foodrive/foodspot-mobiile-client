import { StyleSheet } from "react-native";
import { grid } from "@app/utils";

const styles = StyleSheet.create({
  container: {
    padding: grid.outerRule,
  },
  buttonContainer: {
    marginBottom: grid.tabBarHeight,
  },
  saveButton: {
    marginBottom: 10,
  },
});

export default styles;
