import React from "react";
import {
  Button as RNButton,
  ButtonProps as RNButtonProps,
} from "react-native-elements";
import { useStyles } from "./styles";

interface ButtonInputProps extends Omit<RNButtonProps, "raised"> {
  id: string;
  color?: "primary" | "secondary" | "danger" | "warning";
}

const Button: React.FC<ButtonInputProps> = ({
  id,
  color = "primary",
  type = "solid",
  buttonStyle,
  containerStyle,
  ...rest
}) => {
  const styles = useStyles({ color, type });
  return (
    <RNButton
      containerStyle={[styles.containerStyle, containerStyle]}
      buttonStyle={[styles.buttonStyle, buttonStyle]}
      titleStyle={styles.titleStyle}
      data-testid={id}
      type={type}
      raised
      {...rest}
    />
  );
};

export default Button;
