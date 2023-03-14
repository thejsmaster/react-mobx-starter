import React, { useEffect, useState } from 'react';

import './App.scss';
import CreateComponent from '../../CreateComponent';
import { useCache } from '../../utils/Cache';
import { Link } from 'wouter';
import CustomRouter from '../../Router/Router';
import { config } from '../../Router/addRoutes';
import { loggedInUserDetails } from './App State/users.state';
import { ROLES } from '../../Router/config';

export const App = CreateComponent(() => {
  const [routeConfig, setConfig] = useState(config);

  const loggedInUserRoles = loggedInUserDetails?.userInfo?._userRoles;

  useEffect(() => {
    loggedInUserDetails.set_userInfo({ username_: 'testuser', email_: 'test@test.com', _userRoles: [ROLES.admin] });
    // make an api call to set the user roles or the user info
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
