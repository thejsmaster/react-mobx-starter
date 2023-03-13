import { useState, useEffect } from 'react';
import { createApiCallFunction, ApiCallResult } from './CallAPI';

export type ApiParams = {
  url: string;
  payload?: any;
  type?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  autoLoad?: boolean;
  callOnMount?: boolean;
};

export const useFetch = ({
  url,
  payload,
  headers,
  type,
  autoLoad = false,
  callOnMount = false,
}: ApiParams): {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: any;
  error: string;
  isCancelled: boolean;
  load: () => void;
  cancel: () => void;
} => {
  const [result, setResult] = useState<ApiCallResult>({
    status: 'idle',
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    isCancelled: false,
  });
  const [apiCall, setAPICall] = useState<any>(null);
  const [makeInitialCall, setMakeInitialCall] = useState(callOnMount);
  useEffect(() => {
    setAPICall(createApiCallFunction());
  }, []);
  useEffect(() => {
    if (apiCall) {
      const onChange = (apiResult: ApiCallResult) => setResult(apiResult);
      apiCall.onChange(onChange);
      if (makeInitialCall) {
        load();
      }
      return () => {
        apiCall?.removeListener(onChange);
        cancel();
      };
    }
  }, [apiCall]);
  useEffect(() => {
    if (apiCall && autoLoad) {
      cancel();
      load();

      return () => {
        result.isLoading && apiCall.cancel();
      };
    }
  }, [url, payload, headers, type]);

  const load = () => {
    if (apiCall) {
      cancel();
      apiCall.start(url, type, payload, headers);
    } else {
      setMakeInitialCall(true);
    }
  };

  const cancel = () => {
    result.isLoading && apiCall?.cancel();
  };

  return {
    isLoading: result.isLoading || false,
    isSuccess: result.isSuccess || false,
    isError: result.isError || false,
    data: result.data || null,
    error: result.error || '',
    isCancelled: result.isCancelled || false,
    load,
    cancel,
  };
};
