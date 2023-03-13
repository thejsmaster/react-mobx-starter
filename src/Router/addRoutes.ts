
import { counterRouteConfig, userRouteConfig } from './config';

export const config: Config = {
  routes: [],
};

export interface Config {
  routes: RouteConfig[];
}
export interface RouteConfig {
  path: string;
  Component: React.FunctionComponent<any>;
  allowedForRoles: string[];
  buildPath: Function;
}
export const addRoute = (route: RouteConfig) => {
  if (
    route.path &&
    typeof route.Component === 'function' &&
    Array.isArray(route.allowedForRoles) &&
    route.buildPath &&
    typeof route.buildPath === 'function'
  ) {
    config.routes.push(route);
  } else {
    throw Error('wrong route configuration');
  }
};
// use {navigate} from 'wouter' to navigate to a new route;

// navigate()

addRoute(counterRouteConfig);

addRoute(userRouteConfig);
