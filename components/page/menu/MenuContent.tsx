"use client";
import useSignatures from "@/hooks/useSignatures";
import { SignaturesModel } from "@/models/signatures";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFilter } from "@/hooks/useFilters";
import { AllergenIconKey, AllergenIcons } from "@/components/Icons/AllergenIcons";
import { ImageWithLoading } from "@/components/ImageWithLoading";
import { Filter, sortOrderType } from "@/components/page/menu/Filter";
import { useWindowSize } from "@/hooks/useWindowSize";

const NutritionInfoItem = ({ value, unit, label }: { value?: number; unit?: string; label: string }) => (
  <div className="bg-oatmeal rounded-full w-[27.75px] h-[27.75px] flex flex-col items-center justify-center">
    <div className="flex font-play font-bold text-quinoa leading-none">
      <span className="text-[10px]">{value}</span>
      {unit && <span className="text-[5px] -mr-[3px]">{unit}</span>}
    </div>
    <div className="font-worksans font-light text-[6px] text-quinoa leading-none">{label}</div>
  </div>
);

type BowlCardProps = React.HTMLAttributes<HTMLDivElement> & {
  bowl: SignaturesModel;
  index: number;
};

const METAHEALTH_IMAGE_HOST = process.env.NEXT_PUBLIC_META_HEALTH_IMAGE_HOST;

