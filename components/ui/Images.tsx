import AliumsImage from "@/public/alliums.svg";
import DairyImage from "@/public/dairy.svg";
import GlutenImage from "@/public/gluten.svg";
import NutsImage from "@/public/nuts.svg";
import SoyImage from "@/public/soy.svg";

// All ingredients
import Kale from "@/public/ingredients/base_greens_kale_jul2022.png"
import RomaineLettuce from "@/public/ingredients/base_greens_romaine lettuce_jul2022.png"
import BabySpinach from "@/public/ingredients/base_greens-baby spinach_jul2022.png"
import RegularWrap from "@/public/ingredients/base_regular wrap_jul2022.png"
import SpinachWrap from "@/public/ingredients/base_spinach wrap_jul2022.png"
import TomatoWrap from "@/public/ingredients/base_tomato wrap_jul2022.png"
import WholemealWrap from "@/public/ingredients/base_wholemeal wrap_jul2022.png"
import LimeWedge from "@/public/ingredients/garnish_lime wedge_jul2022.png"
import MixedHerbs from "@/public/ingredients/garnish_mixed herbs_jul2022.png"
import Radish from "@/public/ingredients/garnish_radish_jul2022.png"
import Avocado from "@/public/ingredients/premium_avocado_jul2022.png"
import Falafel from "@/public/ingredients/premium_falafel_jul2022.png"
import LemongrassChicken from "@/public/ingredients/premium_grilled lemongrass chicken_jul2022.png"
import PremiumTofu from "@/public/ingredients/premium_grilled tofu_jul2022.png"
import Halloumi from "@/public/ingredients/premium_grilled_halloumi_jul2022.png"
import HardBoiledEggs from "@/public/ingredients/premium_hard boiled egg_jul2022.png"
import JackfruitMeatball from "@/public/ingredients/premium_jackfruit meatball_jul2022.png"
import SearedTuna from "@/public/ingredients/premium_seared tuna_jul2022.png"
import SmokedSalmon from "@/public/ingredients/premium_smoked salmon_jul2022.png"
import SoftBoiledEggs from "@/public/ingredients/premium_soft boiled egg_jul2022.png"
import SousvideChicken from "@/public/ingredients/premium_sous vide chicken_jul2022.png"
import SousvideSalmon from "@/public/ingredients/premium_sous vide salmon_jul2022.png"
import VeggiePatty from "@/public/ingredients/premium_veggie patty_jul2022.png"
import Asparagus from "@/public/ingredients/standard_asparagus_jul2022.png"
import Beetroot from "@/public/ingredients/standard_beetroot_jul2022.png"
import BlackOlives from "@/public/ingredients/standard_black olives_jul2022.png"
import BlackBeans from "@/public/ingredients/standard_Black-beans_jul2022.png"
import Brocolli from "@/public/ingredients/standard_broccoli_jul2022.png"
import Capsicum from "@/public/ingredients/standard_Capsicum_jul2022.png"
import Carrot from "@/public/ingredients/standard_carrots_jul2022.png"
import CherryTomatoes from "@/public/ingredients/standard_cherry tomatoes_jul2022.png"
import Chickpeas from "@/public/ingredients/standard_Chickpeas_jul2022.png"
import Corn from "@/public/ingredients/standard_corn_jul2022.png"
import Crouton from "@/public/ingredients/standard_crouton_jul2022.png"
import Cucumber from "@/public/ingredients/standard_cucumber_jul2022.png"
import Edamame from "@/public/ingredients/standard_edamame_jul2022.png"
import FrenchBeans from "@/public/ingredients/standard_french beans_jul2022.png"
import Grapes from "@/public/ingredients/standard_grapes_jul2022.png"
import GreenApple from "@/public/ingredients/standard_green apple_jul2022.png"
import MandarinOranges from "@/public/ingredients/standard_mandarin oranges_jul2022.png"
import Potato from "@/public/ingredients/standard_potato_jul2022.png"
import Raisins from "@/public/ingredients/standard_raisins_jul2022.png"
import RedOnions from "@/public/ingredients/standard_red onions.jul2022.png"
import RoastedPumpkin from "@/public/ingredients/standard_roasted pumpkin_jul2022.png"
import StandardTofu from "@/public/ingredients/standard_tofu_jul2022.png"

export const Images = {
  Allium: AliumsImage,
  Milk: DairyImage,
  Gluten: GlutenImage,
  ["Tree nuts"]: NutsImage,
  Soybeans: SoyImage,
} as const;

export type ImageKey = keyof typeof Images

export const IngredientImages = {
  Kale,
  RomaineLettuce,
  BabySpinach,
  RegularWrap,
  SpinachWrap,
  TomatoWrap,
  WholemealWrap,
  LimeWedge,
  Radish,
  MixedHerbs,
  Avocado,
  Falafel,
  LemongrassChicken,
  PremiumTofu,
  Halloumi,
  HardBoiledEggs,
  JackfruitMeatball,
  SearedTuna,
  SmokedSalmon,
  SoftBoiledEggs,
  SousvideChicken,
  SousvideSalmon,
  VeggiePatty,
  Asparagus,
  Beetroot,
  BlackBeans,
  BlackOlives,
  Brocolli,
  Capsicum,
  Carrot,
  CherryTomatoes,
  Chickpeas,
  Corn,
  Crouton,
  Cucumber,
  Edamame,
  FrenchBeans,
  Grapes,
  GreenApple,
  MandarinOranges,
  Potato,
  Raisins,
  RedOnions,
  RoastedPumpkin,
  StandardTofu
} as const

export type IngredientImageKey = keyof typeof IngredientImages