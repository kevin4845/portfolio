import { Component, computed, inject, input } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Language } from '../../core/i18n/language';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-about',
  imports: [Reveal, TranslocoPipe],
  templateUrl: './about.html',
})
export class About {
  private readonly transloco = inject(TranslocoService);
  private readonly language = inject(Language);

  readonly interests = input<readonly string[]>([]);

  protected readonly paragraphs = computed(() => {
    this.language.active();
    const value = this.transloco.translateObject<string[]>('about.paragraphs');
    return Array.isArray(value) ? value : [];
  });
}
