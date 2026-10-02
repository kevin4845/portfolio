import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Project } from '../../core/models/project';
import { ProjectCard } from '../projects/project-card';
import { Reveal } from '../../shared/reveal';
import { SectionHeading } from '../../shared/section-heading';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard, Reveal, SectionHeading, TranslocoPipe],
  templateUrl: './projects-section.html',
})
export class ProjectsSection {
  readonly projects = input.required<readonly Project[]>();
}
