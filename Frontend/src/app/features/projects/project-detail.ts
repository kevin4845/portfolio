import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { map } from 'rxjs';
import { Language } from '../../core/i18n/language';
import { asStory, ProjectStory } from '../../core/i18n/stories';
import { Project } from '../../core/models/project';
import { Portfolio } from '../../core/portfolio';
import { ProjectFigure } from './project-figure';
import { ProjectMark } from './project-mark';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, ProjectFigure, ProjectMark, TranslocoPipe],
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  private readonly portfolio = inject(Portfolio);
  private readonly title = inject(Title);
  private readonly transloco = inject(TranslocoService);
  private readonly language = inject(Language);
  private readonly route = inject(ActivatedRoute);
  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' },
  );

  protected readonly project = computed(() => this.portfolio.findProject(this.slug()));
  protected readonly story = computed(() => {
    this.language.active();
    const project = this.project();
    if (!project) {
      return undefined;
    }

    return asStory<ProjectStory>(this.transloco.translateObject(`projects.items.${project.slug}`));
  });

  constructor() {
    effect(() => {
      this.language.active();
      const project = this.project();
      const name = this.portfolio.profile().name;
      if (!project) {
        this.title.setTitle(`${this.transloco.translate('projectDetail.missingTitle')} — ${name}`);
        return;
      }

      const story = asStory<ProjectStory>(
        this.transloco.translateObject(`projects.items.${project.slug}`),
      );
      this.title.setTitle(`${story?.name ?? project.slug} — ${name}`);
    });
  }

  protected hasLinks(project: Project): boolean {
    return Boolean(project.githubUrl || project.liveUrl || project.links?.length);
  }

  protected external(href: string): boolean {
    return href.startsWith('http');
  }
}
