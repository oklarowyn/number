import { AvalaibleLanguage, LanguageData } from './types';

export * as Types from './types'

import en from './locale/en'
let L: AvalaibleLanguage = 'en'
const Ls: Record<string, LanguageData> = {};
Ls[L] = en


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
    gender?: "masculine" | "feminine";
  } = {}
): string {
  let { capitalize = false, language = L, gender = "masculine" } = options;
  if (!Ls[language]) {
    console.warn(`[NUMBER] The language "${language}" has not been loaded.`);
    language = L;
  }
  const data = Ls[language];

  const step = data.thousandStep ?? (language.startsWith("zh") || language.startsWith("jp") ? 10000 : 1000);
  const pluralize = data.pluralizeThousands ?? false;

  const isGerman = language.startsWith("de");
  const isFrench = language.startsWith("fr");
  const isES = language.startsWith("es");
  const isIT = language.startsWith("it");
  const isRU = language.startsWith("ru");
  const isAR = language.startsWith("ar");
  const isZH = language.startsWith("zh");
  const isJP = language.startsWith("jp");

  if (num === 0) return data.zero;
  if (num < 0) return `${data.minus} ${convertNumberToWords(Math.abs(num), { language, gender })}`;

  // --- Version asiatique (ZH / JP) ---
  function convertAsianBelow10000(n: number): string {
    if (n === 0) return "";
    const units = ["", data.teens[1], data.hundred, data.thousand];
    let result = "";
    const digits = n.toString().split("").map(Number);

    for (let i = 0; i < digits.length; i++) {
      const d = digits[digits.length - 1 - i];
      if (d === 0) {
        if (!result.startsWith(data.zero)) result = data.zero + result;
      } else {
        result = data.ones[d] + units[i] + result;
      }
    }
    return result.replace(/零+/g, data.zero).replace(new RegExp(`${data.zero}$`), "");
  }

  // --- Version occidentale (<1000) ---
  function convertNumberToWordsBelowThousand(n: number, isLastChunk = false): string {
    let words = "";

    // Centaines
    if (n >= 100) {
      const hundreds = Math.floor(n / 100);
      if (hundreds > 0) {
        if (isGerman) {
          words += (hundreds === 1 ? "ein" : data.ones[hundreds]) + data.hundred;
        } else if (isFrench) {
          if (hundreds > 1) {
            words += `${data.ones[hundreds]} ${data.hundred}`;
            if (n % 100 === 0) words += "s";
          } else words += data.hundred;
        } else if (isES || isIT || isRU || isAR) {
          words += data.hundreds[hundreds];
        } else {
          words += hundreds > 1 ? `${data.ones[hundreds]} ${data.hundred}` : data.hundred;
        }
        words += " ";
      }
      n %= 100;
    }

    // Dizaines + unités
    if (n >= 20) {
      const ten = Math.floor(n / 10);
      const unit = n % 10;
      if (isGerman) {
        words += unit > 0 ? (unit === 1 && isLastChunk ? "eins" : data.ones[unit]) + "und" + data.tens[ten] : data.tens[ten];
      } else if (isFrench) {
        words += ten === 8 && unit === 0 ? "quatre-vingts" : data.tens[ten] + (unit > 0 ? `-${data.ones[unit]}` : "");
      } else if (isES || isIT || isRU || isAR) {
        words += data.tens[ten];
        if (unit > 0) words += data.tensConnector ? data.tensConnector + data.ones[unit] : " " + data.ones[unit];
      } else {
        words += data.tens[ten] + (unit > 0 ? `-${data.ones[unit]}` : "");
      }
    } else if (n >= 10) {
      words += data.teens[n - 10];
    } else if (n > 0) {
      if (n === 1 && data.genderedOne) words += data.genderedOne[gender] ?? data.genderedOne.masculine;
      else if (isGerman && n === 1 && !isLastChunk) words += "ein";
      else words += data.ones[n];
    }

    return words.trim();
  }

  let words = "";
  let chunks: string[] = [];
  let remaining = num;

  if (isZH || isJP) {
    // Découpage en blocs de 10000
    const units = data.thousands; // ex: ["", "万", "亿", "兆"]
    let chunkIndex = 0;
    while (remaining > 0) {
      const part = remaining % 10000;
      if (part > 0) {
        chunks.unshift(convertAsianBelow10000(part) + units[chunkIndex]);
      }
      remaining = Math.floor(remaining / 10000);
      chunkIndex++;
    }
    words = chunks.join("").replace(/零+/g, data.zero).replace(new RegExp(`${data.zero}$`), "");
  } else {
    // Occidentaux
    const thousandsLength = data.thousands.length;
    for (let i = 0; i < thousandsLength; i++) {
      const power = Math.pow(step, thousandsLength - i - 1);
      if (remaining >= power) {
        const currentNum = Math.floor(remaining / power);
        if (currentNum > 0) {
          const isPlural = currentNum > 1 && pluralize;
          const thousandWord =
            isPlural && data.thousandsPlural
              ? data.thousandsPlural[thousandsLength - i - 1]
              : data.thousands[thousandsLength - i - 1];

          const chunkWords = convertNumberToWordsBelowThousand(currentNum, i === thousandsLength - 1);

          if (isGerman) {
            chunks.push(`${chunkWords}${thousandWord}`);
          } else {
            chunks.push(`${chunkWords} ${thousandWord}`);
          }

          remaining %= power;
        }
      }
    }

    if (remaining > 0 || chunks.length === 0) {
      chunks.push(convertNumberToWordsBelowThousand(remaining, true));
    }

    words = chunks.join(" ").trim();
  }

  if (capitalize) words = words.charAt(0).toUpperCase() + words.slice(1);
  return words;
}


export default convertNumberToWords