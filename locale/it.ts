import { LanguageData } from "../types";
import { locale as importLocale } from '../.'

const locale = {
    code: "it",
    ones: ["", "uno", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove"],
    teens: ["dieci","undici","dodici","tredici","quattordici","quindici","sedici","diciassette","diciotto","diciannove"],
    tens: ["", "", "venti", "trenta", "quaranta", "cinquanta", "sessanta", "settanta", "ottanta", "novanta"],
    thousands: ["", "mille", "milione", "miliardo"],
    thousandsPlural: ["", "mila", "milioni", "miliardi"],
    hundred: "cento",
    zero: "zero",
    minus: "meno",
    omitOneForThousand: true,
    pluralizeThousands: true,
    thousandStep: 1000,
    genderedOne: { masculine: "uno", feminine: "una" }
  } as LanguageData
  
export default locale
importLocale(locale, false)