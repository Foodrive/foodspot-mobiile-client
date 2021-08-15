import { StyleSheet } from "react-native";
import { grid, montserrat } from "@app/utils";
import { RFValue } from "react-native-responsive-fontsize";

export const useStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    heading: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconButton: {
      marginRight: 10,
    },
    headingText: {
      fontSize: RFValue(18),
      fontFamily: montserrat.bold,
    },
    actions: {
      flexDirection: "row",
    },
  });
