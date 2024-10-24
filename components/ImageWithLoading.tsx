import { ImgHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { Spinner } from "./Icons/Spinner";

export const ImageWithLoading = ({
  withToHeightRatio,
  className,
  src,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { withToHeightRatio: number }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const imageLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="w-full relative aspect-[1/1.325]" ref={ref} {...rest}>
      <div
        className={`absolute left-0 top-0 right-0 bottom-0 z-10 flex items-center justify-center rounded-xl pointer-events-none ${
          loaded ? "opacity-0" : ""
        }`}
      >
        <Spinner />
      </div>
      <img
        className={`${className || ""} z-0 duration-200`}
        src={src}
        onLoad={imageLoaded}
      />
    </div>
  );
};
