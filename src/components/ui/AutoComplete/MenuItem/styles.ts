import { StyleSheet } from "react-native";
import { colors } from "@app/utils";

export const useStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      padding: 10,
      width: "100%",
      borderBottomColor: colors.ui.horizontalBar,
      borderBottomWidth: 1,
    },
  });
