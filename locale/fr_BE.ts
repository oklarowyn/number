import { LanguageData } from "../types";
import { locale as importLocale } from '../.'

const locale = {
    ones: ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"],
    teens: ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf",],
    tens: ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "septante", "huitante", "nonante"],
    thousands: ["", "mille", "million", "milliard"],
    hundred: "cent",
    zero: "zéro",
    minus: "moins",
  } as LanguageData

export default locale
importLocale(locale, false)