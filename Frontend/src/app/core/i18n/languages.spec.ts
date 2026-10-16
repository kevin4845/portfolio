import { languageStorageKey, resolveInitialLanguage, resolveLanguage } from './languages';

describe('resolveLanguage', () => {
  it('uses a stored choice before the browser language', () => {
    expect(resolveLanguage('en', ['da-DK'])).toBe('en');
    expect(resolveLanguage('da', ['en-US'])).toBe('en');
  });

  it('matches language prefixes and ignores Danish until it is offered', () => {
    expect(resolveLanguage(null, ['da-DK'])).toBe('en');
    expect(resolveLanguage(null, ['en-GB'])).toBe('en');
    expect(resolveLanguage(null, ['EN-us'])).toBe('en');
  });

  it('uses the first offered language in the browser list', () => {
    expect(resolveLanguage(null, ['sv-SE', 'da-DK', 'en'])).toBe('en');
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

  it('stays in English when a previous visit stored Danish', () => {
    localStorage.setItem(languageStorageKey, 'da');
    expect(resolveInitialLanguage()).toBe('en');
    localStorage.removeItem(languageStorageKey);
  });
});
