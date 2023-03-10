import { useState, useEffect } from 'react';
import { createApiCallFunction, ApiCallResult } from './CallAPI';

type ApiParams = {
  url: string;
  payload?: any;
  type?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
};

const useApiCall = ({
  url,
  payload,
  headers,
  type,
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
  useEffect(() => {
    setAPICall(createApiCallFunction());
  }, []);

  useEffect(() => {
    if (apiCall) {
      apiCall.start(url, type, payload, headers);
      const onChange = (apiResult: ApiCallResult) => setResult(apiResult);
      apiCall.onChange(onChange);
      console.log('usefeect out');

      return () => {
        console.log('use effect code cleaning');
        apiCall.cancel();
        apiCall.removeListener(onChange);
      };
    }
  }, [url, payload, headers, type]);

  const load = () => {
    apiCall?.start(url, type, payload, headers);
  };

  const cancel = () => {
    apiCall?.cancel();
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

export default useApiCall;
