import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { languageStorageKey } from '../core/i18n/languages';
import { provideTestingTransloco, useTestLanguage } from '../core/i18n/testing';
import { SiteHeader } from './site-header';

describe('SiteHeader language switch', () => {
  beforeEach(async () => {
    localStorage.removeItem(languageStorageKey);
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [provideRouter([]), ...provideTestingTransloco()],
    }).compileComponents();
    useTestLanguage('en');
  });

  afterEach(() => {
    localStorage.removeItem(languageStorageKey);
  });

  it('switches language in place and remembers the choice', async () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('About');
    expect(element.textContent).not.toContain('Om mig');
    expect(element.querySelector('img[src="/assets/flags/en.svg"]')).toBeTruthy();
    expect(element.querySelector('img[src="/assets/flags/da.svg"]')).toBeTruthy();

    const menu = [...element.querySelectorAll('button')].find((button) => button.textContent?.includes('Menu'));
    menu?.click();
    fixture.detectChanges();

    expect(element.querySelectorAll('img[src="/assets/flags/en.svg"]').length).toBe(2);
    expect(element.querySelectorAll('img[src="/assets/flags/da.svg"]').length).toBe(2);

    const danish = [...element.querySelectorAll('button')].find(
      (button) => button.getAttribute('aria-label') === 'Dansk',
    );
    danish?.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(element.textContent).toContain('Om mig');
    expect(element.textContent).not.toContain('About');
    expect(localStorage.getItem(languageStorageKey)).toBe('da');
    expect(document.documentElement.lang).toBe('da');
  });
});
