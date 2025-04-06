
import { FormField } from '@/types/form';
import { FieldRenderer } from './FieldRenderer';

type Props = { field: FormField };

export const GroupField = ({ field }: Props) => {

    if (field.type !== 'group') return null;
    
  return (
    <fieldset className="mb-4 rounded-lg border border-gray-200 p-4">
      <legend className="px-2 font-semibold text-gray-800">{field.label}</legend>
      <div className="space-y-4">
        {field.fields.map((subField) => (
          <FieldRenderer key={subField.id} field={subField} />
        ))}
      </div>
    </fieldset>
  );
};