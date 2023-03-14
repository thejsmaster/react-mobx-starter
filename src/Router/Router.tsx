import React, { useState } from 'react';
import { Link, Route } from 'wouter';
import { Unauthorized } from '../Components/UnAuthorized';
import { config, Config, RouteConfig } from './addRoutes';

interface Props {
  config: Config;
  loggedInUserRoles: string[];
}

export const CustomRouter: React.FC<Props> = ({ config, loggedInUserRoles }) => {
  const { routes } = config;
  const isAuthorized = (allowedRoles: string[]) => {
    return allowedRoles.some((role) => loggedInUserRoles.includes(role));
  };
  return (
    <>
      {routes.map(({ path, Component, allowedForRoles }) => (
        <Route key={path} path={path}>
          {(params) => (isAuthorized(allowedForRoles) ? <Component {...params} /> : <Unauthorized />)}
        </Route>
      ))}
    </>
  );
};

export default CustomRouter;
