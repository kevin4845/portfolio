import { Project } from '../models/project';

/** Named work. The case-study copy lives in the translation files. */
export const projects: readonly Project[] = [
  {
    slug: 'personal-portfolio',
    image: { src: 'projects/personal-portfolio/hero.jpg' },
    technologies: ['Angular', 'Laravel', 'TypeScript', 'PHP', 'HTML', 'CSS', 'DDEV', 'Monorepo'],
    githubUrl: 'https://github.com/kevin4845/portfolio',
    liveUrl: '/',
    screenshots: [
      { src: 'projects/personal-portfolio/hero.jpg' },
      { src: 'projects/personal-portfolio/about.jpg' },
      { src: 'projects/personal-portfolio/skills.jpg' },
      { src: 'projects/personal-portfolio/experience.jpg' },
      { src: 'projects/personal-portfolio/projects.jpg' },
      { src: 'projects/personal-portfolio/education.jpg' },
    ],
  },
  { slug: 'pimena', technologies: [] },
  { slug: 'bluenordix', technologies: [] },
  { slug: 'pim-system', technologies: [] },
  { slug: 'proximity-voice', technologies: [] },
];
