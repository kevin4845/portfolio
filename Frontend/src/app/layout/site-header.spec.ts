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

  it('stays in English and hides the language switch', async () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('About');
    expect(element.textContent).not.toContain('Om mig');
    expect(element.querySelector('img[src="/assets/flags/en.svg"]')).toBeNull();
    expect(element.querySelector('img[src="/assets/flags/da.svg"]')).toBeNull();

    const menu = [...element.querySelectorAll('button')].find((button) => button.textContent?.includes('Menu'));
    menu?.click();
    fixture.detectChanges();

    expect(element.querySelector('img[src="/assets/flags/da.svg"]')).toBeNull();
    expect(element.textContent).toContain('About');
    expect(document.documentElement.lang).not.toBe('da');
  });
});
