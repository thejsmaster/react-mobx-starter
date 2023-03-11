import React, { useState } from 'react';

import './App.scss';
import CreateComponent from '../CreateComponent';

import { Link } from 'wouter';
import CustomRouter from '../Router/Router';
import { config } from '../Router/addRoutes';

export const App = CreateComponent(() => {
  const [routeConfig, setConfig] = useState(config);
  const [loggedInUserRoles, setLoggedInUserRoles] = useState(['admin']);
  console.log(routeConfig);
  return (
    <div id="app">
      app
      <Link href="/counter">Counter</Link>
      <CustomRouter config={routeConfig} loggedInUserRoles={loggedInUserRoles} />
    </div>
  );
});
export default App;
