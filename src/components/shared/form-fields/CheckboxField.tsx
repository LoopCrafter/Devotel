import { useFormContext } from 'react-hook-form';
import { FormField } from '@/types/form';

type Props = { field: FormField };

export const CheckboxField = ({ field }: Props) => {
  const { register } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{field.label}</label>
      <div className="mt-2 space-y-2">
        {field.options?.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              value={option}
              {...register(field.id, { required: field.required && 'At least one option must be selected' })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};