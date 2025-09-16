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

export function convertNumberToWords(num: number, options: {
    capitalize?: boolean;
    language?: AvalaibleLanguage 
  } = {}): string {
  let { capitalize = false, language = L} = options;
  if (!Ls[language]) {
    console.warn(`[NUMBER] The language "${language}" has not been loaded.`)
    language = L
  }
  const data = Ls[language];

  if (num === 0) return data.zero;
  if (num < 0) return `${data.minus} ${convertNumberToWords(Math.abs(num), {language})}`;

  let words = "";

  function convertNumberToWordsBelowThousand(num: number): string {
    let words = "";

    if (num >= 100) {
      const hundreds = Math.floor(num / 100);
      words += hundreds > 1 ? `${data.ones[hundreds]} ${data.hundred} ` : `${data.hundred} `;
      num %= 100;
    }

    if (num >= 20) {
      const ten = Math.floor(num / 10);
      words += data.tens[ten] + (num % 10 > 0 ? `-${data.ones[num % 10]}` : "");
    } else if (num >= 10) {
      words += data.teens[num - 10];
    } else if (num > 0) {
      words += data.ones[num];
    }

    return words.trim();
  }

  for (let i = 0; i < data.thousands.length; i++) {
    const power = Math.pow(1000, data.thousands.length - i - 1);
    if (num >= power) {
      const currentNum = Math.floor(num / power);
      if (currentNum > 0) {
        words += `${convertNumberToWordsBelowThousand(currentNum)} ${data.thousands[data.thousands.length - i - 1]} `;
        num %= power;
      }
    }
  }

  words += convertNumberToWordsBelowThousand(num);


  let result =  words.trim() !== "" ? words.trim() : String(num);
  if (capitalize) result = toCapitalize(result)
  return result
}


export default convertNumberToWords