import { useFormContext } from 'react-hook-form';
import { FormField } from '@/types/form';

type Props = { field: FormField };

export const NumberField = ({ field }: Props) => {
  const { register } = useFormContext();
  const validationRules = {
    required: field.required && 'This field is required',
    min: field.validation?.min && { value: field.validation.min, message: `Minimum value is ${field.validation.min}` },
    max: field.validation?.max && { value: field.validation.max, message: `Maximum value is ${field.validation.max}` },
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{field.label}</label>
      <input
        type="number"
        {...register(field.id, validationRules)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1 py-2"
      />
    </div>
  );
};