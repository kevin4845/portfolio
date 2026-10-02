import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Language } from '../../core/i18n/language';
import { asStory, ProjectStory } from '../../core/i18n/stories';
import { Project } from '../../core/models/project';
import { ProjectMark } from './project-mark';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, ProjectMark, TranslocoPipe],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  private readonly transloco = inject(TranslocoService);
  private readonly language = inject(Language);

  readonly project = input.required<Project>();

  protected readonly story = computed(() => {
    this.language.active();
    return asStory<ProjectStory>(
      this.transloco.translateObject(`projects.items.${this.project().slug}`),
    );
  });

  protected moveLight(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || typeof window.matchMedia !== 'function') {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  }
}
