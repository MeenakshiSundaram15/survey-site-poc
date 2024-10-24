"use client";
import { Fragment, useCallback } from "react";
import HeroImageStatic from "@/assets/home/hero.png";
import { HeroImageForeground } from "@/components/DynamicImage/Hero";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const HeroContent = () => {
  const { push } = useRouter();

  const goToSurvey = useCallback(() => {
    push("/survey");
  }, []);

  const goToMenu = useCallback(() => {
    push("/menu");
  }, []);

  return (
    <Fragment>
      {/* Hero image */}
      <div className="relative flex items-center xl:h-screen">
        <Image alt="hero" src={HeroImageStatic} className="w-full h-full object-cover" />
        {/* Foreground cover */}
        {/* <div className='absolute left-0 bottom-0 right-0 top-0 bg-[#2D2318] bg-opacity-60 backdrop-blur-[2px] animate-fade-in' /> */}
        {/* Foreground cover no blur */}
        <div className="absolute left-0 bottom-0 right-0 top-0 bg-[#2D2318] bg-opacity-60 animate-fade-in" />

        <HeroImageForeground className="absolute left-0 top-0 w-full h-full hidden md:block" />
      </div>
      {/* Content */}
      <div className="absolute z-20 left-0 right-0 bottom-0 top-0 flex flex-col items-center justify-center text-center">
        <div className="relative flex items-center justify-center opacity-0 animate-fade-in-from-bottom animate-delay-[300ms] md:animation-delay-[1800ms]">
          <span className="font-bauhaus text-cornsilk text-xl tracking-[0.02em] font-medium leading-[24px] xl:text-[48px] xl:leading-[64px]">
            Health goals made simple,
            <br />
            no diets needed.
          </span>
        </div>
        {/* Discover button */}
        <button
          type="button"
          onClick={goToSurvey}
          className="mt-6 rounded-full bg-oatmeal text-quinoa text-sm font-medium xl:text-[20px] tracking-[0.02em] font-bauhaus h-[42px] xl:h-[55px] w-[230px] xl:w-[323px] flex items-center justify-center opacity-0 animate-fade-in-scale animation-delay-[600ms] md:animation-delay-[2400ms]"
        >
          discover my nutrition profile
        </button>
        <button
          type="button"
          onClick={goToMenu}
          className="mt-2 xl:mt-6 rounded-full text-oatmeal bg-quinoa text-sm font-medium xl:text-[20px] tracking-[0.02em] font-bauhaus h-[42px] xl:h-[55px] w-[230px] xl:w-[323px] flex items-center justify-center opacity-0 animate-fade-in-scale animation-delay-[600ms] md:animation-delay-[2400ms]"
        >
          order menu
        </button>
      </div>
    </Fragment>
  );
};
