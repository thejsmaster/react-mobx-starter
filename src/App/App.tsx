import React, { useEffect, useState } from 'react';

import './App.scss';
import CreateComponent from '../CreateComponent';

import { Link } from 'wouter';
import CustomRouter from '../Router/Router';
import { config } from '../Router/addRoutes';

export const App = CreateComponent(() => {
  const [routeConfig, setConfig] = useState(config);
  const [loggedInUserRoles, setLoggedInUserRoles] = useState<string[]>([]);

  useEffect(() => {
    setLoggedInUserRoles(['admin']);
  }, []);

  console.log(routeConfig);
  return (
    <div id="app">
      app
      <Link href="/counter">Counter</Link>
      <Link href="/user/10/age/30">User</Link>
      {loggedInUserRoles.length && <CustomRouter config={routeConfig} loggedInUserRoles={loggedInUserRoles} />}
    </div>
  );
});
export default App;
