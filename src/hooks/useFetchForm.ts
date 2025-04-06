import { useEffect, useState } from "react";
import { fetchFormStructure } from "@/api/endpoints/forms";
import { FormSchema } from "@/types/form";

export const useFetchForm = () => {
  const [data, setData] = useState<FormSchema[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getForm = async () => {
      try {
        const response = await fetchFormStructure({ signal });
        setData(response);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
          return;
        }
        setError(err.message ?? "There is Fetch Error");
      } finally {
        setLoading(false);
      }
    };

    getForm();
    return () => {
      controller.abort();
    };
  }, []);

  return { data, loading, error };
};
