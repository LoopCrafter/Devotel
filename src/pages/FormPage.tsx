import { InsuranceSelector } from "@/components/shared";
import { DynamicForm } from "@/components/shared/dynamicForm";
import { useFetchForm } from "@/hooks/useFetchForm";
import { FormSchema } from "@/types";
import { FC, useMemo, useState } from "react";

export const FormPage: FC = () => {
  const [selectedInsurance, setSelectedInsurance] = useState<
    FormSchema | undefined
  >(undefined);
  const { data,loading,error } = useFetchForm();
  const insuranceOptions = useMemo(
    () => data?.map((el) => ({ title: el.title, id: el.formId })),
    [data]
  );

  const handleSelectTab = (id: string) => {
    const selectedTab = data?.find((el) => el.formId === id);
    if (selectedTab) {
      setSelectedInsurance(selectedTab);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <InsuranceSelector
        options={insuranceOptions || []}
        onSelect={handleSelectTab}
      />
      {!!selectedInsurance && <DynamicForm schema={selectedInsurance} />}
    </div>
  );
};
