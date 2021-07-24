import React from "react";
import { View } from "react-native";
import Icon from "@app/components/ui/Icon";
import { colors } from "@app/utils";

interface TabBarIconProps {
  id: string;
  focused: boolean;
  icon: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = (props) => {
  const { id, focused, icon } = props;
  return (
    <View>
      <Icon
        id={`${id}-icon`}
        name={icon}
        type="ionicon"
        color={colors.dark}
        style={{ opacity: focused ? 1 : 0.3 }}
      />
    </View>
  );
};

export default TabBarIcon;
