"use client";
import { usePathname } from "next/navigation";
import { Logo } from "./Icons/Logo";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { PageType } from "./page/PageType";
import useSignatures from "@/hooks/useSignatures";
import { IntroSheetHeight } from "./page/home/IntroSheet";
import { useWindowSize } from "@/hooks/useWindowSize";

const estimatedHeight = 474;

const BowlBackground = () => {
  const [freeHeight, setFreeHeight] = useState(0);
  const { selectedBowlInfo } = useSignatures();

  const adjustHeight = useCallback(() => {
    const activeSheetContainer = document.querySelector("div[data-active-sheet=true]");
    const remainingSpace = window.innerHeight - estimatedHeight;
    setFreeHeight(remainingSpace);
  }, []);

  useEffect(() => {
    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  }, []);

  return (
    <div
      style={{ height: !freeHeight ? "100%" : `${(freeHeight || 0) + 32}px` }}
      className={`absolute top-0 left-0 right-0 bg-cornsilk duration-700 h-full ${!freeHeight ? "opacity-0" : ""}`}
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <img
          alt="hero"
          className="w-[90%] mx-auto h-auto object-contain z-0"
          src={`${process.env.NEXT_PUBLIC_META_HEALTH_IMAGE_HOST}${selectedBowlInfo?.staticUrl || ""}`}
        />
        <div className="text-white absolute mx-auto flex flex-col items-center justify-center z-10">
          <span className="font-bauhaus tracking-[0.02em] text-[23.12px]">{selectedBowlInfo?.proposed_name}</span>
          <span className="font-bauhaus tracking-[0.02em] text-[20px]">{selectedBowlInfo?.sku}</span>
        </div>
      </div>
      <div className="absolute left-0 bottom-0 right-0 top-0 bg-[#2D2318] bg-opacity-90 backdrop-blur-[0.5px]" />
    </div>
  );
};

export const Header = () => {
  const { windowHeight } = useWindowSize();
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const { push, back } = useRouter();

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
    if (pathname.includes("/menu/")) {
      return "product";
    }
    if (pathname.includes("scan-qr")) {
      return "scan";
    }
    return "home";
  }, [isLandingPage]);

  const onClose = useCallback(() => {
    if (pathname?.includes("/survey")) {
      push("/");
    } else {
      back();
    }
  }, [pathname]);

  const initialHeight = windowHeight ? windowHeight - IntroSheetHeight : 0;

  const showQR = useMemo(() => pathname?.includes("/scan"), [pathname]);

  return (
    <Fragment>
      <nav
        style={{
          height: "36px",
        }}
        className={`text-quinoa sticky top-0 left-0 right-0 h-nav flex items-center justify-center duration-300 z-40 delay-75`}
      >
        <div
          className={`${
            pageType === "home" ? "gap-[10px] opacity-0" : ""
          } flex duration-700 absolute flex-col items-center justify-center w-full`}
        >
          <Logo
            className={`duration-500 ${
              // pageType === "home" ? `text-cornsilk w-[129px]` : `w-[64px] h-auto ${showQR ? "text-white" : ""}`
              pageType === "home" ? `hidden` : `w-[84px] mt-2 h-auto`
            }`}
            onClick={() => {
              push("/");
            }}
          />
          {/* <CollapsibleRow className={pageType === "home" ? "duration-0" : "duration-700"} hidden={pageType !== "home"}>
            <div
              className={`duration-700 overflow-hidden text-cornsilk font-bauhaus text-base origin-center leading-none text-center font-medium ${
                pageType === "home" ? "" : "opacity-0 scale-0"
              }`}
            >
              Health goals made simple,
              <br />
              no diets needed
            </div>
          </CollapsibleRow> */}
        </div>

        {/* Back button */}
        <button
          className={`${
            pageType === "home" ? "opacity-0 -translate-x-full" : "delay-500"
          } absolute text-quinoa text-[40px] pl-1 pt-3 ml-1 left-0 flex items-center justify-center duration-300`}
          type="button"
          onClick={onClose}
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ChevronLeftIcon"
            fill="currentColor"
            width={"1em"}
            height={"1em"}
          >
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
          </svg>
        </button>

        {/* Close button */}
        {/* <button
          className={`${
            pageType === "home" ? "opacity-0" : ""
          } absolute right-0 flex items-center justify-center w-[40px] h-[40px] duration-300 ${
            showQR ? "text-white" : "text-couscous"
          }`}
          type="button"
          onClick={onClose}
        >
          <svg
            className="absolute"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1481 1.7837L7.63179 6.29998L12.1104 10.7786C12.4868 11.1174 12.4868 11.6819 12.1104 12.0206C11.7717 12.397 11.2072 12.397 10.8685 12.0206L6.35218 7.54196L1.87353 12.0206C1.53481 12.397 0.970272 12.397 0.631551 12.0206C0.255194 11.6819 0.255194 11.1174 0.631551 10.741L5.1102 6.26235L0.631551 1.7837C0.255194 1.44497 0.255194 0.880439 0.631551 0.504082C0.970272 0.165361 1.53481 0.165361 1.91116 0.504082L6.38981 5.02037L10.8685 0.541718C11.2072 0.165361 11.7717 0.165361 12.1481 0.541718C12.4868 0.880439 12.4868 1.44497 12.1481 1.7837Z"
              fill="currentColor"
            />
          </svg>
        </button> */}
      </nav>
      {/* {showQR && <BowlBackground />} */}
    </Fragment>
  );
};
