import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  listStyle: { elevation: 2, borderRadius: 10 },
  titleText: {
    fontSize: RFValue(18),
    fontWeight: "bold",
  },
  subtitleText: {},
});

export default styles;
