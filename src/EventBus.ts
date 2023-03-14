export class EventBus {
  private listeners: Function[] = [];
  name = '';
  log = false;
  constructor(name: string = '', log: boolean = false) {
    this.name = name;
    this.log = log;
  }

  public subscribe(handler: Function) {
    this.listeners.push(handler);
  }

  public unsubscribe(handler: Function) {
    this.listeners = this.listeners.filter((listener) => listener !== handler);
  }

  public trigger(...args: any[]) {
    this.log && console.log('event ' + this.name + ' triggered with Props: ', ...args);
    this.listeners.forEach((listener) => {
      listener && listener(...args);
    });
  }
}

// usage
