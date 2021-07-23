import React from "react";
import { CheckBox, CheckBoxProps } from 'react-native-elements'

interface CheckBoxItemProps extends CheckBoxProps {
  id: string;
  title: string;
}

const CheckBoxItem: React.FC<CheckBoxItemProps> = ({ id, ...rest}) => (
  <CheckBox data-testid={id} {...rest} />
);

export default CheckBoxItem;