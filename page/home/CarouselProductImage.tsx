import VeganProductImage from "@/assets/home/bowls/500-16 TF Vegan.png";
import HeartProductImage from "@/assets/home/bowls/500-19 ST Heart.png";
import KetoProductImage from "@/assets/home/bowls/500-20 SM KT.png";
import PaleoProductImage from "@/assets/home/bowls/500-22 LC Paleo.png";
import LowCalorieProductImage from "@/assets/home/bowls/500-23 SS LC.png";
import AntiInflammatoryProductImage from "@/assets/home/bowls/500-27 SC AI.png";
import LowCarbProductImage from "@/assets/home/bowls/500-32 TC LC.png";
import VegetarianProductImage from "@/assets/home/bowls/500-32 WF Vegetarian LC.png";
import HighProteinProductImage from "@/assets/home/bowls/500-38 RC HP.png";

export const CarouselProductImage = {
  "500-16 TF Vegan": VeganProductImage,
  "500-19 ST Heart": HeartProductImage,
  "500-20 SM KT": KetoProductImage,
  "500-22 LC Paleo": PaleoProductImage,
  "500-23 SS LC": LowCalorieProductImage,
  "500-27 SC AI": AntiInflammatoryProductImage,
  "500-32 TC LC": LowCarbProductImage,
  "500-32 WF Vegetarian LC": VegetarianProductImage,
  "500-38 RC HP": HighProteinProductImage,
} as const;

export type CarouselProductImageKey = keyof typeof CarouselProductImage;
