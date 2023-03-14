import { Counter } from '../Components/App/Counter/Counter';

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
};

export const userRouteConfig = {
  path: '/user/:id/age/:age',
  Component: Counter,
  allowedForRoles: [ROLES.admin],
  buildPath: (id: number, age: number) => {
    return '/user/' + id + '/age/' + age;
  },
};
