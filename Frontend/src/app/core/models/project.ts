export interface ProjectAsset {
  src: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
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
