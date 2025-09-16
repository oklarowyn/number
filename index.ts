import { AvalaibleLanguage, LanguageData } from './types';

export * as Types from './types'

import en from './locale/en'
let L: AvalaibleLanguage = 'en'
const Ls: Record<string, LanguageData> = {};
Ls[L] = en


function toCapitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function locale(
  locale: LanguageData | AvalaibleLanguage = 'fr',
  dynamicImport = true,
): Promise<void> {
  try {
    if (typeof locale === 'string') {
      if (Ls[locale]) {

        L = locale
        return
      }

      if (dynamicImport) {
        //console.log(`[NUMBER] Try to load "${locale}" dynamicly.`)
        await import(`./locale/${locale}`).then((lang) => { 
          L = locale
          Ls[locale] = lang.default
        })
        .catch(()=> console.error(`[NUMBER] The language "${locale}" does not exist.`))
        return
      }

      console.error(`[NUMBER] The language "${locale}" isn't loaded.`)
      return
    }

    if (typeof locale === 'object') {
      if (Ls[locale.code]) {
        console.warn(`[NUMBER] The language "${locale.code}" is already loaded.`)
        return
      }
      if(dynamicImport) L = locale.code
      Ls[locale.code] = locale
      return
    }

    console.error(`[NUMBER] You tried to import something not supported.`)
  } catch {
    console.error(`[NUMBER] The language is not supported or encountered an error.`)
    
  }
}

export function LoadedLanguages() {
  return Object.keys(Ls);
}

export function convertNumberToWords(
  num: number,
  options: {
    capitalize?: boolean;
    language?: string;
    gender?: "masculine" | "feminine"; // pour gérer un/une si activé
  } = {}
): string {
  let { capitalize = false, language = L, gender = "masculine" } = options;
  if (!Ls[language]) {
    console.warn(`[NUMBER] The language "${language}" has not been loaded.`);
    language = L;
  }
  const data = Ls[language];
  const step = data.thousandStep ?? 1000;
  const pluralize = data.pluralizeThousands ?? false;

  if (num === 0) return data.zero;
  if (num < 0)
    return `${data.minus} ${convertNumberToWords(Math.abs(num), {
      language,
      gender,
    })}`;

  function convertNumberToWordsBelowThousand(n: number): string {
    let words = "";

    if (n >= 100) {
      const hundreds = Math.floor(n / 100);
      if (hundreds > 0) {
        // Accord de "cent" si nécessaire
        if (language === "fr") {
          if (hundreds > 1) {
            words += `${data.ones[hundreds]} ${data.hundred}`;
            if (n % 100 === 0) words += "s"; // deux cents
          } else {
            words += `${data.hundred}${n % 100 === 0 ? "s" : ""}`;
          }
        } else {
          words +=
            hundreds > 1
              ? `${data.ones[hundreds]} ${data.hundred}`
              : `${data.hundred}`;
        }
        words += " ";
      }
      n %= 100;
    }

    if (n >= 20) {
      const ten = Math.floor(n / 10);
      if (language === "fr" && ten === 8 && n % 10 === 0) {
        words += data.tens[ten] + "s"; // quatre-vingts
      } else {
        words += data.tens[ten];
      }
      if (n % 10 > 0) words += `-${data.ones[n % 10]}`;
    } else if (n >= 10) {
      words += data.teens[n - 10];
    } else if (n > 0) {
      if (n === 1 && data.genderedOne) {
        words += data.genderedOne[gender] ?? data.genderedOne.masculine;
      } else {
        words += data.ones[n];
      }
    }

    return words.trim();
  }

  let words = "";
  for (let i = 0; i < data.thousands.length; i++) {
    const power = Math.pow(step, data.thousands.length - i - 1);
    if (num >= power) {
      const currentNum = Math.floor(num / power);
      if (currentNum > 0) {
        const isPlural = currentNum > 1 && pluralize;
        const thousandWord =
          isPlural && data.thousandsPlural
            ? data.thousandsPlural[data.thousands.length - i - 1]
            : data.thousands[data.thousands.length - i - 1];

        if (
          data.omitOneForThousand &&
          thousandWord === data.thousands[1] &&
          currentNum === 1
        ) {
          words += `${thousandWord} `;
        } else {
          words += `${convertNumberToWordsBelowThousand(
            currentNum
          )} ${thousandWord} `;
        }
        num %= power;
      }
    }
  }

  words += convertNumberToWordsBelowThousand(num);

  let result = words.trim() !== "" ? words.trim() : String(num);
  if (capitalize) result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
}


export default convertNumberToWords