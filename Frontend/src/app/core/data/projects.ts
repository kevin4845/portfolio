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
  {
    slug: 'elunio',
    image: { src: 'images/projects/elunio/landing.png' },
    technologies: ['Angular', 'Laravel', 'TypeScript', 'PHP', 'Tailwind CSS'],
    screenshots: [
      { src: 'images/projects/elunio/landing.png' },
      { src: 'images/projects/elunio/edit-calculator.png' },
      { src: 'images/projects/elunio/calculator-preview.png' },
      { src: 'images/projects/elunio/calculators.png' },
      { src: 'images/projects/elunio/quotes.png' },
      { src: 'images/projects/elunio/dashboard.png' },
      { src: 'images/projects/elunio/billing.png' },
      { src: 'images/projects/elunio/login.png' },
    ],
  },
  {
    slug: 'danish-banknote-system',
    image: { src: 'images/projects/danishbanknotesystem/home.png' },
    technologies: ['Angular', 'Laravel', 'TypeScript', 'PHP', 'PrimeNG', 'Tailwind CSS', 'DDEV'],
    githubUrl: 'https://github.com/kevin4845/DanishBanknoteSystem',
    screenshots: [
      { src: 'images/projects/danishbanknotesystem/home.png' },
      { src: 'images/projects/danishbanknotesystem/searchbanknotes.png' },
      { src: 'images/projects/danishbanknotesystem/mycollection.png' },
      { src: 'images/projects/danishbanknotesystem/mywishlist.png' },
    ],
  },
  {
    slug: 'mc-profile',
    image: { src: 'images/projects/mcprofile/thumbnail.png' },
    technologies: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/kevin4845/MCProfileChromeExtension',
    liveUrl: 'https://chromewebstore.google.com/detail/mc-profile/fecbenokgfbggkecbcdkjklneigffcmj',
    screenshots: [
      { src: 'images/projects/mcprofile/thumbnail.png' },
      { src: 'images/projects/mcprofile/logo.png', fit: 'contain' },
    ],
  },
];
