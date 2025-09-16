import { LanguageData } from "../types";
import { locale as importLocale } from '../.'

const locale = {
    code: "fr",
    ones: ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"],
    teens: ["dix","onze","douze","treize","quatorze","quinze","seize","dix-sept","dix-huit","dix-neuf"],
    tens: ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"],
    thousands: ["", "mille", "million", "milliard"],
    thousandsPlural: ["", "mille", "millions", "milliards"],
    hundred: "cent",
    zero: "zéro",
    minus: "moins",
    omitOneForThousand: true,
    pluralizeThousands: true,
    thousandStep: 1000,
    genderedOne: { masculine: "un", feminine: "une" }
  } as LanguageData

export default locale
importLocale(locale, false)