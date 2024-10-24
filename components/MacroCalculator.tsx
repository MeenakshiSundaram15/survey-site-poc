"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PageWrapper } from "./ui/PageWrapper";
import { Fragment, useEffect, useState } from "react";
import { ActivityLevels, Genders, Goals, TActivityLevel, TGender, TGoal } from "@/constants/macroCalculator";
import useMacroCalculator, { TMacroCalculatorInput } from "@/hooks/useMacroCalculator";
import { Spinner } from "./Icons/Spinner";
import { NutritionDetail } from "@/models/nutrition-details";

export const MacroCalculator = ({ onSubmitCompleted }: { onSubmitCompleted?: (result: NutritionDetail) => void }) => {
  const [formValues, setFormValues] = useState<TMacroCalculatorInput>();

  const { data, isFetching, isLoading } = useMacroCalculator({
    inputValues: formValues,
    onCalculate: onSubmitCompleted,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const gender = (e?.currentTarget?.elements?.["gender" as any] as HTMLInputElement).value as TGender;
    const age = Number((e?.currentTarget?.elements?.["age" as any] as HTMLInputElement).value);
    const weight = Number((e?.currentTarget?.elements?.["weight" as any] as HTMLInputElement).value);
    const height = Number((e?.currentTarget?.elements?.["height" as any] as HTMLInputElement).value);
    const physicalActivity = (e?.currentTarget?.elements?.["physicalActivity" as any] as HTMLInputElement)
      .value as TActivityLevel;
    const preference = (e?.currentTarget?.elements?.["preference" as any] as HTMLInputElement).value as TGoal;
    const mealsConsumedPerDay = Number(
      (e?.currentTarget?.elements?.["mealsConsumedPerDay" as any] as HTMLInputElement).value
    );
    setFormValues({
      gender,
      age,
      weight,
      height,
      physicalActivity,
      preference,
      // mealsConsumedPerDay,
    });
  };

  return (
    <PageWrapper className="gap-4 mx-auto justify-center flex-wrap w-full">
      <form
        className="flex flex-col gap-4 p-4 ring-1 rounded-md ring-slate-200 min-w-[480px] flex-1"
        onSubmit={onSubmit}
      >
        <span className="font-semibold text-base">Macro Calculator Form</span>
        <FormControl fullWidth>
          <InputLabel size="small" id="gender">
            Gender
          </InputLabel>
          <Select size="small" labelId="gender" label="Gender" required name="gender">
            {Genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <TextField size="small" label="Age" name="age" required type="number" />
        </FormControl>
        <FormControl>
          <TextField size="small" label="Weight(kg)" name="weight" required type="number" />
        </FormControl>
        <FormControl>
          <TextField size="small" label="Height(cm)" name="height" required type="number" />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel size="small" id="physicalActivity">
            Activity
          </InputLabel>
          <Select size="small" labelId="physicalActivity" label="Activity" required name="physicalActivity">
            {ActivityLevels.map((activity) => (
              <MenuItem key={activity} value={activity}>
                {activity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel size="small" id="preference">
            Your Goal
          </InputLabel>
          <Select size="small" labelId="preference" label="Your Goal" required name="preference">
            {Goals.map((goal) => (
              <MenuItem key={goal} value={goal}>
                {goal}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            size="small"
            label="Meals per day"
            name="mealsConsumedPerDay"
            defaultValue={3}
            required
            type="number"
          />
        </FormControl>
        <button
          className="rounded-md ring-1 disabled:bg-opacity-70 flex items-center justify-center gap-3 ring-slate-200 shadow-sm bg-core-kale hover:bg-opacity-90 transition-all active:scale-95 px-2 py-2 font-medium text-white"
          type="submit"
          disabled={isFetching}
        >
          <span>Calculate</span>
          {isFetching && <Spinner className="!text-white" />}
        </button>
      </form>
      <div className="flex flex-col gap-4 p-4 ring-1 rounded-md ring-slate-200 min-w-[480px] min-h-[480px] flex-1">
        <span className="font-semibold text-base">Nutrition Details</span>
        <div className="p-3 rounded-md ring-1 ring-slate-200 flex-1 flex flex-col gap-3 text-sm font-medium leading-tight">
          {!data && <span className="opacity-70">Modify the values and click on calculate to start.</span>}
          {data && (
            <Fragment>
              <div className="flex gap-4">
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">TDEE:</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.tdee}</span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-1" />
              </div>
              <div className="flex gap-4">
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">BMR:</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.bmr}</span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">BMI:</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.bmi}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Energy:</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.energy}</span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Energy (kcal):</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.energyKcal}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Protein (gram):</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.proGram}</span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Protein (Kcal):</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.proKcal}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Protein Percentage:</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.proPercent}</span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Protein per meal (gram):</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.protienGram}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Carbs (gram):</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.carbsGram}</span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Carbs (kcal):</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.carbsKcal}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Carbs Percentage:</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.carbsPercent}</span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Carbs Per Meal (gram):</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">
                    {data.carbsPerMealGram}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Fats (gram):</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.fatGram}</span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Fats (Kcal):</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.fatKcal}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Fat Percentage:</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.fatPercent}</span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span className="opacity-70 font-medium">Fat Per Meal (gram):</span>
                  <span className="font-bold bg-core-olive text-white rounded-md px-2 py-1">{data.fatPerMealGram}</span>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
