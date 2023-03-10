import React from 'react';
import { appState } from './State/App.State';

import './App.scss';
import { Button, CircularProgress, Typography } from '@mui/material';
import CreateComponent from '../CreateComponent';
import useFetch from '../3dPromise';
import { useEffect } from 'react';
import useCallAPI from './useCallAPI';

export const App = CreateComponent(() => {
  const { data, error, isLoading, isSuccess, isError, isCancelled, load, cancel } = useCallAPI({
    url: 'https://jsonplaceholder.typicode.com/todos/' + appState.count,
    type: 'GET',
  });
  useEffect(() => {
    console.log(data);
    console.log('data changed');
  }, [data]);
  useEffect(() => {
    isLoading && cancel();
    load();
    console.log('count changed');
  }, [appState.count]);
  useEffect(() => {
    console.log('age changed');
  }, [appState.ageBy10]);
  console.log('reload');
  return (
    <div className="App">
      <Typography variant="h4" component="h4">
        Vite
      </Typography>
      <div className="card">
        {' '}
        <Button onClick={() => appState.increment()} variant="outlined">
          {' '}
          count: {appState.count}
        </Button>
        <Button onClick={() => appState.incrementAge()} variant="outlined">
          count: {appState.count}
          age: {appState.userInfo.age}
        </Button>
        Age by 10: <div>{appState.ageBy10}</div>
      </div>
      <Button onClick={() => cancel()}>Cancel</Button>
      {isLoading && <CircularProgress />}
      {isCancelled && <div>it's cancelled</div>}
      {isSuccess && !isLoading && <div>{data.title}</div>}
      {error && <div>error occured</div>}
    </div>
  );
});
export default App;
