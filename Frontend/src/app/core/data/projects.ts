import { Project } from '../models/project';

/** Named work. The case-study copy lives in the translation files. */
export const projects: readonly Project[] = [
  {
    slug: 'personal-portfolio',
    image: { src: 'images/projects/personal-portfolio/hero.jpg' },
    technologies: ['Angular', 'Laravel', 'TypeScript', 'PHP', 'HTML', 'CSS', 'DDEV', 'Monorepo'],
    githubUrl: 'https://github.com/kevin4845/portfolio',
    liveUrl: '/',
    screenshots: [
      { src: 'images/projects/personal-portfolio/hero.jpg' },
      { src: 'images/projects/personal-portfolio/about.jpg' },
      { src: 'images/projects/personal-portfolio/skills.jpg' },
      { src: 'images/projects/personal-portfolio/experience.jpg' },
      { src: 'images/projects/personal-portfolio/projects.jpg' },
      { src: 'images/projects/personal-portfolio/education.jpg' },
    ],
  },
  { slug: 'pimena', technologies: [] },
  { slug: 'bluenordix', technologies: [] },
  { slug: 'pim-system', technologies: [] },
  { slug: 'proximity-voice', technologies: [] },
];
