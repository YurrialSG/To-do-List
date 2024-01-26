import { FieldError } from "react-hook-form";

export default function inputIsValid(
  errors: FieldError | undefined,
  touched: boolean | undefined
): boolean | undefined {
  if (!errors && touched) {
    return true;
  }

  return typeof errors !== "undefined" ? !errors : undefined;
}
