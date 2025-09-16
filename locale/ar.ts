import { LanguageData } from "../types";
import { locale as importLocale } from '../.'

const locale = {
    code: "ar",
    ones: ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة"],
    teens: ["عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"],
    tens: ["", "", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"],
    thousands: ["", "ألف", "مليون", "مليار"],
    hundred: "مائة",
    zero: "صفر",
    minus: "ناقص"
} as LanguageData

export default locale
importLocale(locale, false)