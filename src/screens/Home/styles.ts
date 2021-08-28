import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { montserrat } from "@app/utils";
import { grid } from "@app/utils";

export const useStyles = () =>
  StyleSheet.create({
    content: {
      padding: grid.outerRule,
    },
    headerText: {
      fontSize: RFValue(18),
      textAlign: "center",
      fontFamily: montserrat.bold,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
  });
