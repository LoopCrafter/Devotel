import { FormSchema } from '@/types/form';
import { useForm, FormProvider } from 'react-hook-form';
import { useDynamicOptions } from '@/hooks/useDynamicOptions';
import { FieldRenderer } from '../form-fields/FieldRenderer';

type Props = { schema: FormSchema };

export const DynamicForm = ({ schema }: Props) => {
  const methods = useForm();
  const { handleSubmit, watch } = methods;
  const watchedValues = watch();
  const dynamicOptions = useDynamicOptions(schema.fields, watchedValues);

  const onSubmit = async (data: any) => {
    try {
      console.log(`Sending Form ${schema.formId}`, data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form!');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
        <div className="space-y-4">
          {schema.fields.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              dynamicOptions={dynamicOptions}
              parentFields={schema.fields}
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
};