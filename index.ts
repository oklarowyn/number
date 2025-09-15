import { AvalaibleLanguage, LanguageData } from './types';
import { readFile } from 'fs/promises';
import path from 'path';

export * as Types from './types'

import en from './locale/en.json'
export let L = <AvalaibleLanguage> 'en' 
export const Ls = {}
Ls[L] = en


function toCapitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function locale(language: AvalaibleLanguage = 'fr', define = true): Promise<void> {
  try {
    if (Ls[language]) {
      //console.log(`[NUMBER] The language "${language}" is already loaded.`)
      if (define) L = language
      return; // Retourne si la langue est déjà chargée
    }
    const filePath = path.join(__dirname, 'locale', `${language}.json`);
    const fileContent = await readFile(filePath, 'utf-8');
    const nembers = JSON.parse(fileContent) as LanguageData;
    Ls[language] = nembers
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
    console.warn(`[NUMBER] The language "${language}" has not been loaded.`)
    language = L
  }


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