import React from "react";
import {
  DateTimeInput,
  DateTimeInputProps,
} from "@app/components/ui/DateTimeInput";
import { Control, RegisterOptions, useController } from "react-hook-form";

interface FormDateTimeInputProps
  extends Omit<DateTimeInputProps, "id" | "onChangeText"> {
  name: string;
  control: Control;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}
const FormDateTimeInput: React.FC<FormDateTimeInputProps> = ({
  name,
  control,
  value = "",
  rules,
  ...rest
}) => {
  const { field } = useController({
    control,
    defaultValue: value,
    name,
    rules,
  });
  return (
    <DateTimeInput
      id={name}
      onChangeText={field.onChange}
      value={field.value}
      {...rest}
    />
  );
};

export default FormDateTimeInput;
