export interface PersonalInfo {
  name: string;
  role: string;
  subtitle: string;
  location: string;
  country: string;
  availability: string;
  email: string;
  phone: string;
  phoneHref: string;
  languages: string[];
  githubUrl: string;
  linkedinUrl: string;
  resumePdf: string;
  profileImage: string;
  description: string;
}

export interface QuickFact {
  icon: string;
  value: string;
  label: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  company: string;
  descriptions: string[];
  techTags?: string[];
}

export interface SoftSkill {
  icon: string;
  title: string;
  description: string;
}

export interface TechItem {
  name: string;
  category: string;
  description: string;
  level?: number;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  github: string;
  slug?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface TechStackResponse {
  success: boolean;
  techStack: TechItem[];
  count: number;
}

export interface ProjectsResponse {
  success: boolean;
  projects: Project[];
  count: number;
}