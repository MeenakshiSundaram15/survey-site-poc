import { MacroFilter } from "./MacroFilter";
import { useWindowSize } from "@/hooks/useWindowSize";

export const FilterContent = ({ visible }: { visible: boolean }) => {
  const { windowHeight } = useWindowSize();

  return (
    <div
      className={`duration-500 ${!visible ? "opacity-0 h-0" : ``} relative flex flex-col items-center [&>*]:shrink-0`}
      style={{
        ...(visible && windowHeight
          ? {
              height: `${windowHeight - 60 - 32 + 16}px`,
            }
          : {}),
      }}
    >
      <div className="relative flex flex-col min-h-0 flex-1 w-full -mt-2 m">
        <span className="font-bauhaus text-[15.42px] tracking-[0.02em] text-sorghum mx-[22px] mb-[4px] mt-1">
          Macros
        </span>
        {visible && <MacroFilter />}
      </div>
    </div>
  );
};
