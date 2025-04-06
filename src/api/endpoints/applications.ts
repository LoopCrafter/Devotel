import { api } from "../client";

export const fetchApplications = ({ signal }: { signal?: AbortSignal } = {}) =>
  api.get("/api/insurance/forms/submissions", { signal });
