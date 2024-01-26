import React from "react";

interface InputGroup {
  label: string;
  id: string;
  children?: JSX.Element;
  className?: string;
}

const styles = {
  label: "block text-sm sm:text-base lg:text-xl font-semibold leading-5 mb-1",
};

export default function InputGroup({
  label,
  id,
  children,
  className = "",
}: InputGroup) {
  return (
    <div className={className}>
      <label htmlFor={id} className={`${styles.label}`}>
        {label}
      </label>
      {children && (
        <div>
          {React.cloneElement(children, {
            id,
          })}
        </div>
      )}
    </div>
  );
}
