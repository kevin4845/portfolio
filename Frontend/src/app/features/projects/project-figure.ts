import { Component, input } from '@angular/core';
import { ProjectImage } from '../../core/models/project';

@Component({
  selector: 'app-project-figure',
  template: `
    <figure class="project-frame">
      <img
        class="aspect-[16/10] w-full object-cover object-top"
        [src]="image().src"
        [alt]="image().alt"
        [attr.loading]="loading()"
      />
      @if (image().caption) {
        <figcaption>{{ image().caption }}</figcaption>
      }
    </figure>
  `,
})
export class ProjectFigure {
  readonly image = input.required<ProjectImage>();
  readonly loading = input<'eager' | 'lazy'>('lazy');
}
