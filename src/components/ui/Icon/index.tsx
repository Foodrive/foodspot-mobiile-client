import React from "react";
import {
  Icon as RNIcon,
  IconProps as RNIconProps,
} from "react-native-elements";

interface IconProps extends RNIconProps {
  id: string;
}

const Icon: React.FC<IconProps> = (props) => {
  const { id, ...rest } = props;
  return <RNIcon data-testid={id} {...rest} />;
};
export default Icon;
