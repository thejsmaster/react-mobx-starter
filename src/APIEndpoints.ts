import { ApiParams } from './App/useCallAPI';

export const APIEndpoints = {
  counter: {
    get: (count: number): ApiParams => ({
      url: 'https://jsonplaceholder.typicode.com/todos/' + count,
      type: 'GET',
    }),
  },
};
