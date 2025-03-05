import { AvalaibleLanguage, LanguageData } from './types';


export * as Types from './types'

import en from './locale/en'
export let L = <AvalaibleLanguage> 'en' 
export const Ls = {}
Ls[L] = en


function toCapitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function locale(language: AvalaibleLanguage = 'fr', define = true): Promise<void> {
  try {
    if (Ls[language]) {
      console.log(`[NUMBER] The language "${language}" is already loaded.`)
      return Ls[language]
    }
    let genders = await import(`./locale/${language}`)
    Ls[language] = genders.default
    if (define) L = language
  } catch (error) {
    console.warn(`[NUMBER] The language "${language}" is not supported or have enconter an error.`)
  }
}

export function convertNumberToWords(num: number, options: {
    capitalize?: boolean;
    language?: AvalaibleLanguage 
  } = {}): string {

  let { capitalize = false, language = L} = options;;
  const data = Ls[language];

  if (!Ls[language]) {
    console.warn(`[GENDER] The language "${language}" has not been loaded.`)
    language = L
  }

  if (num === 0) return data.zero;
  if (num < 0) return `${data.minus} ${convertNumberToWords(Math.abs(num), {language})}`;

  let words = "";

  const units = [data.billion, data.million, ...data.thousands];

  for (let i = 0; i < units.length; i++) {
    const power = Math.pow(1000, units.length - i - 1);
    if (num >= power) {
      const currentNum = Math.floor(num / power);
      if (currentNum > 0) {
        words += `${convertNumberToWords(currentNum, {language})} ${units[units.length - i - 1]} `;
        num %= power;
      }
    }
  }

  let result =  words.trim() !== "" ? words.trim() : String(num);
  if (capitalize) result = toCapitalize(result)
  return result
}

export default convertNumberToWords