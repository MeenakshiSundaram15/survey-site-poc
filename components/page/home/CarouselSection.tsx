"use client";
import { landingPageProducts } from "@/constants/landingPageProducts";
import StockBowlImage from "@/assets/home/stock_bowl.png";
import React, { HTMLAttributes, SVGAttributes, useCallback, useEffect, useState } from "react";
import { AllergenIconKey, AllergenIcons } from "@/components/Icons/AllergenIcons";
import { useSwipeable } from "react-swipeable";
import { CarouselProductImage, CarouselProductImageKey } from "./CarouselProductImage";

const DRAG_THRESHOLD = 40;

const AllergenDisplay = ({
  allergen_texts,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { allergen_texts: string[] }) => (
  <div className={`flex gap-2 items-center ${className || ""}`} {...rest}>
    {allergen_texts.map((allergen) => {
      const allergenKey = allergen?.toLocaleLowerCase() as AllergenIconKey;
      const matched = !!AllergenIcons[allergenKey];
      if (!matched) return null;
      return (
        <div
          key={allergen}
          className="[&_svg]:w-[20px] [&_svg]:h-[20px] w-10 h-10 text-oatmeal rounded-full bg-couscous flex items-center justify-center"
        >
          {React.createElement(AllergenIcons[allergenKey])}
        </div>
      );
    })}
  </div>
);

const Dot = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="4" cy="4" r="4" fill="currentColor" />
  </svg>
);

