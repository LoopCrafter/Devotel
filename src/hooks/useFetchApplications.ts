import { useEffect, useState } from 'react';
import { fetchApplications } from '@/api/endpoints/applications';
import { ApplicationSchema } from '@/types/application';

export const useFetchApplications = () => {
  const [data, setData] = useState<ApplicationSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getApplications = async () => {
      try {
        const response = await fetchApplications({ signal });
        setData(response);
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
          return;
        }
        setError(err.message ?? 'There is Fetch Error');
      } finally {
        setLoading(false);
      }
    };

    getApplications();

    return () => {
      controller.abort();
    };
  }, []);

  return { data, loading, error };
};


