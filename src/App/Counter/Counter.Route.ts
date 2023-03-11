import { Counter } from './Counter';

export const counterRouteConfig = { path: '/counter', Component: Counter, allowedForRoles: ['admin'] };
