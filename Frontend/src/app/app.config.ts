import { ApplicationConfig, isDevMode, provideAppInitializer, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { Language } from './core/i18n/language';
import { fallbackLanguage, resolveInitialLanguage, supportedLanguages } from './core/i18n/languages';
import { TranslocoHttpLoader } from './core/i18n/transloco-loader';

const initialLanguage = resolveInitialLanguage();

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    ...provideTransloco({
      config: {
        availableLangs: [...supportedLanguages],
        defaultLang: initialLanguage,
        fallbackLang: fallbackLanguage,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        missingHandler: {
          useFallbackTranslation: true,
          logMissingKey: !isDevMode(),
        },
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(() => {
      const transloco = inject(TranslocoService);
      const language = inject(Language);
      const pending = [firstValueFrom(transloco.load(initialLanguage))];
      if (initialLanguage !== fallbackLanguage) {
        pending.push(firstValueFrom(transloco.load(fallbackLanguage)));
      }

      return Promise.all(pending).then(() =>
        language.activate(initialLanguage).then(() => language.setDefaultTitle()),
      );
    }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
};
