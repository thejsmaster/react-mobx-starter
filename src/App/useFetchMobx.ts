import { makeObservable, observable, action } from 'mobx';
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

class FetchState {
  @observable status = 0;
  @observable data: Record<string, any> | null = null;
  @observable error: string | null = null;
  @observable isLoading = false;
  @observable xhr: XMLHttpRequest | null = null;
  @observable cancelled = false;
  @observable label = getRandom(5);

  @action cancel = () => {
    if (this.xhr) {
      console.log('in cancel');
      this.xhr.abort();
      this.status = 3;
      this.cancelled = true;
      delete ReuestsInProgress[this.label];
      this.isLoading = false;
      this.fetchData();
    }
  };

  @action fetchData = () => {
    if (this.props.oneRequestAtATime && ReuestsInProgress[this.label]) {
      console.log(this.json, ReuestsInProgress[this.label]);
      //if (this.json !== ReuestsInProgress[this.label]) {
      this.cancel();
      //this.fetchData();
      // } else {
      //   return;
      // }
    } else {
      this.isLoading = true;
      this.status = 0;
      const xhr = new XMLHttpRequest();
      this.xhr = xhr;
      ReuestsInProgress[this.label] = this.json;
      xhr.open(this.props.type || 'GET', this.props.url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      Object.entries(this.props.headers || {}).forEach(([key, value]: any) => xhr.setRequestHeader(key, value));
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            this.data = responseData;
            this.status = 1;
            this.error = '';
          } else {
            this.error = 'Failed to fetch';
            this.status = 2;
            this.cancelled = false;
          }
          this.isLoading = false;
          delete ReuestsInProgress[this.label];
        }
      };
      xhr.send(JSON.stringify(this.props.payload));
    }
  };

  constructor(private props: UseFetchProps) {
    makeObservable(this);
  }

  get json() {
    return JSON.stringify(this.props);
  }
}

const useFetch = (useFetchProps: UseFetchProps): UseFetchResult => {
  const state = new FetchState(useFetchProps);

  useEffect(() => {
    state.fetchData();
    console.log('use effect fetch');
    return state.cancel;
  }, []);

  return {
    cancel: state.cancel,
    status: state.status,
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
    refetch: state.fetchData,
    cancelled: state.cancelled,
  };
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
