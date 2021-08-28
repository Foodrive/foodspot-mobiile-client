import React, { useMemo } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import Icon from "@app/components/ui/Icon";
import { colors } from "@app/utils";

interface ColorMap {
  primary: string;
  secondary: string;
  default: string;
}
interface IconButtonProps {
  id?: string;
  onPress?: () => void;
  icon: string;
  color?: keyof ColorMap;
  size?: "sm" | "md" | "lg" | "xl" | number;
  reverse?: boolean;
  containerStyle?: ViewStyle;
}

const sizeMap = {
  sm: 12,
  md: 24,
  lg: 36,
  xl: 50,
};

const colorMap = {
  primary: colors.teal,
  secondary: colors.secondary,
  default: colors.dark,
};

const IconButton: React.FC<IconButtonProps> = ({
  id,
  onPress,
  icon,
  color = "default",
  size = "md",
  reverse = true,
  containerStyle,
}): JSX.Element => {
  const iconSize = useMemo(() => {
    if (typeof size === "number") {
      return size;
    } else {
      return sizeMap[size];
    }
  }, [size]);

  return (
    <Icon
      id={`${id}-icon`}
      Component={TouchableOpacity}
      onPress={onPress}
      name={icon}
      color={colorMap[color]}
      raised
      reverse={reverse}
      size={iconSize}
      containerStyle={containerStyle}
    />
  );
};

export default IconButton;
