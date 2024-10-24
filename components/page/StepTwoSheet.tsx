"use client";
import SaladBowlIcon from "@/assets/salad-bowl.png";
import { CollapsibleRow } from "./CollapsibleRow";
import { MenuContent } from "./menu/MenuContent";

type TStepTwoState = "initial" | "hidden";

export const StepTwoSheet = ({ state }: { state: TStepTwoState }) => {
  return (
    <div
      style={{
        ...(state !== "initial"
          ? {
              bottom: "-120%",
            }
          : {}),
      }}
      className={`duration-700 bg-oatmeal absolute bottom-0 -left-[1px] -right-[1px] z-10 shadow-xl shadow-black/75 rounded-tl-[34px] rounded-tr-[34px] py-3`}
    >
      <div
        className={`${
          state !== "initial" ? "translate-x-full" : ""
        } duration-300 translate-y-1/2 flex items-center gap-1.5 absolute bottom-full right-[38px] bg-quinoa rounded-full px-[9.16px] h-[27.18px] text-white font-bauhaus pointer-events-none`}
      >
        <img src={SaladBowlIcon.src} className="w-4 h-auto" />
        <span className="text-[13.49px] tracking-[0.02em]">step 2</span>
      </div>

      {/* Menu Content */}
      <CollapsibleRow hidden={state !== "initial"}>
        <MenuContent visible={state === "initial"} />
      </CollapsibleRow>
    </div>
  );
};