let previousIndex = 0;
const intervalCycleTime = 3000;
const pauseDurationOnSelect = 3000;
export const CarouselSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [largestContentHeight, setLargestContentHeight] = useState(540);
  const [direction, setDirection] = useState<"left" | "right">("left");

  useEffect(() => {
    let interval: any;
    let timeout: any;
    const cycleIndex = () => {
      setCurrentIndex((prev) => {
        previousIndex = prev;
        const newIndex = prev === landingPageProducts.length - 1 ? 0 : prev + 1;
        return newIndex;
      });
    };

    if (selectedIndex !== undefined) {
      const currentIdx = getCurrentIdx();
      previousIndex = currentIdx;

      if (selectedIndex > currentIdx || (selectedIndex === 0 && currentIdx === landingPageProducts.length - 1)) {
        setDirection("left");
      } else {
        setDirection("right");
      }

      setCurrentIndex(selectedIndex);
      timeout = setTimeout(() => {
        interval = setInterval(cycleIndex, intervalCycleTime);
      }, pauseDurationOnSelect);
    } else {
      interval = setInterval(cycleIndex, intervalCycleTime);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [selectedIndex]);

  const adjustHeight = useCallback(() => {
    const element = document.querySelector(`[data-active-product=true]`);
    const addition = window.innerWidth < 1280 ? 80 : 150;
    setLargestContentHeight((element?.clientHeight || 0) + addition);
  }, []);

  // Use this instead if we don't want to height to auto adjust to current selected item height
  // const adjustHeightToHighestElement = useCallback(() => {
  //   const elements = document.querySelectorAll(`[data-landing-product-content=true]`);
  //   let highest = 540;
  //   elements?.forEach((element) => {
  //     const height = element.clientHeight + (window.innerWidth < 1280 ? 80 : 150);
  //     if (height > highest) {
  //       highest = height;
  //     }
  //   });

  //   console.log("highest", highest);
  //   setLargestContentHeight(highest);
  // }, []);

  useEffect(() => {
    window.addEventListener("resize", adjustHeight);
    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [currentIndex]);

  const getCurrentIdx = useCallback(() => {
    const dragElement = document.querySelector(`[data-carousel-section=true]`) as any;
    const currentIdx = Number(dragElement?.dataset?.currentIdx || 0);
    return currentIdx;
  }, []);

  const onSwipeLeft = useCallback((e: any) => {
    const amount = Math.abs(e?.deltaX);
    if (amount > DRAG_THRESHOLD) {
      const currentIdx = getCurrentIdx();
      const newIdx = currentIdx === landingPageProducts.length - 1 ? 0 : currentIdx + 1;
      setSelectedIndex(newIdx);
    }
  }, []);

  const onSwipeRight = useCallback((e: any) => {
    const amount = Math.abs(e?.deltaX);
    if (amount > DRAG_THRESHOLD) {
      const currentIdx = getCurrentIdx();
      setSelectedIndex(currentIdx === 0 ? landingPageProducts.length - 1 : currentIdx - 1);
    }
  }, []);

  const handlers = useSwipeable({
    onSwiped: (eventData) => console.log("User Swiped!", eventData),
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
  });

  return (
    <div
      style={{ height: `${largestContentHeight}px` }}
      className="relative h-[540px] duration-300 flex justify-center w-full overflow-hidden"
      {...handlers}
      data-carousel-section={true}
      data-current-idx={currentIndex}
    >
      {landingPageProducts.map((product, idx) => {
        const diets = product?.diet_filter?.split(", ");
        const mktg_allergens = product?.mktg_allergens?.split(", ");
        const active = idx === currentIndex;
        const isPrevious = idx === previousIndex;
        return (
          <div
            data-landing-product-content={true}
            data-active-product={active}
            key={product.id}
            className={`${
              !active
                ? isPrevious
                  ? `opacity-0 duration-700 ${direction === "left" ? "-translate-x-full" : "translate-x-full "}`
                  : `opacity-0 ${direction === "left" ? "translate-x-full" : "-translate-x-full"}`
                : "duration-700"
            } flex flex-col xl:flex-row xl:gap-20 pt-6 xl:pt-[60px] items-center justify-center absolute`}
          >
            <img
              src={CarouselProductImage[product.name as CarouselProductImageKey].src}
              className="w-[160px] h-[160px] xl:h-[520px] xl:w-[520px] object-contain mb-4 xl:mb-0"
            />
            <div className="flex flex-col">
              <span className="font-bauhaus text-[20px] xl:text-[40px] leading-[19.46px] xl:leading-[38.92px] font-medium tracking-[0.02em] mb-4 xl:mb-6 px-6 xl:px-0">
                {product.proposed_name}
              </span>
              <div className="w-full px-6 xl:px-0 flex gap-6 mb-8 xl:mb-5 items-start">
                <div className="flex gap-2 flex-wrap flex-1">
                  {diets.map((diet) => (
                    <div
                      key={diet}
                      className="bg-sage text-wild-rice font-worksans font-medium py-2 xl:py-2.5 xl:px-[22.5px] px-4 text-xs xl:text-[20px] xl:leading-[23.46px] tracking-[0.02em] rounded-full flex items-center justify-center"
                    >
                      {diet?.toLocaleLowerCase()}
                    </div>
                  ))}
                </div>
                <AllergenDisplay allergen_texts={mktg_allergens} className="xl:hidden" />
              </div>

              <span className="px-6 xl:px-0 font-worksans text-[12px] xl:max-w-[600px] xl:text-base xl:leading-[28px] leading-[18px] font-normal text-wild-rice mb-6">
                {product.ingredients}
              </span>

              {/* desktop allergens */}
              <div className="hidden xl:flex flex-col mb-10">
                <span className="text-[16px] leading-[15.57px] tracking-[0.02em] text-quinoa font-bauhaus font-medium mb-4">
                  allergens
                </span>
                <AllergenDisplay allergen_texts={mktg_allergens} />
              </div>

              <div className="px-6 xl:px-0 flex items-center justify-center xl:justify-start gap-4">
                <div className="rounded-full h-[64px] w-[64px] xl:h-[120px] xl:w-[120px] flex flex-col items-center justify-center text-quinoa bg-oatmeal">
                  <div className="font-play font-bold text-[20px] leading-[18.51px] xl:text-[40px] xl:leading-[46.28px] flex items-start gap-[1px]">
                    <span>{Number(product.calories || 0)?.toFixed(0)}</span>
                  </div>
                  <span className="font-worksans text-[10px] font-light leading-[11.73px] xl:text-sm xl:leading-[16.42px]">
                    kcals
                  </span>
                </div>
                <div className="rounded-full h-[64px] w-[64px] xl:h-[120px] xl:w-[120px] flex flex-col items-center justify-center text-quinoa bg-oatmeal">
                  <div className="font-play font-bold text-[20px] leading-[18.51px] xl:text-[40px] xl:leading-[46.28px] flex items-start gap-[1px]">
                    <span>{Number(product.carbs || 0)?.toFixed(0)}</span>
                    <span className="text-[12px] leading-[10px] xl:text-[20px] xl:leading-[26.14px]">g</span>
                  </div>
                  <span className="font-worksans text-[10px] font-light leading-[11.73px] xl:text-sm xl:leading-[16.42px]">
                    carbs
                  </span>
                </div>
                <div className="rounded-full h-[64px] w-[64px] xl:h-[120px] xl:w-[120px] flex flex-col items-center justify-center text-quinoa bg-oatmeal">
                  <div className="font-play font-bold text-[20px] leading-[18.51px] xl:text-[40px] xl:leading-[46.28px] flex items-start gap-[1px]">
                    <span>{Number(product.protein || 0)?.toFixed(0)}</span>
                    <span className="text-[12px] leading-[10px] xl:text-[20px] xl:leading-[26.14px]">g</span>
                  </div>
                  <span className="font-worksans text-[10px] font-light leading-[11.73px] xl:text-sm xl:leading-[16.42px]">
                    protein
                  </span>
                </div>
                <div className="rounded-full h-[64px] w-[64px] xl:h-[120px] xl:w-[120px] flex flex-col items-center justify-center text-quinoa bg-oatmeal">
                  <div className="font-play font-bold text-[20px] leading-[18.51px] xl:text-[40px] xl:leading-[46.28px] flex items-start gap-[1px]">
                    <span>{Number(product.total_fat || 0)?.toFixed(0)}</span>
                    <span className="text-[12px] leading-[10px] xl:text-[20px] xl:leading-[26.14px]">g</span>
                  </div>
                  <span className="font-worksans text-[10px] font-light leading-[11.73px] xl:text-sm xl:leading-[16.42px]">
                    fats
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* Dots */}
      <div className="absolute bottom-10 flex gap-4 items-center">
        {landingPageProducts.map((product, idx) => {
          const active = idx === currentIndex;
          return (
            <Dot
              onClick={() => setSelectedIndex(idx)}
              key={idx}
              className={`text-couscous duration-300 xl:w-4 xl:h-4 cursor-pointer ${!active ? "opacity-40" : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
};
