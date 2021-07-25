import React from "react";
import {
  SearchBar as RNSearchBar,
  SearchBarProps as RNSearchBarProps,
} from "react-native-elements";
import { StyleProp, TextStyle } from "react-native";
import styles from "./styles";

interface SearchBarProps extends RNSearchBarProps {
  id: string;
  style?: StyleProp<TextStyle>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  id,
  style = styles.textStyle,
  ...rest
}) => <RNSearchBar data-testid={id} style={style} {...rest} />;
export default SearchBar;
