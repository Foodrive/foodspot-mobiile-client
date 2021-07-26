import React from "react";
import {
  SearchBar as RNSearchBar,
} from "react-native-elements";
import { StyleProp, TextStyle } from "react-native";
import styles from "./styles";

interface SearchBarProps {
  id: string;
  textStyle?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
  placeholder?: string;
  value?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  id,
  textStyle,
  onChangeText,
  placeholder,
  value = "",
}) => (
  <RNSearchBar
    data-testid={id}
    style={[styles.textStyle, textStyle]}
    // @ts-ignore
    onChangeText={onChangeText}
    containerStyle={styles.containerStyle}
    placeholder={placeholder}
    value={value}
    platform="android"
  />
);

export default SearchBar;
