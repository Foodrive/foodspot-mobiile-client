import React from "react";
import { CheckBox, CheckBoxProps } from "react-native-elements";
import styles from "./styles";

interface CheckBoxItemProps extends Omit<CheckBoxProps, "textStyle"> {
  id: string;
  title: string;
}

const CheckBoxItem: React.FC<CheckBoxItemProps> = ({ id, ...rest }) => (
  <CheckBox data-testid={id} textStyle={styles.textStyle} {...rest} />
);

export default CheckBoxItem;
