import { FieldError } from "react-hook-form";

/**
 * Returns the error message for a react-hook-form error
 * @param fieldName
 * @param error
 */
export const getErrorMessage = (
  fieldName: string,
  error?: FieldError,
): string | undefined => {
  if (!error) {
    return undefined;
  }
  // TODO add more stuff here for more specific error handling
  switch (error.type) {
    case "required":
      return `${fieldName} is required.`;
    default:
      return `${fieldName} has an error`;
  }
};
