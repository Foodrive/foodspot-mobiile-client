import React from "react"; 
import { View, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import Icon from "@app/components/ui/Icon";
import styles from "./styles";

interface IconButtonProps {
  id?: string;
  onPress: () => void; 
  icon: string;
  color?: string;
  raised?: boolean;
  reverse?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  size: number;
}

const IconButton: React.FC<IconButtonProps>  = ({ 
  id, 
  onPress, 
  icon, 
  color, 
  raised, 
  reverse, 
  buttonStyle,
  size }): JSX.Element => {

  return(
    <View style={buttonStyle}>
      <TouchableOpacity onPress={() => onPress()}>
        <Icon 
          id={`${id}-icon`}
          name={icon}
          color={color}
          raised={raised}
          reverse={reverse}
          iconStyle={styles.button}
          size={size}
        />
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;


