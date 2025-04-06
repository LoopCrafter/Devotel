import { useFormContext } from 'react-hook-form';
import { FormField } from '@/types/form';
import { RegisterOptions } from 'react-hook-form';

type Props = { field: FormField };

export const RadioField = ({ field }: Props) => {
  const { register, formState: { errors } } = useFormContext();

  const validationRules: RegisterOptions = {
    ...(field.required && { required: 'This field is required' }),
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{field.label}</label>
      <div className="mt-2 flex gap-4">
        {field.options?.map((opt) => (
          <label key={opt} className="flex items-center">
            <input
              type="radio"
              value={opt}
              {...register(field.id, validationRules)}
              className={`mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 ${
                errors[field.id] ? 'border-red-500' : ''
              }`}
            />
            <span className="text-sm text-gray-600">{opt}</span>
          </label>
        ))}
      </div>
      {errors[field.id] && (
        <p className="mt-1 text-sm text-red-600">{errors[field.id]?.message as string}</p>
      )}
    </div>
  );
};