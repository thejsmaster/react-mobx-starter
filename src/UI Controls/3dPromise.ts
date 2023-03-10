import { useState, useEffect } from 'react';

type UseFetchProps = {
  url: string;
  type?: string;
  payload?: Record<string, any>;
  headers?: HeadersInit;
  oneRequestAtATime?: boolean;
};

type UseFetchResult = {
  cancel: () => void;
  status: number;
  isLoading: boolean;
  data: Record<string, any> | null;
  error: string | null;
  refetch: Function;
  cancelled: boolean;
};
const ReuestsInProgress: any = {};
const useFetch = (useFetchProps: UseFetchProps): UseFetchResult => {
  const { url, payload, headers, type = 'GET', oneRequestAtATime = true } = useFetchProps;
  const json = JSON.stringify(useFetchProps);
  const [status, setStatus] = useState(0);
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const [label, setLabel] = useState(getRandom(5));
  const cancel = () => {
    if (controller) {
      controller.abort();
      setStatus(3);
      setCancelled(true);
      delete ReuestsInProgress[label];
      setIsLoading(false);
    }
  };
  const fetchData = async () => {
    if (oneRequestAtATime && ReuestsInProgress[label]) {
      console.log(json, ReuestsInProgress[label]);
      //if (json !== ReuestsInProgress[label]) {
      cancel();
      fetchData();
      // } else {
      //   return;
      // }
    } else {
      setIsLoading(true);
      setStatus(0);
      try {
        const abortController = new AbortController();
        setController(abortController);
        ReuestsInProgress[label] = json;
        const response = await fetch(url, {
          method: type,
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const responseData = await response.json();
        
        setData(responseData);
        setStatus(1);
        setError('');
      } catch (e: any) {
        setError(e.message);
        setStatus(2);
        setCancelled(false);
      } finally {
        setIsLoading(false);
        delete ReuestsInProgress[label];
      }
    }
  };
  useEffect(() => {
    fetchData();
    return cancel;
  }, []);

  return { cancel, status, isLoading, data, error, refetch: fetchData, cancelled };
};

export default useFetch;
export const getRandom = (length: number) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
