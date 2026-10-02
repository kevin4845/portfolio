import { Component, inject, input } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { EducationStory, asStory } from '../../core/i18n/stories';
import { Language } from '../../core/i18n/language';
import { Education } from '../../core/models/education';
import { Reveal } from '../../shared/reveal';
import { SectionHeading } from '../../shared/section-heading';

@Component({
  selector: 'app-education',
  imports: [Reveal, SectionHeading, TranslocoPipe],
  templateUrl: './education.html',
})
export class EducationSection {
  private readonly transloco = inject(TranslocoService);
  private readonly language = inject(Language);

  readonly entries = input.required<readonly Education[]>();

  protected text(id: string): EducationStory {
    this.language.active();
    return (
      asStory<EducationStory>(this.transloco.translateObject(`education.entries.${id}`)) ?? {
        credential: '',
        kind: '',
        period: '',
        summary: '',
      }
    );
  }
}
