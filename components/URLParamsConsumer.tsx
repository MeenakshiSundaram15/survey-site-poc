"use client";

import { BrandsLowerCasedMap, TBrandsLowerCased, useFilterStore } from "@/hooks/useFilters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HTMLAttributes, useEffect } from "react";

export const URLParamsConsumer = (props: HTMLAttributes<HTMLDivElement>) => {
  const { brand, updateBrand } = useFilterStore();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const brandFromUrl = searchParams.get("brand");

    if (brandFromUrl) {
      if (brandFromUrl !== brand.toLocaleLowerCase()) {
        const brandsLowerCased = brandFromUrl as TBrandsLowerCased;
        if (BrandsLowerCasedMap[brandsLowerCased]) {
          updateBrand(BrandsLowerCasedMap[brandsLowerCased]);
        }
      }

      replace(pathname);
    }
  }, []);

  return (
    <div id="params-consumer" className='fixed pointer-events-none hidden' {...props} />
  );
};
