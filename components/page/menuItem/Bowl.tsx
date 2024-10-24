"use client";

import useSignatures from "@/hooks/useSignatures";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import useMacroCalculator from "@/hooks/useMacroCalculator";
import CachedIcon from "@mui/icons-material/Cached";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { QrCode } from "@mui/icons-material";
import { CaretIcon } from "@/components/Icons/CaretIcon";
import { useSurveyStore } from "@/hooks/survey/useSurvey";

type TableNutritionMarco = {
  marco: string;
  serving: string | number;
  dailyIntake: string;
};

const renderMarco = ["protein", "total_fat", "carbs", "calories"];

export const Bowl = () => {
  const params = useParams();
  const { push } = useRouter();
  const [displayTable, setDisplayTable] = useState(true);
  const { data: Bowls, isFetching, isLoading } = useSignatures();
  const { formValues } = useSurveyStore();
  const { data: macroResult } = useMacroCalculator({ inputValues: formValues });

  const columnHelper = createColumnHelper<TableNutritionMarco>();

  const renderBowl = useMemo(() => {
    if (Bowls) return Bowls.find((bowl) => bowl.id === Number(params.slug));
  }, [Bowls, params.slug]);

  const columns = [
    columnHelper.accessor("marco", {
      header: `Serving Size: ${Number(renderBowl?.amount).toFixed(0)}g`,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("serving", {
      header: "Per Serving",
      cell: (info) => Number(info.getValue()).toFixed(0),
    }),
    columnHelper.accessor("dailyIntake", {
      header: "% Daily Intake",
      cell: (info) => info.getValue(),
    }),
  ];

  const macroBaseValues = useMemo(() => {
    return macroResult
      ? macroResult
      : {
          energyKcal: 2000,
          fatPerMealGram: 75,
          carbsPerMealGram: 100,
          proGram: 50,
        };
  }, [macroResult]);

  const data = useMemo(() => {
    const data = [] as TableNutritionMarco[];

    if (renderBowl) {
      for (const [key, value] of Object.entries(renderBowl)) {
        if (renderMarco.includes(key)) {
          let parseKey = key;
          let dailyIntake = 0;
          if (key === "total_fat") {
            parseKey = "Fats";
            dailyIntake = (Number(value) / macroBaseValues.fatPerMealGram) * 100;
          } else if (key === "carbs") {
            parseKey = "Carbohydrates";
            dailyIntake = (Number(value) / macroBaseValues.carbsPerMealGram) * 100;
          } else if (key === "calories") {
            parseKey = "Calories";
            dailyIntake = (Number(value) / macroBaseValues.energyKcal) * 100;
          } else if (key === "protein") {
            parseKey = "Protein";
            dailyIntake = (Number(value) / macroBaseValues.proGram) * 100;
          }
          data.push({
            marco: parseKey,
            serving: value,
            dailyIntake: dailyIntake.toFixed(1).toString(),
          });
        }
      }
    }
    return data;
  }, [renderBowl]);

  const allergens = useMemo(() => {
    const allergens = renderBowl?.mktg_allergens.split(",");
    return allergens?.filter((allergen) => !(allergen === "Meat" || allergen === "Seafood"));
  }, [renderBowl]);

  const dietTypes = useMemo(() => {
    return renderBowl?.diet_filter.split(",");
  }, [renderBowl]);

  const renderBreakdown = useMemo(() => {
    return {
      energy: { value: Number(renderBowl?.calories)?.toFixed(0), unit: "kcals" },
      carbs: { value: Number(renderBowl?.carbs)?.toFixed(0), unit: "g" },
      protein: { value: Number(renderBowl?.protein)?.toFixed(0), unit: "g" },
      fats: { value: Number(renderBowl?.total_fat)?.toFixed(0), unit: "g" },
    };
  }, [renderBowl]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const loading = isLoading || isFetching;
  const showQR = useMemo(() => {
    if (params?.action === "scan") return true;
    return false;
  }, [params]);

  const orderInStore = useCallback(() => push(`/menu/${params.slug}/scan`), [params]);

  return (
    <div className="relative min-h-full pt-4 flex flex-col">
      <div
        className={`absolute top-0 left-0 w-full h-full duration-300 flex flex-col gap-1 items-center justify-center bg-oatmeal z-10 text-oatmeal ${
          loading ? "" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="text-sorghum">
          <CachedIcon className={`${loading ? "animate-spin" : ""}`} />
        </div>
        <span className="text-sm">Loading...</span>
      </div>
      <div className="flex-1 overflow-auto flex flex-col">
        <div className="flex flex-col flex-1 overflow-auto px-[22px] pb-4">
          <div className="flex">
            <div id="bowl-img" className="desktop:float-right desktop:hidden desktop:w-0 float-left w-[45%] max-w-xl">
              <img src={renderBowl && process.env.NEXT_PUBLIC_META_HEALTH_IMAGE_HOST + renderBowl.staticUrl}></img>
            </div>
            <div className="flex flex-1">
              <div
                id="bowl-description"
                className="pl-2 desktop:pl-0 flex flex-col desktop:flex-row h-full desktop:flex-grow"
              >
                <div className="flex flex-col h-full desktop:h-fit desktop:mr-auto gap-4">
                  <p className="font-bauhaus text-[20px] leading-6 desktop:leading-10 font-medium text-sorghum desktop:text-[40px]">
                    {renderBowl?.proposed_name}
                  </p>
                  <div className="flex flex-row flex-wrap desktop:mb-0 desktop:mt-4 gap-2">
                    {dietTypes?.map((dietType, index) => {
                      if (!dietType) return null;
                      return (
                        <p
                          key={dietType}
                          className="bg-sage text-wild-rice font-worksans font-medium text-[10px] desktop:text-[16px] px-2 py-1 rounded-full"
                        >
                          {dietType}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="text-sorghum font-worksans text-[16px] desktop:h-fit font-medium desktop:text-[32px] desktop:text-right desktop:shrink-0">
                  <p>${renderBowl?.price}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            id="bowl-ingredients-allergens"
            className=" clear-left desktop:clear-none text-[12px] desktop:text-[16px] font-worksans leading-4 font-light my-6 w-full desktop:w-fit"
          >
            <p className="text-[12px] desktop:text-[16px] font-worksans leading-4 desktop:leading-6 font-light mb-6">
              {renderBowl?.ingredients}
            </p>
            <b className="font-semibold desktop:text-[16px] ">Allergens:</b>{" "}
            {allergens && allergens.length > 0 ? allergens?.join(",") : "None"}
          </div>
          <div id="bowl-macro" className="desktop:max-w-fit">
            <div className="grid grid-cols-4 desktop:flex desktop:flex-row gap-4 justify-evenly">
              {renderBreakdown && Object.entries(renderBreakdown)?.map((key) => {
                return (
                  <div
                    key={key[0]}
                    className="rounded-full desktop:min-w-[96px] aspect-square min-w-[20px] flex flex-col text-center items-center justify-center align-middle bg-bowl-card"
                  >
                    <div className="font-play font-bold text-quinoa">
                      <p className="text-[24px] leading-none">
                        {key[1]?.value}
                        <span className="desktop:text-sm text-base align-text-top ml-[1px]">
                          {key[1]?.unit !== "kcals" && key[1]?.unit}
                        </span>
                      </p>
                    </div>

                    <p className="text-quinoa text-[10px] desktop:text-[12px] mt-1">
                      {key[0] === "energy" ? key[1].unit : key[0]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            id="bowl-breakdown"
            className="mt-6 mb-2 flex items-center"
            onClick={() => setDisplayTable(!displayTable)}
          >
            <span className=" font-bauhaus text-quinoa font-medium text-[20px] desktop:text-[24px]">
              nutritional information
            </span>
            <CaretIcon
              className={`${
                displayTable ? "rotate-180" : ""
              } duration-300 h-[24px] w-auto text-quinoa ml-auto origin-center`}
            />
          </div>
          {displayTable && (
            <table id="table" className="w-full desktop:text-[16px] text-[12px]">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                      <th
                        key={header.id}
                        className={` ${
                          index === 0 ? "" : index === 1 ? "text-center" : index === 2 && "text-center"
                        } text-left font-worksans py-2 font-semibold  text-wild-rice`}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row, rowIndex) => {
                  return (
                    <tr key={row.id} className={`${rowIndex % 2 === 0 && "bg-bowl-card"}`}>
                      {row.getVisibleCells().map((cell, cellIndex) => {
                        return (
                          <td
                            key={cell.id}
                            className={` ${
                              cellIndex === 0
                                ? "px-4 font-semibold"
                                : cellIndex === 1
                                ? "text-center"
                                : cellIndex === 2 && "text-center"
                            } font-worksans text-wild-rice  py-3`}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            {cellIndex === 1 && rowIndex === 0 ? "kCals" : cellIndex === 1 && "g"}
                            {cellIndex === 2 && "%"}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {/* Buttons */}
        <div className="mx-[22px] flex flex-col justify-center items-center">
          <button
            onClick={orderInStore}
            type="button"
            className="h-[54px] w-full flex items-center justify-center bg-quinoa rounded-full font-bauhaus text-cornsilk tracking-[0.02em] text-[19.27px]"
          >
            <QrCode className="mr-2" />
            <span>scan and order in store</span>
          </button>
        </div>
      </div>
    </div>
  );
};
