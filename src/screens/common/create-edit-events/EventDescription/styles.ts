import { StyleSheet } from "react-native";
import { grid } from "@app/utils";

export const useStyles = () =>
  StyleSheet.create({
    container: {
      padding: grid.outerRule,
    },
  });
