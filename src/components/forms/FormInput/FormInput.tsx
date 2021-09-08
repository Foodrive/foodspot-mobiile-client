import React from "react";
import Input, { InputProps } from "@app/components/ui/Input";
import { Control, RegisterOptions, useController } from "react-hook-form";

interface FormInputProps
  extends Omit<InputProps, "id" | "onChange" | "onChangeText"> {
  name: string;
  control: Control;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  rules,
  value = "",
  ...rest
}) => {
  const { field } = useController({
    control,
    defaultValue: value,
    name,
    rules,
  });
  return (
    <Input
      id={name}
      value={field.value}
      onChangeText={field.onChange}
      editable={true}
      {...rest}
    />
  );
};

export default FormInput;
