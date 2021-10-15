import { StyleSheet } from "react-native";
import { grid } from "@app/utils";

export const useStyles = () =>
  StyleSheet.create({
    bodyContainer: {
      marginBottom: grid.tabBarHeight,
      flexDirection: "column",
      paddingHorizontal: grid.genericSpacing,
    },
  });
