export type Person =  {
    id: string;
    "Full Name": string;
    Age: number;
    Gender: string;
    "Insurance Type": string;
    City: string;
}

export type ApplicationSchema = {
    columns: string[];
    data: Person[];
}
