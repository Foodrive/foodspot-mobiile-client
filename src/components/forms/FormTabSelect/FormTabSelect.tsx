import React, { useCallback, useMemo, useState } from "react";
import TabButtonGroup, {
  TabButtonGroupProps,
} from "@app/components/ui/TabButtonGroup";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { Text, View } from "react-native";
import { useStyles } from "./styles";

interface TabSelectOption {
  displayText: string;
  value: string;
}

interface FormTabSelectProps
  extends Omit<
    TabButtonGroupProps,
    "id" | "onPress" | "buttons" | "selectedIndex"
  > {
  name: string;
  control: Control;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  label?: string;
  selectedIndex?: number;
  options: TabSelectOption[];
  errorMessage?: string;
}

const FormTabSelect: React.FC<FormTabSelectProps> = ({
  name,
  control,
  rules,
  options,
  selectedIndex = 0,
  label,
  errorMessage,
  ...rest
}) => {
  if (options.length === 0) {
    return <></>; // return empty if no options
  }

  const styles = useStyles();

  const { field } = useController({
    control,
    defaultValue: options[selectedIndex].value,
    name,
    rules,
  });

  const [curIndex, setCurIndex] = useState(selectedIndex);

  const displayButtons = useMemo(
    () => options.map((item) => item.displayText),
    [options],
  );

  const handleChange = useCallback(
    (index: number) => {
      field.onChange(options[index].value);
      setCurIndex(index);
    },
    [field.onChange, options, setCurIndex],
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.labelText}>{label}</Text>}
      <TabButtonGroup
        onPress={handleChange}
        selectedIndex={curIndex}
        buttons={displayButtons}
        {...rest}
      />
      <View style={styles.errorContainer}>
        {errorMessage && (
          <Text style={styles.errorText} data-testid={`${name}-error-text`}>
            {errorMessage}
          </Text>
        )}
      </View>
    </View>
  );
};

export default FormTabSelect;
