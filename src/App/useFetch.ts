import { useState, useEffect } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type UseFetchResponse<Data> = {
  data: Data | null;
  error: Error | null;
  isLoading: boolean;
  cancel: () => void;
};

function useFetch<Data = unknown>(
  url: string,
  method: HttpMethod = "GET",
  payload: Record<string, unknown> | null = null
): UseFetchResponse<Data> {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController | null>(null);

  useEffect(() => {
    const newController = new AbortController();
    setController(newController);

    const fetchData = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: payload ? JSON.stringify(payload) : undefined,
          signal: newController.signal,
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const json = await response.json();
        setData(json);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      newController.abort();
    };
  }, [url, method, payload]);

  const cancel = (): void => {
    if (controller) {
      controller.abort();
      setIsLoading(false);
      setError(new Error("Request cancelled"));
    }
  };

  return { data, error, isLoading, cancel };
}
