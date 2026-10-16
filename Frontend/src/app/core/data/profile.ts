import { Profile } from '../models/profile';

/** Replace the hrefs with real contact links. Labels come from the translation files. */
export const profile: Profile = {
  name: 'Kevin Møller Madsen',
  interests: [],
  links: [
    {
      id: 'email',
      href: 'mailto:madsen070602@hotmail.com',
      external: false,
    },
    {
      id: 'github',
      href: 'https://github.com/kevin4845',
      external: true,
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com/in/kevin-m%C3%B8ller-madsen/',
      external: true,
    },
  ],
};
