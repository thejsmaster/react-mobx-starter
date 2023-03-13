import { Button, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CreateComponent from '../CreateComponent';
import { appState } from '../App/State/App.State';
import { useFetch } from 'use-fetch-react-xhr';
import { useLocation, useRoute } from 'wouter';
import { counterRouteConfig, userRouteConfig } from '../Router/config';
import { usePathnames } from '../Router/usePathnames';
import { APIEndpoints } from '../APIEndpoints';

export const Counter = CreateComponent(() => {
  const [, navigate] = useLocation();
  const [, id, , age] = usePathnames();
  console.log(id, age);

  const countAPI = useFetch(APIEndpoints.counter.get(appState.count));
  // const { data, error, isLoading, isSuccess, isError, isCancelled, load, cancel } = CountAPI;
  useEffect(() => {
    if (id && age) {
      appState.count != parseInt(id) && appState.setCount(parseInt(id));
      appState.userInfo.age != parseInt(age) && appState.setAge(parseInt(age) / 10);
    }
  }, [id, age]);
  useEffect(() => {
    navigate(userRouteConfig.buildPath(appState.count, appState.ageBy10));
  }, [appState.count, appState.ageBy10]);
  useEffect(() => {
    countAPI.load();
    //counterRouteConfig.navigate();
  }, [appState.count]);
  useEffect(() => {
    console.log("it's loading");
  }, [countAPI.isLoading]);
  useEffect(() => {
    console.log('age changed');
  }, [appState.ageBy10]);
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
          count: {appState.count}
        </Button>
        <Button onClick={() => appState.incrementAge()} variant="outlined">
          count: {appState.count}
          age: {appState.userInfo.age}
        </Button>
        Age by 10: <div>{appState.ageBy10}</div>
      </div>
      <Button onClick={() => countAPI.cancel()}>Cancel</Button>
      {countAPI.isLoading && <CircularProgress />}
      {countAPI.isCancelled && !countAPI.isLoading && <div>it's cancelled</div>}
      {countAPI.isSuccess && !countAPI.isLoading && <div>{countAPI.data.title}</div>}
      {countAPI.error && <div>error occured</div>}
    </div>
  );
});
