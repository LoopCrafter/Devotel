export enum VisibilityCondition {
  Equals = "equals",
  NotEquals = "notEquals",
  Exists = "exists",
}

export enum FieldType {
    Text = 'text',
    Date = 'date',
    Select = 'select',
    Radio = 'radio',
    Group = 'group',
    Number = 'number',
    Checkbox = 'checkbox',
  }

export type FormFieldBase = {
  id: string;
  label: string;
  type: "text" | "date" | "select" | "radio" | "group" | "number" | "checkbox";
  required?: boolean;
  options?: string[];
  visibility?: {
    dependsOn: string;
    condition: VisibilityCondition | ((value: any) => boolean);
    value?: string;
  };
  dynamicOptions?: {
    dependsOn: string;
    endpoint: string;
    method?: "GET" | "POST";
  };
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
};

export type GroupField = FormFieldBase & {
  type: "group";
  fields: FormField[];
};

export type SimpleField = FormFieldBase & {
  type: Exclude<FormFieldBase["type"], "group">;
};

export type FormField = GroupField | SimpleField;

export type FormSchema = {
  formId: string;
  title: string;
  fields: FormField[];
};

export type FormProps = { field: FormField };
