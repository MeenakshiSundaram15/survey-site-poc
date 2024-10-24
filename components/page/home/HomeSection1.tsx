"use client";

import { Fragment, SVGAttributes } from "react";
import RectangleSplit from "@/assets/home/rectangle_split.svg";

const EFFORTLESS_NUTRITION_SENTENCES = [
  "Achieve your body goals",
  "Elevate your confidence",
  "Feel rejuvenated",
  "Boost your energy",
  "Improve digestive wellness",
  "Feel at ease",
];

const GOAL_SENTENCES = ["Fat loss", "Weight gain", "Increased strength", "Cardiovascular fitness", "Maintenance"];

const Eclipse = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="4" cy="4" r="3.5" stroke="#966844" />
  </svg>
);

export const HomeSection1 = () => {
  return (
    <div className="w-full xl:h-[672px] flex bg-oatmeal relative">
      <img src={RectangleSplit.src} className="absolute left-0 top-0 w-full h-full object-cover hidden xl:block" />

      {/* Effortless nutrition */}
      <div className="flex-1 h-full flex justify-center items-center py-6 xl:items-start xl:pt-[121px] z-10">
        <div className="flex flex-col">
          <span className="text-quinoa font-bauhaus text-base xl:text-[40px] xl:leading-[38.92px] font-medium mb-4 xl:mb-[24px] text-center xl:text-left">
            effortless nutrition
          </span>
          <div className="flex flex-col items-center xl:items-start gap-4 font-worksans font-light text-xs xl:text-[20px] xl:leading-[23.46px] text-sorghum">
            <span>{"We\'ll help you to:"}</span>
            <div className="flex flex-col gap-4">
              {EFFORTLESS_NUTRITION_SENTENCES.map((sentence) => (
                <div className="flex items-center gap-4" key={sentence}>
                  <Eclipse className='w-1 xl:w-2' />
                  <span>{sentence}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* What's your goal? */}
      <div className="flex-1 h-full justify-center pt-[121px] relative z-10 hidden xl:flex">
        <div className="flex flex-col z-10">
          <span className="text-quinoa font-bauhaus text-[40px] leading-[38.92px] font-medium z-10 text-center">
            {"what\'s your goal"}
          </span>
          <div className="mt-6 w-[400px] flex flex-col gap-4">
            {GOAL_SENTENCES.map((sentence) => (
              <div
                key={sentence}
                className="rounded-full h-16 flex items-center justify-center text-center bg-[#E9DAC8] font-worksans tracking-[0.02em] text-base leading-[18.77px] font-normal"
              >
                {sentence}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
