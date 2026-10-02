import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import {
  AppLanguage,
  fallbackLanguage,
  isAppLanguage,
  languageStorageKey,
  supportedLanguages,
} from './languages';

@Injectable({ providedIn: 'root' })
export class Language {
  private readonly transloco = inject(TranslocoService);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly supported = supportedLanguages;
  readonly active = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });

  constructor() {
    this.transloco.langChanges$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((lang) => {
      this.applyDocument(lang);
    });
  }

  /** Load the active language, then switch. The previous language stays up until the file is ready. */
  use(lang: AppLanguage): Promise<void> {
    this.remember(lang);
    return this.activate(lang);
  }

  activate(lang: string): Promise<void> {
    const next = isAppLanguage(lang) ? lang : fallbackLanguage;
    return firstValueFrom(this.transloco.load(next)).then(() => {
      this.transloco.setActiveLang(next);
      this.applyDocument(next);
    });
  }

  /** Home and project pages set their own title after this default. */
  setDefaultTitle(): void {
    this.title.setTitle(this.transloco.translate('meta.title'));
  }

  private remember(lang: AppLanguage): void {
    try {
      localStorage.setItem(languageStorageKey, lang);
    } catch {
      // Private mode can reject storage. The in-memory language still changes.
    }
  }

  private applyDocument(lang: string): void {
    this.document.documentElement.lang = lang;
    const description = this.transloco.translate<string>('meta.description');
    if (typeof description === 'string' && !description.startsWith('meta.')) {
      this.document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }
}
