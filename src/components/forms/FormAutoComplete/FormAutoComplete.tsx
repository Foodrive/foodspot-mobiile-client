import React from "react";
import {
  AutoComplete,
  AutoCompleteProps,
} from "@app/components/ui/AutoComplete";
import { Control, RegisterOptions, useController } from "react-hook-form";

interface FormAutoCompleteProps
  extends Omit<AutoCompleteProps, "id" | "onChangeText"> {
  name: string;
  control: Control;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

const FormAutoComplete: React.FC<FormAutoCompleteProps> = ({
  name,
  control,
  rules,
  value,
  ...rest
}) => {
  const { field } = useController({
    control,
    defaultValue: value,
    name,
    rules,
  });
  return (
    <AutoComplete
      id={name}
      value={field.value}
      onChangeText={field.onChange}
      {...rest}
    />
  );
};

export default FormAutoComplete;
