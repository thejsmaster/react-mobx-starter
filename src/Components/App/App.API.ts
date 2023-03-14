export const AppAPI = {
  getTodos: (count: number) => ({
    url: 'https://jsonplaceholder.typicode.com/todos/' + count,
    type: 'GET',
    
  }),
};
