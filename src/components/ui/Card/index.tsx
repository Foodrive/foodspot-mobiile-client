import React from "react";
import {
  Card as RNCard,
  CardProps as RNCardProps,
} from "react-native-elements";

interface ButtonInputProps extends RNCardProps {
  id: string;
}

const Input: React.FC<ButtonInputProps> = ({ id, ...rest }) => (
  <RNCard data-testid={id} {...rest}/>);

export default Input;
