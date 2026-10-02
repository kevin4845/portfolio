import { Injectable, signal } from '@angular/core';
import { education } from './data/education';
import { experience } from './data/experience';
import { profile } from './data/profile';
import { projects } from './data/projects';
import { skillGroups } from './data/skills';
import { Education } from './models/education';
import { Experience } from './models/experience';
import { Profile } from './models/profile';
import { Project } from './models/project';
import { SkillGroup } from './models/skill-group';

/**
 * Local portfolio structure. Components read this service for records and
 * Transloco for the words, so a later API can replace the signals without
 * changing how copy is translated.
 */
@Injectable({ providedIn: 'root' })
export class Portfolio {
  readonly profile = signal<Profile>(profile);
  readonly skills = signal<readonly SkillGroup[]>(skillGroups);
  readonly experience = signal<readonly Experience[]>(experience);
  readonly education = signal<readonly Education[]>(education);
  readonly projects = signal<readonly Project[]>(projects);

  findProject(slug: string): Project | undefined {
    return this.projects().find((project) => project.slug === slug);
  }
}
