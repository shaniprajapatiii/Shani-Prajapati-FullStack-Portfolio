/**
 * Custom React Hooks for API Data Fetching
 * Use these hooks in your frontend components to fetch data from the backend
 */

import { useState, useEffect } from 'react';
import {
  SkillResponse,
  ExperienceResponse,
  CertificateResponse,
  ProjectResponse,
  transformExperience,
  transformCertificate,
} from '../lib/formatters';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface UseQueryState<T> {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Fetch Skills
 */
export const useSkills = (): UseQueryState<SkillResponse> => {
  const [data, setData] = useState<SkillResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/skills`);
      if (!response.ok) throw new Error('Failed to fetch skills');
      const skills = await response.json();
      // Sort by order
      setData(skills.sort((a: SkillResponse, b: SkillResponse) => a.order - b.order));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return { data, loading, error, refetch: fetchSkills };
};

/**
 * Fetch Experiences
 */
export const useExperience = (): UseQueryState<ExperienceResponse> => {
  const [data, setData] = useState<ExperienceResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/experience`);
      if (!response.ok) throw new Error('Failed to fetch experience');
      const experiences = await response.json();
      // Transform dates and sort by order
      const transformed = experiences.map(transformExperience).sort((a: any, b: any) => a.order - b.order);
      setData(transformed);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  return { data, loading, error, refetch: fetchExperience };
};

/**
 * Fetch Certificates
 */
export const useCertificates = (): UseQueryState<CertificateResponse> => {
  const [data, setData] = useState<CertificateResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/certificates`);
      if (!response.ok) throw new Error('Failed to fetch certificates');
      const certificates = await response.json();
      // Transform dates and sort by order
      const transformed = certificates.map(transformCertificate).sort((a: any, b: any) => a.order - b.order);
      setData(transformed);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return { data, loading, error, refetch: fetchCertificates };
};

/**
 * Fetch Projects
 */
export const useProjects = (): UseQueryState<ProjectResponse> => {
  const [data, setData] = useState<ProjectResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const projects = await response.json();
      // Sort by order
      setData(projects.sort((a: ProjectResponse, b: ProjectResponse) => a.order - b.order));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { data, loading, error, refetch: fetchProjects };
};

/**
 * Fetch Single Project by Slug
 */
export const useProjectBySlug = (slug: string | undefined): UseQueryState<ProjectResponse> => {
  const [data, setData] = useState<ProjectResponse[] | null>(null);
  const [loading, setLoading] = useState(!!slug);
  const [error, setError] = useState<Error | null>(null);

  const fetchProject = async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const projects = await response.json();
      const project = projects.find((p: ProjectResponse) => p.slug === slug);
      setData(project ? [project] : []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [slug]);

  return { data, loading, error, refetch: fetchProject };
};

/**
 * Usage Examples in Components:
 * 
 * // In SkillsSection.tsx:
 * const { data: skills, loading, error } = useSkills();
 * 
 * if (loading) return <div>Loading skills...</div>;
 * if (error) return <div>Error loading skills</div>;
 * 
 * return (
 *   <div>
 *     {skills?.map(skill => (
 *       <div key={skill._id}>
 *         <span>{skill.icon}</span>
 *         <span style={{color: skill.color}}>{skill.name}</span>
 *       </div>
 *     ))}
 *   </div>
 * );
 * 
 * // In ExperienceSection.tsx:
 * const { data: experiences, loading } = useExperience();
 * 
 * return (
 *   <div>
 *     {experiences?.map(exp => (
 *       <div key={exp._id}>
 *         <h3>{exp.title} at {exp.company}</h3>
 *         <p>{exp.dateRange}</p>
 *         <ul>
 *           {exp.responsibilities.map((resp, idx) => (
 *             <li key={idx}>{resp}</li>
 *           ))}
 *         </ul>
 *       </div>
 *     ))}
 *   </div>
 * );
 */
