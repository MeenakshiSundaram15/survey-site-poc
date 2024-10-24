"use client";
import SaladBowlIcon from "@/assets/salad-bowl.png";
import { CollapsibleRow } from "./CollapsibleRow";
import { MenuItemContent } from "./menuItem/MenuItemContent";
import { SurveyContent } from "./survey/SurveyContent";
import { ScanMenuItemContent } from "./menuItem/ScanMenuItemContent";

type TStepThreeState = "initial" | "scan" | "hidden";

export const StepThreeSheet = ({ state }: { state: TStepThreeState }) => {
  return (
    <div
      data-active-sheet={state !== "hidden" ? true : false}
      style={{
        ...(state === "hidden"
          ? {
              bottom: '-120%',
            }
          : {}),
      }}
      className={`duration-700 bg-oatmeal absolute bottom-0 -left-[1px] -right-[1px] z-10 shadow-xl shadow-black/75 rounded-tl-[34px] rounded-tr-[34px] py-3`}
    >
      <div
        className={`${
          state === "hidden" ? "opacity-0" : ""
        } duration-300 translate-y-1/2 flex items-center gap-1.5 absolute bottom-full right-[38px] bg-quinoa rounded-full px-[9.16px] h-[27.18px] text-white font-bauhaus pointer-events-none`}
      >
        <img src={SaladBowlIcon.src} className="w-4 h-auto" />
        <span className="text-[13.49px] tracking-[0.02em]">step 3</span>
      </div>

      {/* Product Content */}
      <CollapsibleRow hidden={state !== "initial"}>
        <MenuItemContent visible={state === "initial"} />
      </CollapsibleRow>

      {/* Scan Menu Item Content */}
      <CollapsibleRow hidden={state !== "scan"}>
        <ScanMenuItemContent visible={state === "scan"} />
      </CollapsibleRow>
    </div>
  );
};
