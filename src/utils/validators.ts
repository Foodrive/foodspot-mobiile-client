import dayjs from "dayjs";
import { Validate } from "react-hook-form";

export const notAfterDate = (other: string | undefined): Validate<string> => {
  return (value) => {
    if (!other) {
      return true;
    }
    const endDate = dayjs(other);
    const curDate = dayjs(value);
    return curDate.isSame(endDate) || curDate.isBefore(endDate);
  };
};

export const notBeforeDate = (other: string | undefined): Validate<string> => {
  return (value) => {
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
