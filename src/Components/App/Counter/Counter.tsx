import { Button, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CreateComponent from '../../../CreateComponent';
import { appState } from './Counter.State';
import { useLocation } from 'wouter';
import { userRouteConfig } from '../../../Router/config';
import { usePathnames } from '../../../Router/usePathnames';
import counterAPIEndpoint from '../../../ApiEndpoints/CounterApiEndpoints';

import { useCache } from '../../../utils/Cache';
import { useLocalFetch } from '../../../useLocalFetch';

export const Counter = CreateComponent(() => {
  const [, navigate] = useLocation();
  const [, id, , age] = usePathnames();
  console.log(id, age);
  const countCache = useCache({ count: appState.num_count });

  const countAPI = useLocalFetch(counterAPIEndpoint.get(appState.num_count));
  console.log('request', countAPI.request);
  // const { data, error, isLoading, isSuccess, isError, isCancelled, load, cancel } = CountAPI;
  useEffect(() => {
    if (id && age) {
      appState.num_count != parseInt(id) && appState.set_count(parseInt(id));
      appState.userInfo.num_age != parseInt(age) && appState.set_age(parseInt(age) / 10);
    }
  }, [id, age]);
  useEffect(() => {
    navigate(userRouteConfig.buildPath(appState.num_count, appState.num_ageBy10));
  }, [appState.num_count, appState.num_ageBy10]);
  useEffect(() => {
    countAPI.load();
    //counterRouteConfig.navigate();
  }, [appState.num_count]);
  useEffect(() => {
    console.log(countAPI.error);
  }, [countAPI.error]);
  useEffect(() => {
    console.log("it's loading");
  }, [countAPI.isLoading]);
  useEffect(() => {
    console.log('age changed');
  }, [appState.num_ageBy10]);

  const cacheCount = () => {
    countCache.setState({ count: appState.num_count });
  };

  return (
    <div>
      <Typography variant="h4" component="h4">
        Vite : {id} param from url
      </Typography>
      <button onClick={() => navigate(userRouteConfig.buildPath(2, 20))}>Navigate to user/1</button>
      <div className="card">
        {' '}
        <Button onClick={() => appState.increment()} variant="outlined">
          {' '}
          count: {appState.num_count}
        </Button>
        <Button onClick={() => appState.increment_age()} variant="outlined">
          count: {appState.num_count}
          age: {appState.userInfo.num_age}
        </Button>
        Age by 10: <div>{appState.num_ageBy10}</div>
      </div>
      <Button onClick={() => countAPI.cancel()}>Cancel</Button>
      <Button onClick={cacheCount}> Cache Count: {countCache?.state?.count}</Button>
      count:
      {countAPI.isLoading && <CircularProgress />}
      {countAPI.isCancelled && !countAPI.isLoading && <div>it's cancelled</div>}
      {countAPI.isSuccess && !countAPI.isLoading && <div>{countAPI.data.title}</div>}
      {countAPI.error && <div style={{ color: 'red' }}>{countAPI.error?.message}</div>}
    </div>
  );
});
