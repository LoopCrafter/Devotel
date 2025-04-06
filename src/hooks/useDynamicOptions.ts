import { useState, useEffect } from 'react';
import { FormField, FieldType } from '@/types/form';
import { api } from '@/api/client';
import { debounce } from 'lodash';

export const useDynamicOptions = (fields: FormField[], watchedValues: Record<string, any>) => {
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, string[]>>({});

  const fetchOptions = async (field: FormField) => {
    const dyn = field.dynamicOptions;
    if (!dyn) return;

    const triggerValue = watchedValues[dyn.dependsOn];
 
    if (!triggerValue) {
      setDynamicOptions((prev) => {
        const newOptions = { ...prev };
        delete newOptions[field.id];
        return newOptions;
      });
      return;
    }

    try {
      const res = await api.get(`${dyn.endpoint}?${dyn.dependsOn}=${triggerValue}`);
      const options = res.states || [];
      console.log(`Fetched options for ${field.id}:`, options);
      setDynamicOptions((prev) => ({
        ...prev,
        [field.id]: options,
      }));
    } catch (err) {
      console.error(`Failed to fetch for field:`, err);
    }
  };

  const debouncedFetchOptions = debounce(fetchOptions, 300);

  useEffect(() => {
    const flatFields = fields.flatMap((f) => (f.type === FieldType.Group ? f.fields ?? [] : f));
    flatFields.forEach((field) => {
      if (field.dynamicOptions) {
        debouncedFetchOptions(field);
      }
    });

    return () => {
      debouncedFetchOptions.cancel();
    };
  }, [
    fields,
    ...fields.flatMap((f) => (f.type === FieldType.Group ? f.fields ?? [] : f))
      .filter((f) => f.dynamicOptions)
      .map((f) => watchedValues[f.dynamicOptions!.dependsOn]),
  ]);

  return dynamicOptions;
};