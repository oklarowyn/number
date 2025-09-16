export type LanguageData = {
  code: AvalaibleLanguage
  ones: string[];
  teens: string[];
  tens: string[];
  thousands: string[];
  hundred: string;
  zero: string;
  minus: string;
};

export const availableLanguages = [
  'en',
  'fr',
  'fr-BE',
  'de',
  'es',
  'it',
  'jp',
  'zh',
  'ar',
  'ru',
  'custom'
] as const;
export type AvalaibleLanguage = typeof availableLanguages[number]