import { StyleSheet } from "react-native";
import { colors, montserrat } from "@app/utils";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 15,
    borderColor: colors.darkAccent,
    borderWidth: 1,
    borderRadius: 5,
  },
  uneditableInput: {
    paddingLeft: 5,
    fontFamily: montserrat.regular,
    color: "#CCCCCC",
  },
  input: {
    paddingLeft: 5,
    fontFamily: montserrat.regular,
  },
  label: {
    color: colors.dark,
    fontSize: RFValue(14),
  },
  errorStyle: {
    color: colors.danger,
    fontSize: RFValue(12),
  },
});

export default styles;
