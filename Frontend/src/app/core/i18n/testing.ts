import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Translation, TranslocoLoader, TranslocoService, provideTransloco } from '@jsverse/transloco';
import { of } from 'rxjs';
import da from '../../../../public/assets/i18n/da.json';
import en from '../../../../public/assets/i18n/en.json';
import { AppLanguage, supportedLanguages } from './languages';

@Injectable()
class TestingTranslocoLoader implements TranslocoLoader {
  getTranslation(lang: string) {
    return of((lang === 'da' ? da : en) as Translation);
  }
}

export function provideTestingTransloco(lang: AppLanguage = 'en') {
  return provideTransloco({
    config: {
      availableLangs: [...supportedLanguages],
      defaultLang: lang,
      fallbackLang: 'en',
      reRenderOnLangChange: true,
    },
    loader: TestingTranslocoLoader,
  });
}

/** Puts both languages in memory so the first render does not wait on HTTP. */
export function useTestLanguage(lang: AppLanguage = 'en'): void {
  const transloco = TestBed.inject(TranslocoService);
  transloco.setTranslation(en as Translation, 'en');
  transloco.setTranslation(da as Translation, 'da');
  transloco.setActiveLang(lang);
}
