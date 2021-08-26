import React, { useCallback, useEffect, useState } from "react";
import CheckBoxItem from "@app/components/ui/CheckBoxItem";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { useStyles } from "./styles";
import { ScrollView, Text, View } from "react-native";

interface CheckOption {
  displayText: string;
  value: string;
}

interface FormCheckSelectProps {
  name: string;
  control: Control;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  label?: string;
  selectedOptions?: string[];
  options: CheckOption[];
  errorMessage?: string;
}

const FormCheckSelect: React.FC<FormCheckSelectProps> = ({
  name,
  control,
  rules,
  label,
  selectedOptions = [],
  options,
  errorMessage,
}) => {
  if (options.length === 0) {
    return <></>; // return empty if no options
  }

  const styles = useStyles();

  const [curOptions, setCurOptions] = useState<Record<string, boolean>>({});

  const { field } = useController({
    control,
    defaultValue: selectedOptions,
    name,
    rules,
  });

  useEffect(() => {
    const record = options.reduce<Record<string, boolean>>((acc, item) => {
      acc[item.value] = selectedOptions.includes(item.value);
      return acc;
    }, {});
    setCurOptions(record);
  }, [setCurOptions]);

  const onSelect = useCallback(
    (value: string) => {
      const newStateValues = { ...curOptions, [value]: !curOptions[value] };
      const newValues = Object.keys(newStateValues).filter(
        (value) => newStateValues[value],
      );
      setCurOptions(newStateValues);
      field.onChange(newValues);
    },
    [field.onChange, setCurOptions, curOptions],
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.labelText}>{label}</Text>}
      <View>
        {options.map((item) => (
          <CheckBoxItem
            key={item.value}
            id={item.value}
            title={item.displayText}
            checked={curOptions[item.value] ?? false}
            onPress={() => onSelect(item.value)}
          />
        ))}
      </View>
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

export default FormCheckSelect;
