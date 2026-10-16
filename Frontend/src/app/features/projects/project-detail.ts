import { Component, computed, effect, ElementRef, inject, signal, untracked, viewChild } from '@angular/core';
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

  private readonly lightbox = viewChild<ElementRef<HTMLDialogElement>>('lightbox');
  protected readonly openIndex = signal<number | null>(null);
  protected readonly project = computed(() => this.portfolio.findProject(this.slug()));
  protected readonly story = computed(() => {
    this.language.active();
    const project = this.project();
    if (!project) {
      return undefined;
    }

    return asStory<ProjectStory>(this.transloco.translateObject(`projects.items.${project.slug}`));
  });
  protected readonly activeShot = computed(() => {
    const index = this.openIndex();
    const project = this.project();
    const shot = index === null ? undefined : project?.screenshots?.[index];
    if (index === null || !shot) {
      return undefined;
    }

    const story = this.story();
    return {
      src: shot.src,
      alt: story?.screenshots?.[index]?.alt || story?.name || project?.slug || '',
      caption: story?.screenshots?.[index]?.caption,
    };
  });

  constructor() {
    effect(() => {
      this.slug();
      untracked(() => this.closeShot());
    });

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

  protected openShot(index: number): void {
    this.openIndex.set(index);
    const dialog = this.lightbox()?.nativeElement;
    if (!dialog || dialog.open) {
      return;
    }

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      return;
    }

    dialog.setAttribute('open', '');
  }

  protected closeShot(): void {
    const dialog = this.lightbox()?.nativeElement;
    if (!dialog) {
      this.openIndex.set(null);
      return;
    }

    if (dialog.open && typeof dialog.close === 'function') {
      dialog.close();
      return;
    }

    dialog.removeAttribute('open');
    this.openIndex.set(null);
  }

  protected stepShot(delta: number): void {
    const total = this.project()?.screenshots?.length ?? 0;
    const current = this.openIndex();
    if (current === null || total < 2) {
      return;
    }

    this.openIndex.set((current + delta + total) % total);
  }

  protected onLightboxClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeShot();
    }
  }

  protected onLightboxKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.stepShot(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.stepShot(-1);
    }
  }

  protected onDialogClose(): void {
    this.openIndex.set(null);
  }
}
