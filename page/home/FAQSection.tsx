"use client";

import { HTMLAttributes, SVGAttributes, useCallback, useEffect, useMemo, useState } from "react";

type TQuestionAnswer = {
  question: string;
  answer: string | string[];
};

const PlusIcon = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M11.625 1.375V8.875H19.125C19.7344 8.875 20.25 9.39062 20.25 10C20.25 10.6562 19.7344 11.125 19.125 11.125H11.625V18.625C11.625 19.2812 11.1094 19.75 10.5 19.75C9.84375 19.75 9.375 19.2812 9.375 18.625V11.125H1.875C1.21875 11.125 0.75 10.6562 0.75 10C0.75 9.39062 1.21875 8.875 1.875 8.875H9.375V1.375C9.375 0.765625 9.84375 0.25 10.5 0.25C11.1094 0.25 11.625 0.765625 11.625 1.375Z"
      fill="currentColor"
    />
  </svg>
);

export const MinusIcon = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg width="21" height="4" viewBox="0 0 21 4" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M20.25 2C20.25 2.65625 19.7344 3.125 19.125 3.125H1.875C1.21875 3.125 0.75 2.65625 0.75 2C0.75 1.39062 1.21875 0.875 1.875 0.875H19.125C19.7344 0.875 20.25 1.39062 20.25 2Z"
      fill="currentColor"
    />
  </svg>
);

export const QuestionAnswers: TQuestionAnswer[] = [
  {
    question: "How does this website work?",
    answer: `Simply take our quick nutrition quiz, and we\'ll calculate your macros and calorie needs. Then, you can choose meals that fit your dietary preferences and requirements.`,
  },
  {
    question: "Do I need to create an account?",
    answer: `Yes, creating an account helps you save your preferences, track your orders, and adjust your meals easily`,
  },
  {
    question: `Is the nutrition quiz free?`,
    answer: `Absolutely, our quiz is free and will give you personalized macro and calorie recommendations.`,
  },
  {
    question: `Can you tell me more about how your meal service offers flexibility?`,
    answer: `Absolutely! Our meal service operates without the constraints of a subscription, offering you the ultimate flexibility. You have the freedom to order any meal you like from our daily menu whenever you want, with no minimum order requirements. Place your order on your own schedule, and pick it up the same day - it\'s that simple. `,
  },
  {
    question: `How do you ensure the freshness of the meals?`,
    answer: `Freshness is our top priority. Every meal is prepared on the day it's ordered to guarantee that you're receiving the highest quality food possible. We source local, seasonal ingredients to craft meals that are not only fresh but also full of flavor. With our same-day preparation and pickup, you'll enjoy meals that are as fresh as they are delicious.`,
  },
  {
    question: `What information do I need to provide in the quiz?`,
    answer: `The quiz will ask about your age, weight, height, activity level, and fitness goals to calculate your nutritional needs accurately.`,
  },
  {
    question: `How long does the quiz take?`,
    answer: `The quiz typically takes about 1-2 minutes to complete.`,
  },
  {
    question: `Can I retake the quiz?`,
    answer: `Yes, you can retake the quiz anytime to update your preferences and nutritional needs.`,
  },
  {
    question: `Can I choose my meals?`,
    answer: `Yes, after receiving your macros, you can select meals that fit your taste and dietary needs.`,
  },
  {
    question: `What if I have food allergies`,
    answer: `You can filter meals by dietary requirements to exclude any allergens.`,
  },
  {
    question: `Are there vegetarian/vegan options?`,
    answer: `Yes, we offer a variety of vegetarian and vegan meals that you can choose from.`,
  },
  {
    question: `What kind of specialized meal options do you offer for various dietary preferences?`,
    answer: [
      `We have a wide array of meals to cater to different dietary requirements. Whether you're looking for low-calorie options for weight management, low-carb choices for those monitoring their carbohydrate intake, or high-protein meals for muscle support and recovery, we've got you covered. For those focused on heart health, our meals are crafted to support a balanced heart-healthy diet. We also offer keto-friendly and paleo options for individuals following these specific dietary patterns. 
`,
      `Additionally, for those who prefer anti-inflammatory foods to help manage certain health conditions, we provide meals rich in nutrients known to support this need. Our vegan and vegetarian selections are perfect for plant-based diets, while our gluten-free, allium-free, nut-free, and dairy-free options cater to those with specific food sensitivities or allergies. For individuals who avoid meat or seafood, we provide meat-free and seafood-free meals that are both nutritious and delicious.`,
    ],
  },
  {
    question: `How do I place an order?`,
    answer: `After choosing your meals, go to your cart and follow the checkout process to place your order.`,
  },
  {
    question: `Can I change my order after placing it?`,
    answer: `You can make changes to your order within one hour of placing it.`,
  },
  {
    question: `What payment methods do you accept?`,
    answer: `We accept all major credit cards and online payment services.`,
  },
  {
    question: `What if I have a problem with my order?`,
    answer: `Please contact our customer support immediately, and we will resolve the issue as quickly as possible.`,
  },
  {
    question: `How can I give feedback about a meal?`,
    answer: `We value your feedback! You can leave a review on the meal page or contact us directly through the chat.`,
  },
  {
    question: `What if I need to change or cancel my order?`,
    answer: `We pride ourselves on our flexibility and freshness. If you need to change or cancel your order, simply contact us at least [specific time frame] before your scheduled pickup time, and we'll take care of it for you. No subscriptions, no fuss - just fresh, personalized meals ready when you are.`,
  },
];

