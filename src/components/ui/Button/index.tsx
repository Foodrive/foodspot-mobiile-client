import React from "react";
import {
  Button as RNButton,
  ButtonProps as RNButtonProps,
} from "react-native-elements";
import { useStyles } from "./styles";

interface ButtonInputProps
  extends Omit<RNButtonProps, "buttonStyle" | "type" | "raised"> {
  id: string;
  color?: "primary" | "secondary" | "danger" | "warning";
}

const Button: React.FC<ButtonInputProps> = ({
  id,
  color = "primary",
  ...rest
}) => {
  const styles = useStyles({ color });
  return (
    <RNButton
      containerStyle={styles.containerStyle}
      buttonStyle={styles.buttonStyle}
      titleStyle={styles.titleStyle}
      data-testid={id}
      raised
      {...rest}
    />
  );
};

export default Button;
