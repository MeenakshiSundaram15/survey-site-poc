"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PageType } from "./PageType";
import SaladBowlIcon from "@/assets/salad-bowl.png";
import Logo from "@/assets/logo.png";
import { usePathname, useRouter } from "next/navigation";
import { CollapsibleRow } from "./CollapsibleRow";
import { numberOfQuestions, SurveyContent } from "./survey/SurveyContent";
import { FilterContent } from "./filter/FilterContent";

type TStepOneState = "initial" | "survey" | "filter" | "hidden";

export const StepOneSheet = ({ state }: { state: TStepOneState }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const activeIndex = useMemo(() => {
    if (!pathname.includes("/survey")) return undefined;
    if (!pathname.includes("/survey/")) return 1;

    const currentIndex = pathname?.replace("/survey/", "");
    return Number(currentIndex);
  }, [pathname]);

  const goToPage = useCallback((page: string) => {
    const bottomSheetsContainer = document.querySelector("#bottom-sheets") as HTMLDivElement;
    // console.log("bottomSheetsContainer", bottomSheetsContainer.scrollTop);
    if (bottomSheetsContainer) {
      document.body.scrollTo(0, 0);
      bottomSheetsContainer.style.overflow = "hidden";
      bottomSheetsContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // setTimeout(() => push(page), 250);
    push(page);
  }, []);

  useEffect(() => {
    const bottomSheetsContainer = document.querySelector("#bottom-sheets") as HTMLDivElement;
    if (bottomSheetsContainer.style.overflow === "hidden" && pathname === "/") {
      bottomSheetsContainer.style.overflow = "auto";
    }
  }, [pathname]);

  return (
    <div
      className={`${
        state !== "initial" ? "" : ""
      } duration-700 bg-oatmeal absolute bottom-0 -left-[1px] -right-[1px] z-10 shadow-xl shadow-black/75 rounded-tl-[34px] rounded-tr-[34px] py-3`}
    >
      {!!activeIndex && !isNaN(activeIndex) && (
        <div
          className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+24px)] text-couscous font-worksans font-light text-[15.42px] tracking-[0.02em] leading-none`}
        >{`${activeIndex}/${numberOfQuestions}`}</div>
      )}
      <div
        className={`${
          state === "initial" ? "opacity-0" : ""
        } flex items-center gap-1.5 absolute bottom-full translate-y-1/2 right-[38px] bg-quinoa rounded-full px-[9.16px] h-[27.18px] text-white font-bauhaus pointer-events-none`}
      >
        <img src={SaladBowlIcon.src} className="w-4 h-auto" />
        <span className="text-[13.49px] tracking-[0.02em]">step 1</span>
      </div>

      <div id="step-one-sheet">
        {/* CTAs For Home Page */}
        <CollapsibleRow hidden={state !== "initial"}>
          <div
            className={`duration-500 ${
              state !== "initial" ? "opacity-0" : "pt-4"
            } relative flex flex-col items-center [&>*]:shrink-0`}
          >
            <span className="font-bauhaus text-base tracking-[0.02em] mx-auto">Start by selecting an option below</span>
            <div
              className={`flex flex-col gap-3 w-full px-10 mt-3.5 tracking-[0.02em] overflow-hidden duration-700 delay-300 ${
                state !== "initial" ? "opacity-0" : ""
              }`}
            >
              <button
                onClick={() => goToPage("/survey/1")}
                className="text-xs cursor-pointer bg-quinoa rounded-full text-gray-lightest text-center h-[54px] w-full flex flex-col items-center justify-center font-worksans"
              >
                <span className="font-semibold">Take the quiz</span>
                <span>we&apos;ll calculate your nutritional needs</span>
              </button>
              <button
                onClick={() => goToPage("/filter")}
                className="text-xs cursor-pointer bg-quinoa rounded-full text-gray-lightest text-center h-[54px] w-full flex flex-col items-center justify-center font-worksans"
              >
                <span className="font-semibold">Apply your macros</span>
                <span>aligned with your preferences</span>
              </button>
              {/* Powered by */}
              <div className="flex items-center mr-auto mt-2">
                <span className="font-worksans tracking-[0.02em] text-[8.9px]">Powered by</span>
                <img alt="saladstop" src={Logo.src} className="h-[42px] w-auto" />
              </div>
            </div>
          </div>
        </CollapsibleRow>

        {/* Survey Content */}
        <CollapsibleRow hidden={state !== "survey"}>
          <SurveyContent visible={state === "survey"} />
        </CollapsibleRow>

        {/* Filter Content */}
        <CollapsibleRow hidden={state !== "filter"}>
          <FilterContent visible={state === "filter"} />
        </CollapsibleRow>
      </div>
    </div>
  );
};
