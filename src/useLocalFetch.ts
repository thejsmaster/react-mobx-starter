import { useFetch as useXHR, UseFetchResponse } from 'use-fetch-react-xhr';

export const useLocalFetch = (props: any): UseFetchResponse => {
  let headers = { Authorization: 'Bearer Token' };
  if (props.headers) {
    headers = { ...props.headers };
  }
  return useXHR({ ...props, headers });
};
