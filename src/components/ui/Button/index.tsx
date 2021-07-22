import React from "react";
import {
  Button as RNButton,
  ButtonProps as RNButtonProps,
} from "react-native-elements";

interface ButtonInputProps extends RNButtonProps {
  id: string;
}

const Input: React.FC<ButtonInputProps> = ({ id, ...rest }) => (
  <RNButton data-testid={id} {...rest}/>);

export default Input;
