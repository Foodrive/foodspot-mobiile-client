import React from "react";
import {
  Icon as RNIcon,
  IconProps as RNIconProps,
} from "react-native-elements";

interface IconProps extends RNIconProps {
  id: string;
}

const Icon: React.FC<IconProps> = ({ id, type = "ionicon", ...rest }) => (
  <RNIcon data-testid={id} type={type} {...rest} />
);
export default Icon;
