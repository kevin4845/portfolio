import { languageStorageKey, resolveInitialLanguage, resolveLanguage } from './languages';

describe('resolveLanguage', () => {
  it('uses a stored choice before the browser language', () => {
    expect(resolveLanguage('da', ['en-US'])).toBe('da');
    expect(resolveLanguage('en', ['da-DK'])).toBe('en');
  });

  it('matches language prefixes', () => {
    expect(resolveLanguage(null, ['da-DK'])).toBe('da');
    expect(resolveLanguage(null, ['en-GB'])).toBe('en');
    expect(resolveLanguage(null, ['EN-us'])).toBe('en');
  });

  it('uses the first supported language in the browser list', () => {
    expect(resolveLanguage(null, ['sv-SE', 'da-DK', 'en'])).toBe('da');
  });

  it('falls back to English for unsupported languages and invalid storage', () => {
    expect(resolveLanguage(null, ['fr-FR'])).toBe('en');
    expect(resolveLanguage(null, ['de'])).toBe('en');
    expect(resolveLanguage('fr', ['de'])).toBe('en');
    expect(resolveLanguage(null, [])).toBe('en');
  });

  it('keeps the storage key stable', () => {
    expect(languageStorageKey).toBe('portfolio.lang');
  });

  it('uses the stored language on the next visit', () => {
    localStorage.setItem(languageStorageKey, 'da');
    expect(resolveInitialLanguage()).toBe('da');
    localStorage.removeItem(languageStorageKey);
  });
});
