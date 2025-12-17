// Central API base URL resolver for browser and SSR-safe contexts.
// Prefers an explicit VITE_API_URL (for Render backend), otherwise falls back to same-origin /api.
const origin = typeof window !== 'undefined' ? window.location.origin : '';
const fallback = origin ? `${origin.replace(/\/$/, '')}/api` : '/api';

export const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || fallback;

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;
