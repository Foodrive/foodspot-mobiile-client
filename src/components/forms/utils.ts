import { FieldError } from "react-hook-form";

/**
 * Returns the error message for a react-hook-form error
 * @param fieldName
 * @param error
 * @param fields
 */
export const getErrorMessage = (
  fieldName: string,
  error?: FieldError,
  fields?: string[],
): string | undefined => {
  if (!error) {
    return undefined;
  }
  // TODO add more stuff here for more specific error handling
  switch (error.type) {
    case "required":
      return `${fieldName} is required.`;
    case "notInThePast":
      return `${fieldName} can't be in the past`;
    case "notBeforeDate":
      return `${fieldName} can't be before ${fields ? fields[0] : ""}`;
    case "notAfterDate":
      return `${fieldName} can't be after ${fields ? fields[0] : ""}`;
    default:
      return `${fieldName} has an error`;
  }
};
