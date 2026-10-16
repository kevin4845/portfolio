export interface ProjectAsset {
  src: string;
  /** Square marks use `contain` so the shared 16:10 frame does not crop them. */
  fit?: 'cover' | 'contain';
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  fit?: 'cover' | 'contain';
}

export interface ProjectLink {
  id: string;
  href: string;
}

/** Structure only. The words live in the translation files under `projects.items.{slug}`. */
export interface Project {
  slug: string;
  technologies: readonly string[];
  image?: ProjectAsset;
  githubUrl?: string;
  liveUrl?: string;
  links?: readonly ProjectLink[];
  screenshots?: readonly ProjectAsset[];
}
