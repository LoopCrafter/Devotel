import { api } from "../client";

export const fetchFormStructure = ({ signal }: { signal?: AbortSignal }) =>
  api.get("/api/insurance/forms", { signal });

export const submitForm = (data: any) =>
  api.post("/api/insurance/forms/submit", data);
