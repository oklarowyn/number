import { LanguageData } from "../types";

export default {
    code: "en",
    ones: ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
    teens: ["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],
    tens: ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
    thousands: ["", "thousand", "million", "billion"],
    thousandsPlural: ["", "thousand", "million", "billion"], // en anglais, pluriel = même mot
    hundred: "hundred",
    zero: "zero",
    minus: "minus",
    omitOneForThousand: false,
    pluralizeThousands: false,
    thousandStep: 1000
  } as LanguageData
