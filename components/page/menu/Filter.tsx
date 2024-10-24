"use client";
import { Brands, BrandType, useFilter } from "@/hooks/useFilters";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem, Modal, Select } from "@mui/material";
import { HTMLAttributes, useState } from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import TuneIcon from "@mui/icons-material/Tune";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { FilterIcon } from "@/components/Icons/FilterIcon";
import { SortIcon } from "@/components/Icons/SortIcon";

export type sortOrderType = "asc" | "desc";

type FilterProps = HTMLAttributes<HTMLDivElement> & {
  sortOrder: sortOrderType;
  setSortOrder: React.Dispatch<React.SetStateAction<sortOrderType>>;
  resultCount?: number;
};

export const Filter = ({ setSortOrder, sortOrder, resultCount, ...rest }: FilterProps) => {
  const { updateBowlName: setBowlNameFilter, bowlName: bowlNameFilter } = useFilter();
  const { push } = useRouter();
  const emptySearch = !bowlNameFilter;
  return (
    <div className="w-full flex flex-col pt-6" {...rest}>
      <div className="flex flex-row h-full transition-all items-center justify-center mx-[22px] gap-2 pb-2">
        <button type="button" className="p-1 rounded-md">
          <FilterIcon className="text-sorghum text-[22px]" onClick={() => push("/filter")} />
        </button>
        <div
          className={`relative ${
            emptySearch
              ? "max-w-[40px] bg-transparent focus-within:bg-feta-light focus-within:max-w-full"
              : "bg-feta-light"
          } mr-auto rounded-full h-[40px] flex-1 flex items-center duration-500`}
        >
          <SearchIcon className="text-text-sorghum absolute z-10 left-3 text-[15.42px] pointer-events-none" />
          <input
            type="text"
            id="bowl-name-filter"
            value={bowlNameFilter}
            placeholder="search for bowl..."
            className={`${
              emptySearch ? "group-focus-within:bg-cornsilk" : "bg-cornsilk"
            } placeholder:opacity-50 ring-0 ring-quinoa focus-within:ring-2 duration-300 pl-[40px] w-full h-full rounded-full absolute left-0 top-0 bottom-0 right-0 placeholder:text-sorghum placeholder:font-worksans text-sorghum bg-transparent border-quinoa focus:border-quinoa focus:outline-none font-worksans font-medium`}
            onChange={(e) => {
              setBowlNameFilter(e.target.value);
            }}
          />
          {bowlNameFilter && (
            <button
              onClick={() => setBowlNameFilter("")}
              className="h-[40px] w-[40px] rounded-full flex items-center justify-center absolute right-0"
              type="button"
            >
              <CloseIcon className="absolute text-sorghum" />
            </button>
          )}
        </div>
        <button
          id="sort"
          type="button"
          onClick={() => {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
          className="p- rounded-md"
        >
          <SortIcon className="text-sorghum text-[18px]" order={sortOrder} />
        </button>
      </div>
      <div className="border-b border-quinoa mx-[22px]" />
      <div className="flex justify-end mx-[22px] mt-1 text-xs text-sorghum font-worksans font-medium mb-1">
        {resultCount !== undefined && <span>{`${resultCount || 0} bowls found.`}</span>}
      </div>
    </div>
  );
};
