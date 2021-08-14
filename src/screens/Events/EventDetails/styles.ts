import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors, montserrat } from "@app/utils";

const styles = StyleSheet.create({
  heading: {
    fontSize: RFValue(24),
    textAlign: "center",
    fontFamily: montserrat.bold,
    marginLeft: 15,
  },
  mainContainer: {
    padding: 18,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  subheadingContainer: {
    marginBottom: 12,
  },
  subheadingWithButtonContainer: {
    marginRight: 70,
  },
  subheading: {
    fontSize: RFValue(18),
    fontFamily: montserrat.bold,
    marginRight: 8,
  },
  text: {
    fontSize: RFValue(18),
    fontFamily: montserrat.regular,
  },
  subtext: {
    fontFamily: montserrat.lightItalic,
  },
  todayText: {
    fontSize: RFValue(18),
    color: colors.green,
  },
  tags: {
    marginTop: 6,
  },

  floatingIconButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  buttonTitle: {
    fontSize: RFValue(18),
    color: "white",
  },
});

export default styles;
