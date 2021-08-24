import { StyleSheet } from "react-native";
import { montserrat } from "@app/utils";
import { RFValue } from "react-native-responsive-fontsize";

export const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      alignItems: "center",
      padding: 20,
    },
    card: {
      marginTop: "25%",
      flexDirection: "column",
      width: "100%",
    },
    headerText: {
      fontSize: RFValue(18),
      fontFamily: montserrat.bold,
      paddingLeft: 10,
      marginBottom: 10,
    },
    backButton: {
      position: "absolute",
      top: 10,
      left: 10,
    },
  });
