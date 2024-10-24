"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const HowItWorks = () => {
  const { push } = useRouter();

  const goToSurvey = useCallback(() => {
    push("/survey");
  }, []);
  return (
    <div className="w-full bg-couscous pt-[23px] pb-[40px] xl:pb-0 xl:h-[600px] xl:pt-[80px] flex flex-col items-center">
      <span className="font-bauhaus text-sorghum text-[20px] leading-[19.46px] xl:text-[40px] xl:leading-[38.92px] tracking-[0.02em] text-center">
        how it works
      </span>

      <div className="grid xl:grid-cols-2 gap-x-[120px] gap-y-[33px] xl:gap-y-[69px] mt-[30px] pl-[48px] xl:pl-0 xl:pr-0 pr-[24px]">
        {/* Point 1 */}
        <div className="flex gap-2 xl:gap-4">
          <span className="font-play font-bold text-[48px] leading-[55.54px] xl:text-[120px] xl:leading-[138.84px] text-[#9B8177] shrink-0">
            1
          </span>
          <div className="pt-[5px] xl:pt-[29px]">
            <button
              onClick={goToSurvey}
              className="rounded-full py-[16px] px-[24px] xl:py-[18px] xl:px-[32px] font-bauhaus text-[14px] xl:text-[20px] text-quinoa tracking-[0.02em] leading-[13.62px] xl:leading-[24px] text-center bg-oatmeal h-fit"
            >
              discover my <br className="hidden xl:block" />
              nutrition profile
            </button>
          </div>
        </div>
        {/* Point 2 */}
        <div className="flex gap-2 xl:gap-4">
          <span className="font-play font-bold text-[48px] leading-[55.54px] xl:text-[120px] xl:leading-[138.84px] text-[#9B8177] shrink-0">
            2
          </span>
          <div className="pt-[9px] xl:pt-[29px] flex flex-col gap-2 xl:gap-4">
            <span className="font-bauhaus font-medium text-[14px] xl:text-[20px] leading-[13.62px] xl:leading-[19.46px] text-sorghum">
              personalize your plate
            </span>
            <span className="text-wild-rice text-xs xl:text-base leading-[18px] xl:leading-[24px] font-worksans xl:w-[275px]">
              Select from meals recommended just for you and apply dietary filters to perfectly align with your
              preferences
            </span>
          </div>
        </div>
        {/* Point 3 */}
        <div className="flex gap-2 xl:gap-4">
          <span className="font-play font-bold text-[48px] leading-[55.54px] xl:text-[120px] xl:leading-[138.84px] text-[#9B8177] shrink-0">
            3
          </span>
          <div className="pt-[9px] xl:pt-[29px] flex flex-col gap-2 xl:gap-4">
            <span className="font-bauhaus font-medium text-[14px] xl:text-[20px] leading-[13.62px] xl:leading-[19.46px] text-sorghum">
              pickup
            </span>
            <span className="text-wild-rice text-xs xl:text-base leading-[18px] xl:leading-[24px] font-worksans xl:w-[240px]">
              Pick up your freshly prepared meals the same day from a SaladStop! or Station near you
            </span>
          </div>
        </div>
        {/* Point 4 */}
        <div className="flex gap-2 xl:gap-4">
          <span className="font-play font-bold text-[48px] leading-[55.54px] xl:text-[120px] xl:leading-[138.84px] text-[#9B8177] shrink-0">
            4
          </span>
          <div className="pt-[9px] xl:pt-[29px] flex flex-col gap-2 xl:gap-4">
            <span className="font-bauhaus font-medium text-[14px] xl:text-[20px] leading-[13.62px] xl:leading-[19.46px] text-sorghum">
              embrace your wellness journey
            </span>
            <span className="text-wild-rice text-xs xl:text-base leading-[18px] xl:leading-[24px] font-worksans xl:w-[275px]">
              Easily track your progress and join our motivational community for support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
