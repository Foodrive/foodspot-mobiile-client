import React, { useMemo } from "react";
import {
  Input as RNInput,
  InputProps as RNInputProps,
} from "react-native-elements";
import styles from "./styles";

type InputType = "text" | "number" | "user" | "location" | "email" | "password";

export interface InputProps extends Omit<RNInputProps, "leftIcon"> {
  id: string;
  type: InputType;
  editable?: boolean;
}

// Add more icons here
const iconMap = {
  user: { type: "ionicon", name: "person-outline" },
  location: { type: "ionicon", name: "location-outline" },
  number: { type: "font-awesome-5", name: "hashtag" },
  email: { type: "ionicon", name: "mail-outline" },
  text: { type: "ionicon", name: "chatbox-outline" },
  password: { type: "font-awesome-5", name: "lock" },
};

const Input: React.FC<InputProps> = (props) => {
  const { id, type, editable, keyboardType, ...rest } = props;
  const icon = useMemo(() => {
    if (iconMap[type]) {
      return iconMap[type];
    } else {
      return iconMap.text;
    }
  }, [type]);

  // Modify keyboard type here
  const keyboard = useMemo(() => {
    if (type === "number") {
      return "number-pad";
    } else if (type === "email") {
      return "email-address";
    } else {
      return "default";
    }
  }, [keyboardType, type]);

  return (
    <RNInput
      data-testid={id}
      leftIcon={icon}
      keyboardType={keyboard}
      inputContainerStyle={styles.inputContainer}
      inputStyle={editable ? styles.input : styles.uneditableInput}
      secureTextEntry={type === "password"}
      disabled={!editable}

      {...rest}
    />
  );
};

export default Input;
