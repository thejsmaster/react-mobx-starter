import { counterRouteConfig } from '../App/Counter/Counter.Route';
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
}
export const addRoute = (route: RouteConfig) => {
  if (route.path && typeof route.Component === 'function' && Array.isArray(route.allowedForRoles))
    config.routes.push(route);
};

addRoute(counterRouteConfig);
