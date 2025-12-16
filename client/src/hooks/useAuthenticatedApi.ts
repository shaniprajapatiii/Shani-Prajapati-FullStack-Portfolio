import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const useAuthenticatedApi = () => {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleApiError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An error occurred');
    }
  };

  // CREATE - POST
  const create = async <T,>(
    endpoint: string,
    data: Record<string, unknown>
  ): Promise<ApiResponse<T> | null> => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      handleApiError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // READ - GET by ID
  const getById = async <T,>(endpoint: string): Promise<T | null> => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      handleApiError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // UPDATE - PATCH
  const update = async <T,>(
    endpoint: string,
    data: Record<string, unknown>
  ): Promise<ApiResponse<T> | null> => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      handleApiError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const remove = async (endpoint: string): Promise<boolean> => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete');
      }

      return true;
    } catch (err) {
      handleApiError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    getById,
    update,
    remove,
    error,
    loading,
    setError,
  };
};
