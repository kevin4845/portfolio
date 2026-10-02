import { Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Language } from '../../core/i18n/language';
import { Portfolio } from '../../core/portfolio';
import { About } from './about';
import { Contact } from './contact';
import { EducationSection } from './education';
import { ExperienceSection } from './experience';
import { Hero } from './hero';
import { ProjectsSection } from './projects-section';
import { Skills } from './skills';

@Component({
  selector: 'app-home',
  imports: [Hero, About, Skills, ExperienceSection, ProjectsSection, EducationSection, Contact],
  templateUrl: './home.html',
})
export class Home {
  protected readonly portfolio = inject(Portfolio);
  private readonly language = inject(Language);
  private readonly title = inject(Title);

  constructor() {
    effect(() => {
      this.language.active();
      this.language.setDefaultTitle();
    });
  }
}
