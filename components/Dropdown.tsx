import React from "react";

type DropdownOption = {
  text: string;
  value: string;
};

type DropdownProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  name?: string;
  value: string;
  options: DropdownOption[];
  containerClassname?: string;
};

export type SelectRef = HTMLSelectElement;

export const Dropdown = React.forwardRef<SelectRef, DropdownProps>(
  ({ options, label, value, name, className = "", containerClassname = "", ...rest }, ref) => {
    const elementId = `id-${name}`;
    return (
      <div className={`flex flex-col gap-1 font-medium shrink-0 ${containerClassname}`}>
        {label && <label htmlFor={elementId}>{label}</label>}
        <div className="relative bg-white rounded-md ring-1 ring-slate-200 flex items-center justify-center">
          <select
            id={elementId}
            name={name}
            ref={ref}
            className={`bg-transparent pl-1 py-1 focus:outline-none text-sm ${className}`}
            {...rest}
            value={value}
          >
            {options.map(({ text, value }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
);
