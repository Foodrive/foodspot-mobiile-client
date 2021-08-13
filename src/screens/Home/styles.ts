import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { montserrat } from "@app/utils";
import { grid } from "@app/utils";

const styles = StyleSheet.create({
  container: {
    margin: grid.outerRule,
  },
  titleText: {
    fontSize: RFValue(24),
    fontFamily: montserrat.bold,
  },
  text: {
    fontSize: RFValue(24),
    textAlign: "center",
    fontFamily: montserrat.light,
  },
});

export default styles;
