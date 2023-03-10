import { useState, useEffect } from 'react';

type UseFetchProps = {
  url: string;
  type?: string;
  payload?: Record<string, any>;
  headers?: any;
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
  const [xhr, setXhr] = useState<XMLHttpRequest | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const [label, setLabel] = useState(getRandom(5));
  console.log('in usefetch');
  const cancel = () => {
    if (xhr) {
      console.log('in cancel');
      xhr.abort();
      setStatus(3);
      setCancelled(true);
      delete ReuestsInProgress[label];
      setIsLoading(false);
      fetchData();
    }
  };
  const fetchData = () => {
    if (oneRequestAtATime && ReuestsInProgress[label]) {
      console.log(json, ReuestsInProgress[label]);
      //if (json !== ReuestsInProgress[label]) {
      cancel();
      //fetchData();
      // } else {
      //   return;
      // }
    } else {
      setIsLoading(true);
      setStatus(0);
      const xhr = new XMLHttpRequest();
      setXhr(xhr);
      ReuestsInProgress[label] = json;
      xhr.open(type, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      Object.entries(headers || {}).forEach(([key, value]: any) => xhr.setRequestHeader(key, value));
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            setData(responseData);
            setStatus(1);
            setError('');
          } else {
            setError('Failed to fetch');
            setStatus(2);
            setCancelled(false);
          }
          setIsLoading(false);
          delete ReuestsInProgress[label];
        }
      };
      xhr.send(JSON.stringify(payload));
    }
  };
  useEffect(() => {
    fetchData();
    console.log('use effect fetch');
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
