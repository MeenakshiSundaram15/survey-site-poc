"use client";
import { SaladIcon } from "@/components/Icons/SaladIcon";
import { Spinner } from "@/components/Icons/Spinner";
import { TryAgainIcon } from "@/components/Icons/TryAgainIcon";
import { SurveyInputKey, SurveyInputValue, surveySchema, TSurveySchema } from "@/hooks/survey/useSurvey";
import { useSurvey } from "@/hooks/survey/useSurvey";
import { TFilterValues, useFilter } from "@/hooks/useFilters";
import useMacroCalculator, { TMacroCalculatorInput } from "@/hooks/useMacroCalculator";
import { useWindowSize } from "@/hooks/useWindowSize";
import { NutritionDetail } from "@/models/nutrition-details";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type Field = {
  id: string;
  label: string;
  placeholder?: string;
  suffix?: string;
  options?: Option[];
};

const SurveyBreakdownItem = ({
  isLoading,
  value,
  unit,
  valueSuffix,
  className,
}: React.HTMLAttributes<HTMLDivElement> & {
  isLoading: boolean;
  value: string;
  unit: string;
  valueSuffix?: string;
}) => (
  <div
    className={`rounded-full w-[115px] h-[115px] flex flex-col items-center justify-center text-oatmeal duration-500 ${
      !isLoading ? "bg-quinoa" : "scale-[0.50]"
    } ${className || ""}`}
  >
    {/* <Spinner className={`text-quinoa absolute text-[60px] pointer-events-none ${!isLoading ? "opacity-0" : ""}`} /> */}
    <div className="font-play font-bold text-[38.54px] flex leading-none">
      <span>{Math.round(Number(value) || 0) || "-"}</span>
      {valueSuffix && <span className="text-[19.27px] mt-[2px] ml-[0.28px]">{valueSuffix}</span>}
    </div>
    <span className="-mt-0.5">{unit}</span>
  </div>
);

export const surveyFields: Field[] = [
  {
    label: "What is your current fitness goal?",
    options: [
      { value: "Gain Weight", label: "Gain Weight" },
      { value: "Fat Loss", label: "Fat Loss" },
      { value: "Maintain", label: "Maintain" },
      { value: "Muscle Gain", label: "Muscle Gain" },
      { value: "Endurance Performance", label: "Endurance Performance" },
    ],
    id: "preference",
  },
  {
    label: "What is your age?",
    placeholder: "in years",
    id: "age",
  },
  {
    label: "What is your gender?",
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
    ],
    id: "gender",
  },
  {
    label: "What is your weight?",
    placeholder: "in kg",
    id: "weight",
  },
  {
    label: "What is your height?",
    placeholder: "in cm",
    id: "height",
  },
  {
    label: "How would you describe your weekly activity level?",
    options: [
      { value: "Sedentary", label: "Almost none" },
      { value: "Lightly Active", label: "Lightly active (1-3 days per week)" },
      { value: "Moderately Active", label: "Moderately active (3-5 days per week)" },
      { value: "Very Active", label: "Very active (6-7 days per week)" },
      { value: "Extra Active", label: "Extremely active (twice or more per day)" },
    ],
    id: "physicalActivity",
  },
  // "7": {
  //   question: "How many meals do you consume per day?",
  //   inputs: [{ description: "meals", placeHolder: "meals", unit: "" }],
  //   id: "mealsConsumedPerDay",
  // },
];

export const numberOfQuestions = surveyFields.length;

