import { colors, montserrat } from "@app/utils";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { grid } from "@app/utils";

const styles = StyleSheet.create({
  container: {
    margin: grid.outerRule,
  },
  text: {
    fontSize: RFValue(16),
    textAlign: "left",
    fontFamily: montserrat.bold,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabs: {
    marginVertical: -20,
    flexDirection: "row",
    marginBottom: 10,
  },
  headerText: {
    fontSize: RFValue(18),
    fontFamily: montserrat.bold,
  },
  eventList: {
    marginTop: 10,
  },
  pendingText: {
    color: colors.orange,
  },
});

export default styles;
