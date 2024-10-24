"use client";
import { Bowl } from "./Bowl";
import { useWindowSize } from "@/hooks/useWindowSize";

export const MenuItemContent = ({ visible }: { visible: boolean }) => {
  const { windowHeight } = useWindowSize();

  return (
    <div
      className={`duration-500 relative flex flex-col items-center [&>*]:shrink-0`}
      style={{
        ...(!visible
          ? {
              opacity: 0,
              height: 0,
            }
          : {
              height: `${windowHeight - 60 - 32 + 16}px`,
            }),
      }}
    >
      <div className="relative flex flex-col min-h-0 flex-1 w-full overflow-auto">{visible && <Bowl />}</div>
    </div>
  );
};
