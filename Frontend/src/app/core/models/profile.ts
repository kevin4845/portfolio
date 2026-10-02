import { SocialLink } from './social-link';

export interface Profile {
  name: string;
  interests: readonly string[];
  links: readonly SocialLink[];
}
