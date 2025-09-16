import { LanguageData } from "../types";
import { locale as importLocale } from '../.'

const locale = {
  code: "zh",
    ones: ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
    teens: ["十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九"],
    tens: ["", "", "二十", "三十", "四十", "五十", "六十", "七十", "八十", "九十"],
    thousands: ["", "千", "百万", "十亿"],
    hundred: "百",
    zero: "零",
    minus: "负",
  } as LanguageData
  
export default locale
importLocale(locale, false)