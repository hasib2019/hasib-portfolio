export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  facebook: string;
  location: string;
  bloodGroup: string;
  summary: string;
  availableForWork: boolean;
  footerCredit: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  duration: string;
  current: boolean;
  technologies: string[];
  description: string;
}

export interface Project {
  id: number;
  name: string;
  company: string;
  type: string;
  description: string;
  technologies: string[];
  link: string;
  linkLabel: string;
  featured: boolean;
  demo?: { user: string; pass: string };
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  gpa: string | null;
  icon: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  validationNo: string | null;
  verifyUrl: string | null;
  category: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  skills: Record<string, string[]>;
}

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
}

export type MessageStatus = "unread" | "read";

export interface Message {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  body: string;
  status: MessageStatus;
  createdAt: string;
}

export type QuotationStatus = "pending" | "reviewed" | "accepted" | "rejected";

export interface Quotation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  projectName: string;
  description: string;
  budget: string;
  deadline: string;
  techStack: string;
  status: QuotationStatus;
  adminNote: string;
  createdAt: string;
}
