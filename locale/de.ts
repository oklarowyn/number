import { LanguageData } from "../types";
import { locale as importLocale } from '../.'

const locale = {
    code: "de",
    ones: ["", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"],
    teens: ["zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","neunzehn"],
    tens: ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"],
    thousands: ["", "tausend", "Million", "Milliarde"],
    thousandsPlural: ["", "tausend", "Millionen", "Milliarden"],
    hundred: "hundert",
    zero: "null",
    minus: "minus",
    omitOneForThousand: false,
    pluralizeThousands: true,
    thousandStep: 1000
  } as LanguageData

export default locale
importLocale(locale, false)