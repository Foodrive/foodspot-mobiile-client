import { StyleSheet } from "react-native";

export const useStyles = () =>
  StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
    },
    menuContainer: {
      position: "absolute",
      zIndex: 1,
      width: "100%",
      top: "70%",
      paddingHorizontal: 10,
    },
    menuList: {
      width: "100%",
    },
  });
