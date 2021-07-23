import React from "react";
import { CheckBox, CheckBoxProps } from 'react-native-elements'

interface CheckBoxItemProps extends CheckBoxProps {
  id: string;
  title: string;
}

const CheckBoxItem: React.FC<CheckBoxItemProps> = ({ id, title, ...rest}) => (
  <CheckBox data-testid={id} title={title} {...rest} />
);

export default CheckBoxItem;