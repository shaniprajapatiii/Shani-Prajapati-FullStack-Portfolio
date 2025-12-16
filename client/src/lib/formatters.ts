/**
 * Frontend Data Formatting Utilities
 * 
 * Use these to format backend data for display in React components
 */

/**
 * Format date range for Experience display
 * @param startDate - ISO date string or Date object
 * @param endDate - ISO date string or Date object (optional for current position)
 * @returns Formatted string like "2022 - Present" or "2020 - 2022"
 */
export const formatDateRange = (startDate: string | Date, endDate?: string | Date | null): string => {
  const start = new Date(startDate);
  const startYear = start.getFullYear();

  if (!endDate) {
    return `${startYear} - Present`;
  }

  const end = new Date(endDate);
  const endYear = end.getFullYear();

  return `${startYear} - ${endYear}`;
};

/**
 * Format single date for Certificate display
 * @param date - ISO date string or Date object
 * @returns Formatted string like "June 2023"
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
};

/**
 * Format month and year only
 * @param date - ISO date string or Date object
 * @returns Formatted string like "2023"
 */
export const formatYear = (date: string | Date): string => {
  const d = new Date(date);
  return d.getFullYear().toString();
};

/**
 * Transform backend Experience data to frontend format
 */
export const transformExperience = (exp: any) => {
  return {
    ...exp,
    dateRange: formatDateRange(exp.startDate, exp.endDate),
  };
};

/**
 * Transform backend Certificate data to frontend format
 */
export const transformCertificate = (cert: any) => {
  return {
    ...cert,
    issueYear: formatYear(cert.issueDate),
    expiryYear: cert.expiryDate ? formatYear(cert.expiryDate) : null,
  };
};

/**
 * Example API Response Types (for TypeScript)
 */
export interface SkillResponse {
  _id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Other';
  icon: string; // Unicode emoji
  color: string; // Hex color code
  level?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceResponse {
  _id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  location?: string;
  description?: string;
  responsibilities: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateResponse {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  description: string;
  skills: string[];
  highlights: string[];
  gradient: string; // CSS gradient
  verificationUrl?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectResponse {
  _id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  techStack: string[];
  features: string[];
  gradient: string; // CSS gradient
  links: {
    live?: string;
    repo?: string;
  };
  imageUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
