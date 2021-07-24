import { StyleSheet } from "react-native";
import { colors, grid, montserrat } from "@app/utils";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  content: {
    alignItems: "center",
    padding: grid.genericSpacing,
    width: "100%",
    height: "100%",
  },
  logo: {
    marginVertical: grid.genericSpacing,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: RFValue(38),
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: montserrat.bold,
    color: colors.secondary,
  },
});

export default styles;
