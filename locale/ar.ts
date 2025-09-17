import { LanguageData } from "../types";
import { locale as importLocale } from '../.'

const locale = {
  code: "ar",
  ones: ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة"],
  teens: ["عشرة","أحد عشر","اثنا عشر","ثلاثة عشر","أربعة عشر","خمسة عشر","ستة عشر","سبعة عشر","ثمانية عشر","تسعة عشر"],
  tens: ["", "", "عشرون","ثلاثون","أربعون","خمسون","ستون","سبعون","ثمانون","تسعون"],
  thousands: ["", "ألف", "مليون", "مليار"],
  thousandsPlural: ["", "آلاف", "ملايين", "مليارات"],
  hundred: "مئة",
  hundreds: ["", "مئة", "مئتان", "ثلاثمئة", "أربعمئة", "خمسمئة", "ستمئة", "سبعمئة", "ثمانمئة", "تسعمئة"],
  zero: "صفر",
  minus: "سالب",
  omitOneForThousand: true, // pas de واحد devant ألف
  pluralizeThousands: true,
  thousandStep: 1000,
  tensConnector: " و",  
  genderedOne: { masculine: "واحد", feminine: "واحدة" }
} as LanguageData

export default locale
importLocale(locale, false)