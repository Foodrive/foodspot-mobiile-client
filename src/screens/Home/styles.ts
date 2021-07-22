import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { montserrat } from "@app/utils";
import { grid } from "@app/utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: grid.outerRule,
  },
  text: {
    fontSize: RFValue(24),
    textAlign: "center",
    fontFamily: montserrat.light,
  },
});

export default styles;
