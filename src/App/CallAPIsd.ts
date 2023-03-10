type ApiCallOnChange = (result: ApiCallResult) => void;

export type ApiCallResult = {
  status: 'idle' | 'loading' | 'success' | 'error' | 'cancelled';
  data?: any;
  error?: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isCancelled: boolean;
};

type ApiCallOptions = {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
};

type StartFunction = (url: string, payload?: any, type?: string, headers?: Record<string, string>) => void;

export const createApiCallFunction = ({ onSuccess, onError, onCancel }: ApiCallOptions) => {
  let listeners: ApiCallOnChange[] = [];
  let request: XMLHttpRequest | undefined | any;
  let isCancelled = false;

  const notifyListeners = (result: ApiCallResult) => {
    listeners.forEach((listener) => {
      listener(result);
    });
  };

  const start: StartFunction = (url, payload, type = 'GET', headers = {}) => {
    if (request) {
      request.abort();
      isCancelled = true;
      onCancel && onCancel();
      notifyListeners({
        status: 'cancelled',
        isLoading: false,
        isSuccess: false,
        isError: false,
        isCancelled: true,
      });
    }

    isCancelled = false;
    request = new XMLHttpRequest();
    request.open(type, url, true);

    if (headers) {
      for (const header in headers) {
        request.setRequestHeader(header, headers[header]);
      }
    }

    request.onreadystatechange = () => {
      if (isCancelled) {
        return;
      }

      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          const response = JSON.parse(request.responseText);
          onSuccess && onSuccess(response);
          notifyListeners({
            status: 'success',
            data: response,
            isLoading: false,
            isSuccess: true,
            isError: false,
            isCancelled: false,
          });
        } else {
          const error = {
            status: request.status,
            message: request.statusText,
          };
          onError && onError(error);
          notifyListeners({
            status: 'error',
            error,
            isLoading: false,
            isSuccess: false,
            isError: true,
            isCancelled: false,
          });
        }
      }
    };

    request.send(payload);
    notifyListeners({
      status: 'loading',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isCancelled: false,
    });
  };

  const cancel = () => {
    if (request) {
      request.abort();
      isCancelled = true;
      onCancel && onCancel();
      notifyListeners({
        status: 'cancelled',
        isLoading: false,
        isSuccess: false,
        isError: false,
        isCancelled: true,
      });
    }
  };

  const removeListener = (listener: ApiCallOnChange) => {
    listeners = listeners.filter((l) => l !== listener);
  };

  const onChange = (listener: ApiCallOnChange) => {
    listeners.push(listener);
  };

  return {
    onChange,
    start,
    cancel,
    removeListener,
  };
};
