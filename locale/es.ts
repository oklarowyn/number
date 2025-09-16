import { LanguageData } from "../types";
import { locale as importLocale } from '../.'

const locale = {
    code: "es",
    ones: ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"],
    teens: ["diez","once","doce","trece","catorce","quince","dieciséis","diecisiete","dieciocho","diecinueve"],
    tens: ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"],
    thousands: ["", "mil", "millón", "mil millones"],
    thousandsPlural: ["", "mil", "millones", "mil millones"],
    hundred: "cien",
    zero: "cero",
    minus: "menos",
    omitOneForThousand: true,
    pluralizeThousands: true,
    thousandStep: 1000,
    genderedOne: { masculine: "un", feminine: "una" }
  } as LanguageData

export default locale
importLocale(locale, false)