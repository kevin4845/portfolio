import { Profile } from '../models/profile';

/** Replace the hrefs with real contact links. Labels come from the translation files. */
export const profile: Profile = {
  name: 'Kevin Møller Madsen',
  interests: [],
  links: [
    {
      id: 'email',
      href: 'mailto:replace-me@example.com',
      external: false,
    },
    {
      id: 'github',
      href: 'https://github.com/replace-me',
      external: true,
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com/in/replace-me',
      external: true,
    },
  ],
};
