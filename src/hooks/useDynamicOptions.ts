import { useState, useEffect } from 'react';
import { FormField } from '@/types/form';
import { api } from '@/api/client';

export const useDynamicOptions = (fields: FormField[], watchedValues: Record<string, any>) => {
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const fetchOptions = async (field: FormField) => {
      if (!field.dynamicOptions) return;
      const triggerValue = watchedValues[field.dynamicOptions.dependsOn];
      if (!triggerValue) return;

      try {
        const response = await api.get(`${field.dynamicOptions.endpoint}?country=${triggerValue}`);
        setDynamicOptions((prev) => ({
          ...prev,
          [field.id]: response.states || [],
        }));
      } catch (error) {
        console.error(`Error fetching options for ${field.id}:`, error);
      }
    };

    fields.forEach((field) => {
      if (field.type === 'group') {
        field.fields.forEach(fetchOptions);
      } else {
        fetchOptions(field);
      }
    });
  }, [fields, watchedValues]);

  return dynamicOptions;
};