const CollapseableQuestionAnswerRow = ({
  active,
  question,
  answer,
  idx,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { active: boolean; question: string; answer: string | string[]; idx: number }) => {
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!active) return setContentHeight(0);
    const contentElement = document.querySelector(`[data-answer-idx="${idx}"]`);
    setContentHeight(contentElement?.clientHeight || 0);
  }, [active]);

  return (
    <div className={`flex flex-col min-h-0 mt-4 ${!active ? "cursor-pointer" : ""}`} {...rest}>
      <div className="flex-shrink-0 text-left flex items-center">
        <span className="flex-1 font-bauhaus text-base leading-[15.57px] xl:text-[24px] xl:leading-[28px]">
          {question}
        </span>
        <div className="relative flex items-center justify-center shrink-0 ml-2 xl:ml-4">
          <PlusIcon className={`duration-300 ${active ? "opacity-0" : ""} w-[14px] h-auto xl:w-[21px]`} />
          <MinusIcon className={`absolute duration-300 ${!active ? "opacity-0" : ""} w-[14px] h-auto xl:w-[21px]`} />
        </div>
      </div>
      <div
        style={{ height: `${contentHeight}px` }}
        className={`overflow-hidden h-0 duration-500 ease-in-out ${active ? "mt-2 xl:mb-4 mb-2" : "opacity-0"}`}
      >
        <div
          data-answer-idx={idx}
          className="text-left font-worksans text-[12px] xl:text-base leading-[18px] xl:leading-[24px] text-white xl:font-light flex flex-col gap-1"
        >
          {Array.isArray(answer) && answer.map((text, idx) => <span key={idx}>{text}</span>)}
          {!Array.isArray(answer) && answer}
        </div>
      </div>
      <div className="h-[1px] flex-shrink-0 bg-oatmeal w-full mt-4" />
    </div>
  );
};

export const FAQSection = () => {
  const [collasedIndex, setCollapsedIndex] = useState<number | undefined>(0);

  const toggleCollapse = useCallback((idx: number) => {
    setCollapsedIndex(prev => prev === idx ? undefined : idx)
  }, []);
  return (
    <div className="flex flex-col items-center pt-6 pb-10 bg-[#5B4740] px-6 text-oatmeal text-center">
      <span className="font-bauhaus text-[20px] xl:text-[40px] leading-[19.46px] xl:leading-[38.92px] tracking-[0.02em] mb-6">
        questions?
      </span>
      <div className="flex flex-col xl:max-w-[640px]">
        {QuestionAnswers.map(({ answer, question }, idx) => {
          const active = collasedIndex === idx;
          return (
            <CollapseableQuestionAnswerRow
              key={question}
              answer={answer}
              question={question}
              active={active}
              onClick={() => toggleCollapse(idx)}
              idx={idx}
            />
          );
        })}
      </div>
    </div>
  );
};
