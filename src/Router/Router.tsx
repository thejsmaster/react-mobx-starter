import React, { useState } from 'react';
import { Link, Route } from 'wouter';
import { config, Config, RouteConfig } from './addRoutes';

interface Props {
  config: Config;
  loggedInUserRoles: string[];
}

export const CustomRouter: React.FC<Props> = ({ config, loggedInUserRoles }) => {
  const { routes } = config;
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // Check if the user is logged in
  // if (!isLoggedIn) {
  //   return <Link href="/login">Login</Link>;
  // }

  // Check if the user is authorized to access the route
  const isAuthorized = (allowedRoles: string[]) => {
    return allowedRoles.some((role) => loggedInUserRoles.includes(role));
  };

  return (
    <>
      {routes.map(({ path, Component, allowedForRoles }) => (
        <Route key={path} path={path}>
          {(params) =>
            isAuthorized(allowedForRoles) ? <Component {...params} /> : <Link href="/unauthorized">Unauthorized</Link>
          }
        </Route>
      ))}
    </>
  );
};

export default CustomRouter;