export const SurveyContent = ({ visible }: { visible: boolean }) => {
  const { windowHeight } = useWindowSize();

  const pathname = usePathname();
  const { updateAllFilters, updateBowlName } = useFilter();
  const { push, back, replace } = useRouter();
  const { setValue: setHookValue, formValues, resetValues } = useSurvey();

  const showResult = useMemo(() => pathname === "/survey/result", [pathname]);
  const activeIndex = useMemo(() => {
    if (!pathname.includes("/survey/")) return 1;

    const currentIndex = pathname?.replace("/survey/", "");
    return Number(currentIndex);
  }, [pathname]);

  const {
    setValue,
    watch,
    trigger,
    reset,
    register,
    formState: { errors },
  } = useForm<TSurveySchema>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      preference: undefined,
      age: undefined,
      gender: undefined,
      weight: undefined,
      height: undefined,
      physicalActivity: undefined,
    },
  });

  const onSelectOption = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const value = e?.currentTarget.dataset?.optionValue as SurveyInputValue;
    const key = e?.currentTarget?.dataset?.optionKey as SurveyInputKey;
    setValue(key, value);
  }, []);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.currentTarget.value as SurveyInputValue;
    const key = e?.currentTarget?.dataset?.optionKey as SurveyInputKey;
    // Always change to number as we don't have other text fields that is not number
    setValue(key, Number(value));
    trigger(key);
  }, []);

  const submit = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      const key = e?.currentTarget?.dataset?.submitKey as SurveyInputKey;
      const value = e?.currentTarget.dataset?.submitValue as SurveyInputValue;
      const valid = await trigger(key);
      if (valid) {
        setHookValue(key, value);

        if (activeIndex !== 6) {
          push(`/survey/${activeIndex + 1}`);
        } else {
          push(`/survey/result`);
        }
      }
    },
    [activeIndex]
  );

  const previous = useCallback(() => {
    back();
  }, []);

  // Intiailize all values
  useEffect(() => {
    Object.keys(formValues).forEach((key) => {
      const value = formValues[key as SurveyInputKey];
      if (value) {
        const field = surveyFields.find((surveyField) => surveyField.id === key);
        const isNumberField = !field?.options;
        setValue(key as SurveyInputKey, isNumberField ? Number(value) : value);
        // Set input values as well
        const inputField = document.querySelector(`input[data-option-key=${key}]`) as HTMLInputElement;
        if (inputField) {
          inputField.value = value as string;
        }
      }
    });
  }, []);

  const filledResults = useMemo(() => {
    const { gender, age, weight, height, physicalActivity, preference } = formValues;
    if (gender && age && weight && height && physicalActivity && preference) {
      return formValues as TMacroCalculatorInput;
    }
    return undefined;
  }, [formValues]);

  const { data: macroResult, isLoading: loading } = useMacroCalculator({ inputValues: filledResults });
  const [lastResult, setLastResult] = useState<NutritionDetail | undefined>(undefined);

  const isLoading = !!(filledResults && loading);

  const orderNow = useCallback(() => {
    if (macroResult) {
      setLastResult(macroResult);
      const recommendedFilters = macroResult.filters;
      const filterKeys = Object.keys(recommendedFilters);

      if (filterKeys.length > 0) {
        const updatedValues = {} as TFilterValues;
        filterKeys.forEach((filterKey) => {
          const { operator, min, max, value } = recommendedFilters[filterKey as keyof TFilterValues];
          if (operator === "BETWEEN" && min && max) {
            updatedValues[filterKey as keyof TFilterValues] = [Math.round(min), Math.round(max)] as any;
          } else {
            console.log(
              "error found, values not coming as min and max",
              recommendedFilters[filterKey as keyof TFilterValues]
            );
          }
        });
        updateAllFilters(updatedValues);
        updateBowlName("");
        push(`/menu`);
      }
    }
  }, [macroResult]);

  useEffect(() => {
    macroResult && setLastResult(macroResult);
  }, [macroResult]);

  const tryAgain = useCallback(() => {
    resetValues();
    reset();
    // Clear input fields
    const inputFields = document.querySelectorAll("input[data-input-field=true]") as NodeListOf<HTMLInputElement>;
    inputFields?.forEach((field) => {
      field.value = "";
    });

    push(`/survey/1`);
  }, []);

  // Redirect user to unfilled page
  useEffect(() => {
    const previousId = surveyFields?.[activeIndex - 2]?.id;
    let allFilled = true;

    surveyFields.forEach((field) => {
      if (!filledResults?.[field.id as SurveyInputKey]) {
        allFilled = false;
      }
    });

    if (pathname === "/survey/result" && !filledResults) {
      replace(`/survey/6`);
    } else if (pathname === "/survey/1" && allFilled) {
      replace("/survey/result");
    } else {
      if (activeIndex > 1 && previousId) {
        const previousValue = watch(previousId as SurveyInputKey);
        // Go back to previous survey question if skipping happened
        if (!previousValue) {
          replace(`/survey/${activeIndex - 1}`);
        }
      }
    }
  }, [pathname]);

  const goal = watch("preference");

  const [lastSelectedGoal, setLastSelectedGoal] = useState<string | undefined>();

  useEffect(() => {
    setLastSelectedGoal(goal);
  }, [goal]);

  return (
    <div
      className={`duration-500 ${
        !visible ? "opacity-0 h-0" : `mt-4`
      } relative flex flex-col items-center [&>*]:shrink-0`}
      style={{
        ...(visible && windowHeight
          ? {
              height: !showResult ? `${windowHeight - 108 - 32}px` : `${windowHeight - 60 - 32}px`,
            }
          : {}),
      }}
    >
      <div className="relative flex flex-col items-center min-h-0 flex-1 w-full">
        {/* Result */}
        <div
          className={`${
            !showResult ? `opacity-0 pointer-events-none absolute h-full translate-x-full` : ``
          } duration-500 flex flex-col flex-1 overflow-auto min-h-0 w-full`}
        >
          <span className="font-bauhaus text-[19.27px] tracking-[0.02em] mx-auto">Hello!</span>
          <div className="w-[min(100%-44px)] text-center font-worksans font-light text-[13.49px] leading-[23.1px] max-w-[320px] mx-auto flex flex-col gap-3">
            <div>{`Welcome to the start of your wellness journey.`}</div>
            <div>
              {`We recommend a caloric intake of `}
              <span className="font-semibold">{`${
                Math.round(macroResult?.energyKcal || 0) || "-"
              } kcals per meal`}</span>
              {` to accomplish your goal of `}
              <span className="font-semibold">{`${lastSelectedGoal || "-"}.`}</span>
            </div>
            <div>{`This is the breakdown for your wisebite meal:`}</div>
          </div>
          {/* Breakdown */}
          <div className="flex gap-[23px] flex-wrap items-center justify-center mt-3 max-w-[300px] mx-auto relative pb-3">
            <Spinner
              className={`text-quinoa absolute text-[60px] pointer-events-none ${isLoading ? "" : "opacity-0"}`}
              animate={isLoading}
            />
            <SurveyBreakdownItem isLoading={isLoading} value={`${macroResult?.energyKcal || "-"}`} unit="kcals" />
            <SurveyBreakdownItem
              isLoading={isLoading}
              value={`${macroResult?.carbsPerMealGram || "-"}`}
              unit="carbs"
              valueSuffix="g"
              className={"delay-100"}
            />
            <SurveyBreakdownItem
              isLoading={isLoading}
              value={`${macroResult?.protienGram || "-"}`}
              unit="protein"
              valueSuffix="g"
              className={"delay-150"}
            />
            <SurveyBreakdownItem
              isLoading={isLoading}
              value={`${macroResult?.fatPerMealGram || "-"}`}
              unit="fats"
              valueSuffix="g"
              className={"delay-200"}
            />
          </div>
          <div className="mx-auto font-worksans text-[13px] leading-4 text-center text-sorghum mt-3">
            {"Total recommended caloric intake:"}
          </div>
          <div className="flex items-center justify-center mx-auto text-[11px] font-play font-bold gap-1 text-quinoa mb-4">
            <span>{`${Math.round(Number(macroResult?.energy) || 0) || "-"}kcals`}</span>
            <span className="font-worksans text-[17.5px] leading-6 font-extralight">|</span>
            <span>{`Carbs: ${Math.round(Number(macroResult?.carbsGram) || 0) || "-"}g`}</span>
            <span className="font-worksans text-[17.5px] leading-6 font-extralight">|</span>
            <span>{`Protein: ${Math.round(Number(macroResult?.proGram) || 0) || "-"}g`}</span>
            <span className="font-worksans text-[17.5px] leading-6 font-extralight">|</span>
            <span>{`Fat: ${Math.round(Number(macroResult?.fatGram) || 0) || "-"}g`}</span>
          </div>

          {/* Results Next CTA */}
          <div className="flex flex-col gap-3 w-[min(100%-44px)] mx-auto mt-auto pb-3">
            <button
              tabIndex={!showResult ? -1 : undefined}
              type="button"
              className="text-cornsilk bg-quinoa rounded-full flex items-center justify-center gap-2 h-[54px]"
              onClick={orderNow}
            >
              <SaladIcon className="text-[19.27px]" />
              <span className="text-[19.27px] tracking-[0.02em] font-bauhaus">order now</span>
            </button>
            <button
              tabIndex={!showResult ? -1 : undefined}
              type="button"
              className="text-quinoa border border-quinoa rounded-full flex items-center justify-center gap-2 h-[54px]"
              onClick={tryAgain}
            >
              <TryAgainIcon className="text-[19.27px]" />
              <span className="text-[19.27px] tracking-[0.02em] font-bauhaus">try again</span>
            </button>
          </div>
        </div>
        {/* Fields */}
        {surveyFields?.map((field, idx) => {
          const currentIndex = idx + 1;
          const active = currentIndex === activeIndex;
          const { options, label, id, placeholder } = field;
          const value = watch(id as SurveyInputKey);
          return (
            <div
              className={`${
                !active
                  ? `opacity-0 pointer-events-none absolute h-full ${
                      showResult || currentIndex < activeIndex
                        ? "-translate-x-full"
                        : currentIndex > activeIndex
                        ? "translate-x-full"
                        : ""
                    }`
                  : ""
              } duration-500 flex flex-col flex-1 overflow-auto min-h-0 w-full`}
              key={id}
            >
              <span className="font-bauhaus text-[19.27px] tracking-[0.02em] mx-8 text-center">{label}</span>
              {!!options && (
                <div className="flex flex-col gap-4 mt-4 pt-2 px-9 pb-2 mb-4 flex-1 overflow-auto">
                  {options.map((option) => {
                    const selected = value === option.value;
                    return (
                      <button
                        tabIndex={!active ? -1 : undefined}
                        key={option.value}
                        className={`h-[61.66px] shrink-0 w-full rounded-full flex items-center justify-center bg-feta-light text-sorghum duration-300 ${
                          selected ? "ring-2 ring-quinoa" : ""
                        }`}
                        type="button"
                        onClick={onSelectOption}
                        data-option-key={id}
                        data-option-value={option.value}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                  {!!errors[id as SurveyInputKey] && (
                    <span className="text-xs text-center -mt-2 font-worksans font-medium text-red-500">
                      {errors[id as SurveyInputKey]?.message}
                    </span>
                  )}
                </div>
              )}
              {!options && (
                <div className="flex flex-col gap-4 mt-4 pt-2 px-9 pb-2 mb-4 flex-1 overflow-auto">
                  <input
                    data-input-field={true}
                    data-option-key={id}
                    placeholder={placeholder}
                    type="text"
                    onChange={onChange}
                    tabIndex={!active ? -1 : undefined}
                    className="rounded-full border-2 ring-0 ring-quinoa/50 focus-within:ring-4 focus-within:border-quinoa duration-300 border-quinoa/50 h-[61.66px] shrink-0 w-full bg-feta-light text-center font-worksans text-base text-sorghum outline-none focus-within:outline-none"
                  />
                  {!!errors[id as SurveyInputKey] && (
                    <span className="text-xs text-center -mt-2 font-worksans font-medium text-red-500">
                      {errors[id as SurveyInputKey]?.message}
                    </span>
                  )}
                </div>
              )}
              <div className="mx-9 mb-4 flex items-center gap-3">
                {activeIndex !== 1 && (
                  <button
                    tabIndex={!active ? -1 : undefined}
                    onClick={previous}
                    data-submit-key={id}
                    data-submit-value={value}
                    className={`disabled:opacity-50 disabled:grayscale-[0.5] text-quinoa border border-quinoa flex items-center justify-center text-center font-bauhaus tracking-[0.02em] text-[19.27px w-full h-[54px] rounded-full`}
                  >
                    previous
                  </button>
                )}
                <button
                  tabIndex={!active ? -1 : undefined}
                  onClick={submit}
                  data-submit-key={id}
                  data-submit-value={value}
                  className={`disabled:opacity-50 disabled:grayscale-[0.5] bg-quinoa flex items-center justify-center text-center font-bauhaus tracking-[0.02em] text-[19.27px w-full h-[54px] rounded-full text-cornsilk`}
                  disabled={!value || !!errors[id as SurveyInputKey]}
                >
                  next
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
