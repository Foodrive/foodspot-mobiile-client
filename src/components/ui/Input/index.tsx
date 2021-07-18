import React, { useMemo } from "react";
import {
  Input as RNInput,
  InputProps as RNInputProps,
} from "react-native-elements/dist/input/Input";
import styles from "./styles";

type InputType = "text" | "number" | "user" | "location" | "email";

interface InputProps extends Omit<RNInputProps, "leftIcon"> {
  id: string;
  type: InputType;
}

const Input: React.FC<InputProps> = (props) => {
  const { id, type, keyboardType, ...rest } = props;

  // Add more icons here
  const icon = useMemo(() => {
    if (type === "user") {
      return { type: "ionicon", name: "person-outline" };
    } else if (type === "location") {
      return { type: "ionicon", name: "location-outline" };
    } else if (type === "number") {
      return { type: "font-awesome-5", name: "hashtag" };
    } else if (type === "email") {
      return { type: "ionicon", name: "mail-outline" };
    } else {
      return { type: "ionicon", name: "chatbox-outline" };
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
    // @ts-ignore
    <RNInput
      data-testid={id}
      leftIcon={icon}
      keyboardType={keyboard}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      {...rest}
    />
  );
};

export default Input;
