import { useFormContext } from 'react-hook-form';
import { FormField, FieldType, VisibilityCondition } from '@/types/form';
import { TextField } from './TextField';
import { SelectField } from './SelectField';
import { RadioField } from './RadioField';
import { GroupField } from './GroupField';
import { NumberField } from './NumberField';
import { CheckboxField } from './CheckboxField';

type Props = {
  field: FormField;
  dynamicOptions?: Record<string, string[]>;
  parentFields?: FormField[];
};

export const FieldRenderer = ({ field, dynamicOptions = {}, parentFields = [] }: Props) => {
  const { watch } = useFormContext();

  const isVisible = () => {
    if (!field.visibility) return true;
    const { dependsOn, condition, value } = field.visibility;
    const depValue = watch(dependsOn);

    if (typeof condition === 'function') return condition(depValue);
    switch (condition) {
      case VisibilityCondition.Equals:
        return depValue === value;
      case VisibilityCondition.NotEquals:
        return depValue !== value;
      case VisibilityCondition.Exists:
        return !!depValue;
      default:
        return true;
    }
  };

  if (!isVisible()) return null;

  if (field.dynamicOptions) {
    const dependsOnExists = parentFields.some((f) => f.id === field.dynamicOptions?.dependsOn);
    if (!dependsOnExists) {
      console.warn(
        `⚠️ Field "${field.id}" depends on "${field.dynamicOptions.dependsOn}", but it is not found in the current form context.`
      );
      return 
    }
  }

  const selectOptions = field.dynamicOptions ? dynamicOptions[field.id] || [] : field.options || [];

  switch (field.type) {
    case FieldType.Text:
    case FieldType.Date:
      return <TextField field={field} />;
    case FieldType.Select:
      return <SelectField field={field} options={selectOptions} />;
    case FieldType.Radio:
      return <RadioField field={field} />;
    case FieldType.Group:
      return <GroupField field={field} dynamicOptions={dynamicOptions} />;
    case FieldType.Number:
      return <NumberField field={field} />;
    case FieldType.Checkbox:
      return <CheckboxField field={field} />;
    default:
      return null;
  }
};