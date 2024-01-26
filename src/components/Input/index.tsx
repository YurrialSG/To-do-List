import React from "react";

interface InputProps {
  type:
    | "password"
    | "text"
    | "email"
    | "url"
    | "date"
    | "datetime-local"
    | "number"
    | "tel"
    | "time"
    | "week";
  name?: string;
  id?: string;
  placeholder?: string;
  isValid?: boolean;
  format?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  min?: number | string;
  maxLength?: number;
  thousandSeparator?: boolean | string;
  decimalSeparator?: string;
  step?: string;
  prefix?: string;
  pattern?: string;
  max?: number | string;
  readonly?: boolean;
  defaultValue?: string | number;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const styles = {
  input:
    "shadow-3 block w-full sm:text-sm border-gray-300 rounded-md placeholder:text-gray px-[13px] py-[6.5px]",
  valid: "border-green",
  error: "border-red",
  placeholder: "text-gray",
};

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { type, id, placeholder, isValid, name, onChange, value, step, ...props },
    ref
  ) => {
    return (
      <input
        onChange={onChange}
        ref={ref}
        type={type}
        id={id}
        name={name}
        value={value}
        step={step}
        className={`${styles.input} ${(() => {
          if (isValid && isValid !== undefined) {
            return styles.valid;
          }
          if (!isValid && isValid !== undefined) {
            return styles.error;
          }

          return "";
        })()}`}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

export default Input;
