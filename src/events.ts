import { EventBus } from './EventBus';

export const events = {
  count: new EventBus('count event', true),
};
