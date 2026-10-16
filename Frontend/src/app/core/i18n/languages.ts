/** Add a language by appending its code here and creating `public/assets/i18n/{code}.json`. */
export const supportedLanguages = ['en', 'da'] as const;

export type AppLanguage = (typeof supportedLanguages)[number];

/**
 * Languages a visitor can see. Danish translations stay in `da.json`.
 * Add `'da'` here when that copy is ready to publish.
 */
export const offeredLanguages: readonly AppLanguage[] = ['en'];

export const languageStorageKey = 'portfolio.lang';

export const fallbackLanguage: AppLanguage = 'en';

export function isAppLanguage(value: string | null | undefined): value is AppLanguage {
  return supportedLanguages.some((language) => language === value);
}

export function isOfferedLanguage(value: string | null | undefined): value is AppLanguage {
  return offeredLanguages.some((language) => language === value);
}

/**
 * Manual choice wins. Otherwise the first offered browser language wins.
 * `en-GB` matches on the language prefix. Anything else falls back to English.
 */
export function resolveLanguage(
  stored: string | null,
  browserLanguages: readonly string[],
): AppLanguage {
  if (isOfferedLanguage(stored)) {
    return stored;
  }

  for (const language of browserLanguages) {
    const prefix = language.toLowerCase().split('-')[0];
    if (isOfferedLanguage(prefix)) {
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
