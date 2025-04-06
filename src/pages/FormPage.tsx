import { InsuranceSelector } from "@/components/shared";
import { DynamicForm } from "@/components/shared/dynamicForm";
import { useFetchForm } from "@/hooks/useFetchForm";
import { FC, useMemo } from "react";

export const FormPage: FC = () => {
  const { data } = useFetchForm();
  const insuranceOptions = useMemo(() => data?.map(el => ({title:el.title, id:el.formId})), [data])

  return (
    <div>
      <InsuranceSelector options={insuranceOptions || []} onSelect={()=>{}} />
      {data?.map((form) => {
        return <DynamicForm key={form.formId} schema={form} />;
      })}
    </div>
  );
};
