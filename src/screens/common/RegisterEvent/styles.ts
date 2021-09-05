import { StyleSheet } from "react-native";
import { grid } from "@app/utils";

const styles = StyleSheet.create({
  headingContainer: {
    padding: grid.outerRule,
  },
  contentContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
});

export default styles;
