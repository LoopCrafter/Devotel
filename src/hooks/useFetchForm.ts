import { useEffect, useState } from 'react';
import { fetchFormStructure } from '@/api/endpoints/forms';
import { FormSchema } from '@/types/form';

export const useFetchForm = () => {
  const [data, setData] = useState<FormSchema[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getForm = async () => {
      try {
        const response = await fetchFormStructure();
        setData(response);
      } catch (err: any) {
        setError(err.message ?? 'There is Fetch Error');
      } finally {
        setLoading(false);
      }
    };

    getForm();
  }, []);

  return { data, loading, error };
};


