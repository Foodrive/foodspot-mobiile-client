import React from "react"; 
import { View } from "react-native";
import Icon from "@app/components/ui/Icon";
import { colors } from "@app/utils";

interface IconButtonProps {
  id?: string;
  onPress: () => void; 
}

const IconButton: React.FC<IconButtonProps>  = ({id, onPress}) => {

  return(
    <View>
      <Icon 
        id={`${id}-icon`}
        name="add-circle"
        onPress={() => onPress()}
        color={colors.dark}
      />
    </View>
  );
};

export default IconButton;