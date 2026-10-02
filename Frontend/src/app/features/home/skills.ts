import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SkillGroup } from '../../core/models/skill-group';
import { Reveal } from '../../shared/reveal';
import { SectionHeading } from '../../shared/section-heading';

@Component({
  selector: 'app-skills',
  imports: [Reveal, SectionHeading, TranslocoPipe],
  templateUrl: './skills.html',
})
export class Skills {
  readonly groups = input.required<readonly SkillGroup[]>();

  protected indexLabel(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}
