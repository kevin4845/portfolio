export function asStory<T>(value: unknown): T | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  return value as T;
}

export interface ExperienceStory {
  role: string;
  employmentType: string;
  period: string;
  summary: string;
  technologies?: readonly string[];
}

export interface EducationStory {
  credential: string;
  specialization?: string;
  kind: string;
  period: string;
  summary: string;
}

export interface ProjectRoleStory {
  area: string;
  detail?: string;
}

export interface ProjectDecisionStory {
  title?: string;
  body: string;
}

export interface ProjectChallengeStory {
  problem: string;
  approach?: string;
}

export interface ProjectShotStory {
  alt: string;
  caption?: string;
}

/** Translated case-study fields. Omit any a project does not have. */
export interface ProjectStory {
  name: string;
  category: string;
  summary: string;
  type?: string;
  period?: string;
  status?: string;
  imageAlt?: string;
  sourceNote?: string;
  overview?: readonly string[];
  role?: readonly ProjectRoleStory[];
  architecture?: {
    paragraphs?: readonly string[];
    diagram?: string;
  };
  decisions?: readonly ProjectDecisionStory[];
  challenges?: readonly ProjectChallengeStory[];
  result?: readonly string[];
  screenshots?: readonly ProjectShotStory[];
}
