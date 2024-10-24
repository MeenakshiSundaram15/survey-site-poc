import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...rest }, ref) => (
  <input
    className={`w-full transition-all ring-1 ring-slate-200 hover:ring-orange-300 rounded-md pl-2 pr-1 py-1 focus-within:outline-none focus-within:ring-orange-400 focus-within:shadow-md ${className}`}
    {...rest}
  />
));
