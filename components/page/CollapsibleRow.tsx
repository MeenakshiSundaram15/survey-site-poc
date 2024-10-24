import { HTMLAttributes } from "react";

export const CollapsibleRow = ({ hidden, className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`${className || ''} duration-700 transition-[grid-template-rows_500ms] [&>*]:overflow-hidden ${
      hidden ? "grid grid-rows-[0fr]" : "grid grid-rows-[1fr]"
    }`}
    {...rest}
  />
);
