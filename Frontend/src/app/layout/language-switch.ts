import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Language } from '../core/i18n/language';
import { AppLanguage } from '../core/i18n/languages';

@Component({
  selector: 'app-language-switch',
  imports: [TranslocoPipe],
  template: `
    <div class="flex items-center gap-3" role="group" [attr.aria-label]="'language.label' | transloco">
      @for (code of language.supported; track code) {
        <button
          type="button"
          class="inline-flex items-center rounded-sm transition-opacity duration-200 hover:opacity-100"
          [class.opacity-100]="language.active() === code"
          [class.opacity-45]="language.active() !== code"
          [attr.aria-pressed]="language.active() === code"
          [attr.aria-label]="'language.names.' + code | transloco"
          (click)="choose(code)"
        >
          <img
            [src]="'/assets/flags/' + code + '.svg'"
            alt=""
            [attr.width]="code === 'da' ? 19 : 27"
            height="14"
            class="h-3.5 w-auto shadow-[0_0_0_1px_rgb(255_255_255/16%)]"
          />
        </button>
      }
    </div>
  `,
})
export class LanguageSwitch {
  protected readonly language = inject(Language);

  protected choose(code: AppLanguage): void {
    void this.language.use(code);
  }
}
