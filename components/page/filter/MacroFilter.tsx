"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import CheckBox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import _, { capitalize, debounce } from "lodash";
import { useFilter } from "@/hooks/useFilters";
import useSignatures, { GetSignaturesRequest } from "@/hooks/useSignatures";
import { useRouter } from "next/navigation";
import { maxFilterRanges } from "@/constants/maxFilterRanges";

type MacroFilterProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};
const sliderContents = [
  { id: "calories", type: "slider", unit: "kCals", name: "energy" },
  { id: "carbs", type: "slider", unit: "g", name: "carbs" },
  { id: "protein", type: "slider", unit: "g", name: "protein" },
  { id: "total_fat", type: "slider", unit: "g", name: "fats" },
] as {
  id: "calories" | "carbs" | "protein" | "total_fat";
  type: "checkBox" | "slider";
  unit: "kCals" | "g" | "";
  name: "energy" | "carbs" | "protein" | "fats";
}[];

const filterSchema = z.object({
  calories: z.array(z.number()).max(2),
  carbs: z.array(z.number()).max(2),
  protein: z.array(z.number()).max(2),
  total_fat: z.array(z.number()).max(2),
  "High Protein": z.boolean(),
  Vegetarian: z.boolean(),
  Keto: z.boolean(),
  "Anti-inflammatory": z.boolean(),
  Paleo: z.boolean(),
  "Low Calorie": z.boolean(),
  Vegan: z.boolean(),
  "Heart Healthy": z.boolean(),
  "Low Carbohydrates": z.boolean(),
  Meat: z.boolean(),
  Dairy: z.boolean(),
  Seafood: z.boolean(),
  Nuts: z.boolean(),
  Allium: z.boolean(),
  Gluten: z.boolean(),
});

export type FilterSchemaType = z.infer<typeof filterSchema>;

const defaultFilter = {
  calories: [0, maxFilterRanges.calories],
  carbs: [0, maxFilterRanges.carbs],
  protein: [0, maxFilterRanges.protein],
  total_fat: [0, maxFilterRanges.total_fat],
  "High Protein": false,
  Vegetarian: false,
  Keto: false,
  "Anti-inflammatory": false,
  Paleo: false,
  "Low Calorie": false,
  Vegan: false,
  "Heart Healthy": false,
  "Low Carbohydrates": false,
  Meat: false,
  Dairy: false,
  Seafood: false,
  Nuts: false,
  Allium: false,
  Gluten: false,
} as FilterSchemaType;

