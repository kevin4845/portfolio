import { Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { profile } from '../../core/data/profile';
import { Language } from '../../core/i18n/language';

@Component({
  selector: 'app-maintenance',
  imports: [TranslocoPipe],
  templateUrl: './maintenance.html',
})
export class Maintenance {
  private readonly title = inject(Title);
  private readonly transloco = inject(TranslocoService);
  private readonly language = inject(Language);

  protected readonly name = profile.name;

  constructor() {
    effect(() => {
      this.language.active();
      const heading = this.transloco.translate('maintenance.title');
      if (!heading.startsWith('maintenance.')) {
        this.title.setTitle(`${heading} — ${this.name}`);
      }
    });
  }
}
