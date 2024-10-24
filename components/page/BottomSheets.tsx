"use client";
import { usePathname } from "next/navigation";
import { PageType } from "./PageType";
import { Fragment, useEffect, useMemo } from "react";
import { IntroSheet } from "./home/IntroSheet";
import { StepOneSheet } from "./StepOneSheet";
import { StepTwoSheet } from "./StepTwoSheet";
import { StepThreeSheet } from "./StepThreeSheet";
import { Logo } from "../Icons/Logo";
// import Hero from "@/assets/home/hero.png";
import Hero from "@/assets/home/bowl_bg.webp";
import { useWindowSize } from "@/hooks/useWindowSize";

export const BottomSheets = () => {
  const pathname = usePathname();
  const { windowWidth } = useWindowSize();

  const pageType: PageType = useMemo(() => {
    if (pathname.includes("/survey")) {
      return "survey";
    }
    if (pathname === "/filter") {
      return "filter";
    }
    if (pathname === "/menu") {
      return "menu";
    }
    if (pathname.includes("/scan")) {
      return "scan";
    }
    if (pathname.includes("/menu/")) {
      return "product";
    }
    return "home";
  }, [pathname]);

  return (
    <div
      style={{
        overflow: "hidden",
      }}
      className={`${
        pageType === "home" ? "z-[999] overflow-y-auto" : "overflow-y-hidden"
      } fixed top-0 bottom-0 min-h-0 right-0 left-0 overflow-x-hidden pointer-events-none [&>*]:pointer-events-auto `}
    >
      <div
        id="bottom-sheets"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          overflowY: pageType === "home" ? "auto" : "hidden",
          overflowX: "hidden",
        }}
        className="max-w-[540px] mx-auto"
      >
        {pageType === "home" && (
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <div className="relative h-full flex justify-center">
              <div className="absolute w-full h-full flex flex-col justify-start pt-4 overflow-hidden">
                <div
                  className={`duration-700 shrink-0 left-0 right-0 flex flex-col items-center justify-start z-10 overflow-hidden text-sorghum font-bauhaus text-base origin-center leading-none text-center font-medium`}
                >
                  <Logo className={`duration-500 text-quinoa w-[129px] mb-[14px]`} />
                  Health goals made simple,
                  <br />
                  no diets needed
                </div>
                <div className="z-0 w-full aspect-square bg-slate-200 overflow-visible">
                  <img
                    alt="hero"
                    className="w-[124%] h-auto object-contain z-0 max-w-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[8.2%]"
                    src={Hero.src}
                  />
                </div>
                {/* <div className="absolute">
                  <img
                    alt="hero"
                    className="w-[124%] h-auto object-contain z-0 max-w-none relative left-1/2 -translate-x-1/2"
                    src={Hero.src}
                  />
                </div> */}
              </div>
              {/* <div className="absolute -top-[64px]">
                  <img
                    alt="hero"
                    className="w-[124%] h-auto object-contain z-0 max-w-none relative left-1/2 -translate-x-1/2"
                    src={Hero.src}
                  />
                  <div
                    className={`duration-700 absolute bottom-[79%] left-0 right-0 flex flex-col items-center justify-start z-10 overflow-hidden text-sorghum font-bauhaus text-base origin-center leading-none text-center font-medium`}
                  >
                    <Logo className={`duration-500 text-quinoa w-[129px] mb-[14px]`} />
                    Health goals made simple,
                    <br />
                    no diets needed
                  </div>
                </div>
              </div> */}
              {/* <img alt="hero" className="w-[124%] absolute h-auto object-contain z-0 max-w-none" src={Hero.src} />
              <div
                className={`duration-700top-[14px] bottom-0 left-0 right-0 flex flex-col items-center justify-start z-10 overflow-hidden text-sorghum font-bauhaus text-base origin-center leading-none text-center font-medium`}
              >
                <Logo className={`duration-500 text-quinoa w-[129px] mb-[14px]`} />
                Health goals made simple,
                <br />
                no diets needed
              </div> */}
            </div>
            {/* <div className="absolute left-0 bottom-0 right-0 top-0 bg-[#2D2318] bg-opacity-60 backdrop-blur-[0.5px]" /> */}
          </div>
        )}
        <div className={`relative h-full duration-500 ${pageType === "home" ? "min-h-[844px]" : "min-h-[500px]"}`}>
          <IntroSheet state={pageType === "home" ? "visible" : pageType === "scan" ? "background" : "background"} />
          <StepOneSheet
            state={
              pageType === "home"
                ? "initial"
                : pageType === "survey"
                ? "survey"
                : pageType === "filter"
                ? "filter"
                : "hidden"
            }
          />
          {pageType !== "home" && (
            <Fragment>
              <StepTwoSheet state={pageType === "menu" ? "initial" : "hidden"} />
              <StepThreeSheet state={pageType === "product" ? "initial" : pageType === "scan" ? "scan" : "hidden"} />
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
