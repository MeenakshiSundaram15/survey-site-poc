import { ArrowDropDown, FilterList } from "@mui/icons-material";
import { useState } from "react";
import { ImageKey, Images } from "./ui/Images";
import Image from "next/image";

type DropdownWithCheckboxesProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  value: string[];
  options: {
    text: string;
    value: string;
  }[];
};

export const CheckboxDropdown = ({
  className = "",
  name = "",
  label,
  options,
  onChange,
  value: values,
  ...rest
}: DropdownWithCheckboxesProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative">
      <div
        className={`relative px-4 py-2 ring-1 ring-slate-300 w-fit rounded-full flex items-center justify-between gap-2 hover:ring-2 hover:ring-slate-500 transition-all cursor-pointer select-none group hover:shadow-md ${className} ${
          collapsed ? "ring-2 ring-slate-500 [&>*]:!opacity-100 bg-slate-200" : ""
        }`}
        {...rest}
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <FilterList className="text-[20px] opacity-70 group-hover:opacity-100" />
        <span className="opacity-70 text-sm font-medium  group-hover:opacity-100">{label}</span>
        <ArrowDropDown
          className={`opacity-70 group-hover:opacity-100 transition-all ${collapsed ? "-scale-y-100" : ""}`}
        />
      </div>
      <div
        className={`z-10 h-[200px] w-[160px] absolute left-0 top-full transition-all bg-slate-100 mt-2 rounded-xl p-1 shadow-md ring-1 ring-slate-200 ${
          !collapsed ? "pointer-events-none opacity-0 -translate-y-2" : ""
        }`}
      >
        <div className="flex flex-col bg-white rounded-xl h-full overflow-auto w-full  cursor-pointer">
          {!!options.length &&
            options.map(({ value, text }) => (
              <div className="flex gap-2 whitespace-nowrap py-1 px-2 w-full hover:bg-slate-200" key={value}>
                <input
                  id={`${value}-id`}
                  type="checkbox"
                  onChange={onChange}
                  name={`${name}-${value}`}
                  data-form-key={value}
                  checked={values.includes(value)}
                />
                <label
                  htmlFor={`${value}-id`}
                  className="w-full flex items-center gap-1 text-sm font-medium text-slate-700"
                >
                  <span className="flex-1 break-words text-xs">{`No ${text}`}</span>
                  {Images[value as ImageKey] && <Image src={Images[value as ImageKey]} alt={value} height={20} />}
                </label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};