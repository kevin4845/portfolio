/** Add a language by appending its code here and creating `public/assets/i18n/{code}.json`. */
export const supportedLanguages = ['en', 'da'] as const;

export type AppLanguage = (typeof supportedLanguages)[number];

export const languageStorageKey = 'portfolio.lang';

export const fallbackLanguage: AppLanguage = 'en';

export function isAppLanguage(value: string | null | undefined): value is AppLanguage {
  return supportedLanguages.some((language) => language === value);
}

/**
 * Manual choice wins. Otherwise the first supported browser language wins.
 * `da-DK` and `en-GB` match on the language prefix. Anything else falls back to English.
 */
export function resolveLanguage(
  stored: string | null,
  browserLanguages: readonly string[],
): AppLanguage {
  if (isAppLanguage(stored)) {
    return stored;
  }

  for (const language of browserLanguages) {
    const prefix = language.toLowerCase().split('-')[0];
    if (isAppLanguage(prefix)) {
      return prefix;
    }
  }

  return fallbackLanguage;
}

export function browserLanguages(): readonly string[] {
  if (typeof navigator === 'undefined') {
    return [];
  }

  if (navigator.languages?.length) {
    return navigator.languages;
  }

  return navigator.language ? [navigator.language] : [];
}

export function readStoredLanguage(): string | null {
  try {
    return localStorage.getItem(languageStorageKey);
  } catch {
    return null;
  }
}

export function resolveInitialLanguage(): AppLanguage {
  return resolveLanguage(readStoredLanguage(), browserLanguages());
}
