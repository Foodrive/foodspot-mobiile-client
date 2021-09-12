import dayjs from "dayjs";
import { Validate, ValidationValueMessage } from "react-hook-form";

export const notAfterDate = (
  getValues: (name: string) => any,
  otherField: string,
): Validate<string> => {
  return (value) => {
    const other = getValues(otherField);
    if (!other) {
      return true;
    }
    const endDate = dayjs(other);
    const curDate = dayjs(value);
    return curDate.isSame(endDate) || curDate.isBefore(endDate);
  };
};

export const notBeforeDate = (
  getValues: (name: string) => any,
  otherField: string,
): Validate<string> => {
  return (value) => {
    const other = getValues(otherField);
    if (!other) {
      return true;
    }
    const endDate = dayjs(other);
    const curDate = dayjs(value);
    return curDate.isSame(endDate) || curDate.isAfter(endDate);
  };
};

export const notInThePast = (): Validate<string> => (value: string) => {
  const today = dayjs();
  const curDate = dayjs(value);
  return today.isBefore(curDate) || today.isSame(curDate);
};

// Contains regex expressions used for form validation

interface RegexValidator {
  wholeNumber: ValidationValueMessage<RegExp>;
  email: ValidationValueMessage<RegExp>;
}

export const regexValidator: RegexValidator = {
  wholeNumber: { value: /^\d+$/, message: "must be a whole number." },
  email: {
    value: /(.+)@(.+){2,}\.(.+){2,}/,
    message: "must be a valid email format.",
  },
};
