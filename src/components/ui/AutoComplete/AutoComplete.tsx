import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Input, { InputProps } from "@app/components/ui/Input";
import { MenuItem } from "./MenuItem";
import { useStyles } from "./styles";

export interface MenuItem {
  label: string;
}

type InputType = "text" | "location";

export interface AutoCompleteProps
  extends Omit<InputProps, "type" | "onFocus" | "onBlur" | "onChange"> {
  id: string;
  type: InputType;
  options?: MenuItem[];
  onChangeText: (text: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  id,
  type,
  options = [],
  onChangeText,
  value,
  ...rest
}) => {
  const styles = useStyles();
  const [displayOptions, setDisplayOptions] = useState<MenuItem[]>(options);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onSelectItem = useCallback(
    (label: string) => {
      setIsFocused(false);
      onChangeText(label);
    },
    [setIsFocused],
  );

  useEffect(() => {
    if (value) {
      const filteredOptions =
        options?.filter((item) =>
          item.label.toLowerCase().includes(value.toLowerCase()),
        ) ?? [];
      setDisplayOptions(filteredOptions);
    } else {
      setDisplayOptions([]);
    }
  }, [value, options, setDisplayOptions]);

  return (
    <View style={styles.container}>
      <Input
        id={`${id}-input`}
        type={type}
        onFocus={() => setIsFocused(true)}
        onChangeText={onChangeText}
        value={value}
        {...rest}
      />
      <View style={styles.menuContainer}>
        {isFocused && (
          <FlatList
            data={displayOptions}
            renderItem={({ item }) => (
              <MenuItem label={item.label} onPress={onSelectItem} />
            )}
            keyExtractor={(item) => item.label}
            style={styles.menuList}
          />
        )}
      </View>
    </View>
  );
};

export default AutoComplete;
