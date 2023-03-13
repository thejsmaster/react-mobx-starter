import { Counter } from '../Counter/Counter';

export const ROLES = {
  admin: 'admin',
  user: 'user',
};
export const counterRouteConfig = {
  path: '/counter',
  Component: Counter,
  allowedForRoles: [ROLES.admin],
  buildPath: () => {
    return '/counter';
  },
  navigate(replace: boolean = false) {
    replace ? history.replaceState(null, this.buildPath()) : history.pushState(null, this.buildPath());
  },
};

export const userRouteConfig = {
  path: '/user/:id/age/:age',
  Component: Counter,
  allowedForRoles: [ROLES.admin],
  buildPath: (id: number, age: number) => {
    return '/user/' + id + '/age/' + age;
  },
};
