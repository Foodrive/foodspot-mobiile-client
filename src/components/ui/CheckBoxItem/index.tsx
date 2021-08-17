import React from "react";
import { CheckBox, CheckBoxProps } from "react-native-elements";
import styles from "./styles";
import { colors } from "../../../utils/index";

interface CheckBoxItemProps extends Omit<CheckBoxProps, "textStyle"> {
  id: string;
  title: string;
  checked: boolean;
}

const CheckBoxItem: React.FC<CheckBoxItemProps> = ({ id, checked, ...rest }) => (
  <CheckBox data-testid={id} textStyle={styles.textStyle} {...rest} checked={checked} checkedColor={colors.black} />
);

export default CheckBoxItem;