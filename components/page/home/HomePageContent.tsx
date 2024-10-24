"use client";
import { steps } from "@/constants/steps";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

export const HomePageContent = () => {
  const { push } = useRouter();

  const goToSurvey = useCallback(() => {
    push("/survey");
  }, []);

  const goToMenu = useCallback(() => {
    push("/menu");
  }, []);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowButtons(true);
    }, 2500);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            // "Health goals",
            // 300, // wait 1s before replacing "Mice" with "Hamsters"
            "Health goals made simple,",
            800,
            "Health goals made simple, no diets needed.",
          ]}
          wrapper="h1"
          speed={80}
          className="text-center text-wild-rice text-2xl font-bauhaus max-w-[300px]"
        />
        {/* <h1 className="text-center text-wild-rice text-2xl font-bauhaus">
            Health goals made simple,
            <br />
            no diets needed.
          </h1> */}
        <div
          className={`grid overflow-hidden ${
            !showButtons ? "opacity-0 grid-rows-[0fr]" : "opacity-1 grid-rows-[1fr] mt-10"
          } duration-1000`}
        >
          <div
            className={`flex flex-col gap-2 w-fit mx-auto overflow-hidden px-4 py-2.5 rounded-lg font-bauhaus text-quinoa bg-core-soy`}
          >
            {steps.map((data, idx) => (
              <div key={idx} className="flex items-center relative">
                <div className="font-semibold text-lg mr-4 z-10">Step {idx + 1}</div>
                <div className="z-10">{data}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`grid overflow-hidden ${
            !showButtons ? "opacity-0 grid-rows-[0fr]" : "opacity-1 grid-rows-[1fr] mt-10"
          }`}
        >
          <div className={`flex flex-col gap-4 p-4 mt-10 overflow-hidden`}>
            <button
              onClick={goToSurvey}
              className={`delay-[800ms] ${
                showButtons ? "opacity-1" : "opacity-0 scale-0"
              } duration-700 text-cornsilk bg-quinoa px-3 py-2 font-medium tracking-[0.03em] font-bauhaus font- rounded-full`}
            >
              Online Survey
            </button>
            <button
              onClick={goToMenu}
              className={`delay-[1000ms] ${
                showButtons ? "opacity-1" : "opacity-0 scale-0"
              } text-cornsilk duration-700 bg-quinoa px-3 py-2 font-medium tracking-[0.03em] font-bauhaus font- rounded-full`}
            >
              Go to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
