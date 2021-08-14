import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors, grid, montserrat } from "@app/utils";

const styles = StyleSheet.create({
  cardStyle: {
    elevation: 10,
    borderRadius: 20,
    backgroundColor: colors.white,
    padding: 25,
    margin: 0,
    marginTop: grid.genericSpacing,
    marginBottom: grid.genericSpacing,
  },
  titleText: {
    fontSize: RFValue(18),
    fontFamily: montserrat.bold,
    textAlign: "left",
    color: colors.black,
    marginBottom: 0,
    padding: 0,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default styles;