export const MacroFilter = () => {
  const { push } = useRouter();
  const { filters, dietOption, allergensOption, resetFilters, updateAllFilters, filtersForAPI, updateBowlName } =
    useFilter();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FilterSchemaType>({
    defaultValues: defaultFilter,
    resolver: zodResolver(filterSchema),
  });

  const allValues = watch();

  const onSubmit: SubmitHandler<FilterSchemaType> = useCallback(
    (data) => {
      // console.log('update all data')
      // updateAllFilters(data);
    },
    [updateAllFilters]
  );

  useEffect(() => {
    Object.keys(filters).forEach((filterKey) => {
      setValue(filterKey as keyof FilterSchemaType, filters[filterKey as keyof FilterSchemaType]);
    });
  }, []);

  const resetFiltersHandler = useCallback(() => {
    reset();
    resetFilters();
  }, [resetFilters, reset]);

  // const [apiFilters, setApiFilters] = useState<GetSignaturesRequest | undefined>(filtersForAPI);

  const { data, isFetching, isLoading } = useSignatures(filtersForAPI);

  const debounceUpdateFilters = useMemo(
    () =>
      debounce((newApiFilter) => {
        updateAllFilters(newApiFilter);
      }, 700),
    []
  );

  // useEffect(() => {
  //   debounceUpdateFilters(filtersForAPI);
  // }, [filtersForAPI]);

  useEffect(() => {
    debounceUpdateFilters(allValues);
  }, [JSON.stringify(allValues)]);

  const goToMenu = useCallback(() => {
    updateBowlName("");
    push("/menu");
  }, []);

  return (
    <div id="marco-filter" className="h-full w-full bg-bowl-detail-background">
      <form
        name="macro-filter-form"
        className="flex flex-col gap-4 h-full  overflow-scroll"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col h-full px-[22px] gap-[15.12px] flex-1 overflow-auto rounded-[23.12px]">
          <div id="macro-sliders" className="flex flex-col w-full gap-y-[15.42px]">
            {sliderContents.map(({ id, type, name, unit }, index) => {
              if (type === "slider") {
                return (
                  <div key={`slider-${id}`} className="bg-filter w-full rounded-[23.12px] px-4 pt-[14px] pb-[36px]">
                    <div className="flex flex-row gap-2 justify-between">
                      <p className="text-quinoa font-worksans text-[14px] font-semibold">{name.toUpperCase()}</p>
                    </div>

                    <Controller
                      name={id}
                      key={`controller-ftilers-${id}-${index}`}
                      control={control}
                      render={({ field }) => (
                        <FormControl className="w-full">
                          <Slider
                            min={0}
                            // max={id === "calories" ? 1200 : id === "carbs" ? 300 : 100}
                            max={maxFilterRanges[id as keyof typeof maxFilterRanges]}
                            key={`silder-ftilers-${id}-${index}`}
                            sx={{
                              color: "#C1AA95",
                              height: "8px",
                              "& .MuiSlider-thumb": { color: "white", height: "16px", width: "16px" },
                              "& .MuiSlider-rail": { color: "white", height: "8px" },
                              "& .MuiSlider-valueLabelOpen": { translate: "0px 50px", background: "none" },
                              "& .MuiSlider-valueLabelLabel": { color: "#2F2F2F", fontWeight: "400", fontSize: "12px" },
                            }}
                            className="!pt-[0] !pb-[0] !mt-[10px] !mb-0"
                            valueLabelDisplay="on"
                            {...field}
                            value={watch(id)}
                          />
                        </FormControl>
                      )}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div id="dietType-input">
            <p className=" text-sorghum font-bauhaus font-medium text-[15.42px]">Diet types</p>
            <div className="grid grid-cols-2">
              {dietOption?.map((filter, index) => {
                return (
                  <Controller
                    name={filter}
                    key={`controller-dietType-checkBox-${filter}`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <FormControlLabel
                          className="mx-2"
                          sx={{
                            "& .MuiFormControlLabel-label": { color: "#472A1F", fontSize: "14px" },
                            "& .MuiSvgIcon-root": {},
                          }}
                          key={`formControlLabel-${filter}`}
                          label={filter}
                          control={
                            <CheckBox
                              checked={field.value}
                              className="text-[16px]"
                              style={{ color: "#966844" }}
                              key={`checkbox-diet-filters-${index}`}
                              {...field}
                            ></CheckBox>
                          }
                        ></FormControlLabel>
                      );
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div id="allergen-input" className="">
            <p className=" text-sorghum font-bauhaus font-medium text-[16px]">Allergens</p>
            <div className="grid grid-cols-2">
              {allergensOption?.map((filter, index) => {
                return (
                  <Controller
                    name={filter}
                    key={`controller-allergen-checkBox-${filter}`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <FormControlLabel
                          className="mx-2"
                          sx={{
                            "& .MuiFormControlLabel-label": { color: "#472A1F", fontSize: "14px" },
                            "& .MuiSvgIcon-root": {},
                          }}
                          key={`formControlLabel-${filter}`}
                          label={filter}
                          control={
                            <CheckBox
                              checked={field.value}
                              className="text-[16px]"
                              style={{ color: "#966844" }}
                              {...field}
                              key={`checkbox-allergen-filters-${index}`}
                            ></CheckBox>
                          }
                        ></FormControlLabel>
                      );
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-auto pb-10 items-center gap-4 mx-[22px]">
          <button
            type="button"
            className="w-full max-w-[310px] h-[56px] font-bauhaus bg-quinoa text-cornsilk rounded-full disabled:opacity-50"
            disabled={isLoading || isFetching || !data?.length}
            onClick={goToMenu}
          >
            {isLoading || isFetching ? "Fetching..." : !data?.length ? "no results" : `see ${data.length} results`}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              resetFiltersHandler();
            }}
            className="flex flex-row items-center font-bauhaus justify-center w-full max-w-[310px] h-[56px] rounded-full border-quinoa text-quinoa border-2 "
          >
            <img className="mr-2 pt-1" src="/refresh.svg"></img>reset filters
          </button>
        </div>
      </form>
    </div>
  );
};
