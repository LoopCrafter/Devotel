import { useFormContext } from 'react-hook-form';
import { FormField } from '@/types/form';
import { RegisterOptions } from 'react-hook-form';

type Props = { field: FormField };

export const TextField = ({ field }: Props) => {
  const { register, formState: { errors } } = useFormContext();

  const validationRules: RegisterOptions = {
    ...(field.required && { required: 'This field is required' }),
    ...(field.validation?.pattern && {
      pattern: {
        value: new RegExp(field.validation.pattern),
        message: 'Invalid format',
      },
    }),
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{field.label}</label>
      <input
        {...register(field.id, validationRules)}
        type={field.type}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm  p-1 py-2"
      />
      {errors[field.id] && (
        <p className="mt-1 text-sm text-red-600">{errors[field.id]?.message as string}</p>
      )}
    </div>
  );
};