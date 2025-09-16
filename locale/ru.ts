import { LanguageData } from "../types";
import { locale as importLocale } from '../.'

const locale = {
  code: "ru",
  ones: ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"],
  teens: ["десять","одиннадцать","двенадцать","тринадцать","четырнадцать","пятнадцать","шестнадцать","семнадцать","восемнадцать","девятнадцать"],
  tens: ["", "", "двадцать","тридцать","сорок","пятьдесят","шестьдесят","семьдесят","восемьдесят","девяносто"],
  thousands: ["", "тысяча", "миллион", "миллиард"],
  thousandsPlural: ["", "тысяч", "миллионов", "миллиардов"],
  hundred: "сто",
  zero: "ноль",
  minus: "минус",
  omitOneForThousand: true, // souvent on dit juste "тысяча"
  pluralizeThousands: true,
  thousandStep: 1000,
  genderedOne: { masculine: "один", feminine: "одна" } // pour "одна тысяча"
} as LanguageData
  
export default locale
importLocale(locale, false)