const BowlCard = ({ bowl, index, className, ...rest }: BowlCardProps) => {
  const { push } = useRouter();
  const allergens = useMemo(() => {
    return bowl?.mktg_allergens.replace(" ", "").split(",");
  }, [bowl]);
  const dietTypes = useMemo(() => {
    return bowl?.diet_filter.split(",");
  }, [bowl]);

  return (
    <div
      className={`w-full bg-bowl-card rounded-3xl px-5 pb-4 pt-4 flex flex-col gap-2 cursor-pointer duration-300 ring-0 ring-quinoa hover:ring-4 ${
        className || ""
      }`}
      onClick={() => {
        push(`/menu/${bowl?.id}`);
      }}
      {...rest}
    >
      <div id="bowl-img" className="w-full">
        {/* <img className="object-contain" src={METAHEALTH_IMAGE_HOST + bowl.staticUrl}></img> */}
        <ImageWithLoading src={METAHEALTH_IMAGE_HOST + bowl.staticUrl} withToHeightRatio={1.325} />
      </div>
      <div id="bowl-name" className=" font-worksans leading-4 font-medium text-[12px]">
        {bowl?.proposed_name}
      </div>
      {/* Nutrition Info */}
      <div className="flex items-center gap-1">
        <NutritionInfoItem value={Math.round(Number(bowl.calories || 0))} label="kcals" />
        <NutritionInfoItem value={Math.round(Number(bowl.carbs || 0))} unit="g" label="carbs" />
        <NutritionInfoItem value={Math.round(Number(bowl.protein || 0))} unit="g" label="protein" />
        <NutritionInfoItem value={Math.round(Number(bowl.total_fat || 0))} unit="g" label="fats" />
      </div>
      <div id="bowl-dietTypes" className="flex flex-row flex-wrap gap-1">
        {dietTypes?.map((dietType, index) => {
          if (!dietType) return null;
          return (
            <div key={`${bowl.sku}-${dietType}-${index}`} className=" bg-sage rounded-full py-1 px-2 text-[8px]">
              {dietType.replaceAll(" ", "") === "LowCarbohydrates" ? "Low Carbs" : dietType}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-between w-full flex-1 items-end">
        <div id="allergens" className="flex flex-row gap-x-1">
          {allergens?.map((allergen) => {
            if (allergen.replace(" ", "") === "Meat" || allergen.replace(" ", "") === "Seafood" || !allergen)
              return null;

            const match = !!AllergenIcons[allergen.toLowerCase() as AllergenIconKey];
            if (!match) return null;
            return React.createElement(AllergenIcons[allergen.toLowerCase() as AllergenIconKey], {
              className: "w-4 h-4 text-quinoa",
              key: allergen,
            });
          })}
        </div>
        <div id="bowl-price" className="flex font-worksans leading-[14px] font-medium text-[12px]">
          <p>${bowl?.price}</p>
        </div>
      </div>
    </div>
  );
};

export const MenuContent = ({ visible }: { visible: boolean }) => {
  const [screenWidth, setSreenWidth] = useState<number>(0);
  const [estimatedHeight, setEstimatedHeight] = useState(screenWidth >= 750 ? screenWidth * 0.335 : 310);
  const [sortOrder, setSortOrder] = useState<sortOrderType>("asc");
  const { filtersForAPI, brand, bowlName: bowlNameFilter } = useFilter();

  useEffect(() => {
    setSreenWidth(window.innerWidth);
    const onResize = () => setSreenWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { data, isFetching, isLoading } = useSignatures(filtersForAPI);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const sortBowls = (bowls: SignaturesModel[]) => {
    return bowls.sort((a, b) =>
      sortOrder === "asc" ? Number(a?.price) - Number(b?.price) : Number(b?.price) - Number(a?.price)
    );
  };

  const renderItems = useMemo(() => {
    const col = screenWidth >= 750 ? 4 : 2;
    const result = [] as SignaturesModel[][];

    const sortedData = data?.sort((a, b) =>
      sortOrder === "asc" ? Number(a?.price) - Number(b?.price) : Number(b?.price) - Number(a?.price)
    );

    const filteredBowl = sortedData?.filter((bowl) => {
      return bowl?.proposed_name?.toLowerCase()?.includes(bowlNameFilter?.toLowerCase());
    });
    filteredBowl &&
      filteredBowl?.forEach((element, index) => {
        if (index % col !== 0) return null;
        return col === 2
          ? result.push([filteredBowl[index], filteredBowl[index + 1]])
          : col === 4 &&
              result.push([
                filteredBowl[index],
                filteredBowl[index + 1],
                filteredBowl[index + 2],
                filteredBowl[index + 3],
              ]);
      });

    return result;
  }, [data, screenWidth, bowlNameFilter, brand, sortOrder, sortBowls]);

  const virtualizer = useVirtualizer({
    count: renderItems?.length || 0,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => estimatedHeight,
    gap: 16,
    paddingStart: 8,
    paddingEnd: 16,
  });

  const items = virtualizer.getVirtualItems();

  useEffect(() => {
    const updateEstimatedHeight = () => {
      const firstElement = document.querySelector('[data-index="0"]');
      const firstElementHeight = firstElement?.getBoundingClientRect()?.height;
      if (firstElementHeight) setEstimatedHeight(firstElementHeight);
    };

    window.addEventListener("resize", updateEstimatedHeight);

    return () => {
      window.removeEventListener("resize", updateEstimatedHeight);
    };
  }, [!!data]);

  const { windowHeight } = useWindowSize();

  const loading = isLoading || isFetching;

  return (
    <div
      className={`duration-500 ${
        !visible ? "opacity-0 h-0" : ``
      } relative flex flex-col items-center duration-300 [&>*]:shrink-0`}
      style={{
        ...(visible && windowHeight
          ? {
              height: `${windowHeight - 60 - 32 + 16}px`,
            }
          : {
              height: "calc(100vh - 60px - 32px + 16px)",
            }),
      }}
    >
      {/* Menu Content */}
      <div className="relative flex flex-col min-h-0 flex-1 w-full -mt-2 m">
        <div className="w-full flex flex-col h-full">
          <div id="filters">
            <Filter
              resultCount={data?.length}
              setSortOrder={setSortOrder}
              sortOrder={sortOrder}
              suppressHydrationWarning
            />
          </div>
          <div
            id="bowls"
            className={`flex flex-col flex-1 gap-2 overflow-y-auto px-[22px] relative`}
            ref={scrollElementRef}
          >
            {loading && (
              <div className=" w-full h-full flex items-center justify-center">
                <p className="font-worksans text-sorghum">loading bowls...</p>
              </div>
            )}
            {!items.length && !loading && (
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">No results found.</div>
            )}
            <div
              style={{
                height: virtualizer.getTotalSize(),
                width: "100%",
                position: "relative",
              }}
            >
              {items.map((virtualRow, idx) => {
                const bowl = renderItems?.[virtualRow.index];
                if (!bowl) return null;

                return (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                  >
                    <div className="grid grid-cols-2 desktop:grid-cols-4 gap-4">
                      {bowl.map((ele, index) => {
                        if (!ele) return null;
                        return <BowlCard key={`${ele?.name}-${idx}-${index}`} bowl={ele} index={virtualRow.index} />;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
