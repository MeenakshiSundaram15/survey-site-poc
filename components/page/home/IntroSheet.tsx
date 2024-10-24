"use client";
import { Info } from "@mui/icons-material";
import { Popover, Typography } from "@mui/material";
import { Fragment, HTMLAttributes, useState } from "react";

export const IntroSheetHeight = 560;

type TStep = {
  number: number;
  title?: string;
  description?: string | string[];
  maxContentWidth?: string;
  info?: string;
};

const Step = ({
  number,
  title,
  description,
  maxContentWidth,
  info,
  ...rest
}: HTMLAttributes<HTMLDivElement> & TStep) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="h-[64px] w-auto mx-[34px] bg-option rounded-full flex items-center relative" {...rest}>
      <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white ml-[11px] font-play text-[#9B8177] font-bold text-[48.77px] shrink-0">
        <span>{number}</span>
      </div>
      <div
        style={{ ...(maxContentWidth ? { maxWidth: maxContentWidth } : {}) }}
        className={`flex flex-col gap-1 text-sorghum font-worksans text-[11px] leading-none tracking-[0.02em] ml-3.5`}
      >
        {title && <span className="font-semibold relative flex items-center w-fit">{title}</span>}
        {description &&
          (Array.isArray(description) ? (
            <div className="flex flex-col gap-0.5 pl-0.5 text-[9.5px] leading">
              {description &&
                description.map((desc, idx) => (
                  <div className="flex items-start gap-1" key={idx}>
                    <div className="w-1 h-1 rounded-full bg-sorghum mt-0.5" />
                    <span>{desc}</span>
                  </div>
                ))}
            </div>
          ) : (
            <span className="text-[9.5px] leading-[1.2]">{description}</span>
          ))}
      </div>
      {info && (
        <Fragment>
          <button
            className="absolute right-4 text-quinoa w-[40px] h-[40px] rounded-full text-[32px] flex items-center justify-center"
            onClick={handleClick}
          >
            <Info fontSize={"inherit"} />
          </button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>{info}</Typography>
          </Popover>
        </Fragment>
      )}
    </div>
  );
};

export const IntroSheet = ({ state }: { state: "visible" | "background" | "hidden" }) => {
  return (
    <div
      style={{
        ...(state === "visible"
          ? {
              height: `${IntroSheetHeight}px`,
            }
          : {}),
      }}
      className={`duration-700 ${
        state === "visible"
          ? "rounded-tl-[34px] rounded-tr-[34px] bg-white pointer-events-auto"
          : state === "background"
          ? "bg-feta-light pointer-events-none"
          : "opacity-0 pointer-events-none"
      } h-full rounded-none absolute bottom-0 -left-[1px] -right-[1px] z-10 shadow-xl shadow-black/75 pt-5`}
    >
      <div className={`duration-500 ${state === "visible" ? "" : "opacity-0"}`}>
        <div className="text-center mx-auto max-w-[260px] text-base leading-none font-bauhaus tracking-[0.02em] text-sorghum">
          {"500+ bowls to fit your dietary needs in 3 simple steps"}
        </div>

        {/* Steps */}
        <div className="mt-3 flex flex-col gap-3.5">
          <Step
            number={1}
            title={"Discover your nutrition profile:"}
            description={["Taking our quiz", "Entering your own dietary requirements"]}
            maxContentWidth="206px"
          />
          <Step
            number={2}
            title={"Select from bowls created just for you"}
            // description={"created just for you"}
            maxContentWidth="180px"
          />
          <Step
            info="Head to the start of the salad bar and scan the QR code at the scanner"
            number={3}
            title="Pick up your bowl"
            description={"from any Saladstop outlet"}
          />
        </div>
      </div>
    </div>
  );
};
