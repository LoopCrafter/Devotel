type InsuranceOption = {
    id: string;
    title: string;
  };
  
  type Props = {
    options: InsuranceOption[];
    onSelect: (formId: string) => void;
  };
  

  export type {InsuranceOption, Props}