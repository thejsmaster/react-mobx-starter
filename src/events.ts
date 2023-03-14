import { EventBus } from './utils/EventBus';

export const events = {
  count: new EventBus('count event', true),
};
