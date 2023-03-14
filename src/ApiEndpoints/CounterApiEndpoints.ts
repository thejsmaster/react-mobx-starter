import { ApiParams } from 'use-fetch-react-xhr';

export default {
  get: (count: number): ApiParams => ({
    url: 'https://jsonplaceholder.typicode.com/todos/' + count,
    type: 'GET',
  }),
};
