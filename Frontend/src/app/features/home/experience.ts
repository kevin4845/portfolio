import { Component, computed, inject, input } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ExperienceStory, asStory } from '../../core/i18n/stories';
import { Language } from '../../core/i18n/language';
import { Experience } from '../../core/models/experience';
import { Reveal } from '../../shared/reveal';
import { SectionHeading } from '../../shared/section-heading';

@Component({
  selector: 'app-experience',
  imports: [Reveal, SectionHeading, TranslocoPipe],
  templateUrl: './experience.html',
})
export class ExperienceSection {
  private readonly transloco = inject(TranslocoService);
  private readonly language = inject(Language);

  readonly entries = input.required<readonly Experience[]>();

  /** Consecutive roles at the same company share one place on the timeline. */
  protected readonly groups = computed(() => {
    const groups: { company: string; roles: Experience[] }[] = [];

    for (const entry of this.entries()) {
      const current = groups.at(-1);
      if (current?.company === entry.company) {
        current.roles.push(entry);
      } else {
        groups.push({ company: entry.company, roles: [entry] });
      }
    }

    return groups;
  });

  protected entry(id: string): ExperienceStory {
    this.language.active();
    return (
      asStory<ExperienceStory>(this.transloco.translateObject(`experience.entries.${id}`)) ?? {
        role: '',
        employmentType: '',
        period: '',
        summary: '',
      }
    );
  }
}
