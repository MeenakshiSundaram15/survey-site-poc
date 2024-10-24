import { ValueOf } from "next/dist/shared/lib/constants";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const surveySchema = z.object({
  gender: z.enum(["Male", "Female"]),
  age: z.number({ required_error: "Age is required", invalid_type_error: "Please enter number only" }).min(0),
  weight: z.number({ required_error: "Weight is required", invalid_type_error: "Please enter number only" }).min(0),
  height: z.number({ required_error: "Height is required", invalid_type_error: "Please enter number only" }).min(0),
  physicalActivity: z.enum(["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extra Active"]),
  preference: z.enum(["Gain Weight", "Fat Loss", "Maintain", "Muscle Gain", "Endurance Performance"]),
});

export type TSurveySchema = z.infer<typeof surveySchema>;
export type SurveyInputKey = keyof TSurveySchema;
export type SurveyInputValue = TSurveySchema[keyof TSurveySchema];

interface SurveyState {
  formValues: Partial<TSurveySchema>;
  setValue: (key: SurveyInputKey, value: any) => void;
  resetValues: () => void;
}

const initialState = { formValues: {} } as SurveyState;

export const useSurveyStore = create<SurveyState>()(
  persist(
    (set) => ({
      ...initialState,
      setValue: (key, value) => {
        set((state: SurveyState) => ({
          formValues: { ...state.formValues, [key]: value },
        }));
      },
      resetValues: () =>
        set(() => ({
          formValues: {
            ...initialState.formValues,
          },
        })),
    }),
    { name: "survey" }
  )
);

export const useSurvey = () => {
  const { formValues, setValue, resetValues } = useSurveyStore();

  return {
    formValues,
    setValue,
    resetValues,
  };
};
