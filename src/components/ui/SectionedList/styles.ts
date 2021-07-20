import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { montserrat } from "@app/utils";

const styles = StyleSheet.create({
  listStyles: {
    width: "100%",
    padding: 20,
  },
  sectionContainer: {
    marginVertical: 10,
  },
  sectionText: {
    fontSize: RFValue(16),
    fontFamily: montserrat.semiBold,
  },
});

export default styles;
