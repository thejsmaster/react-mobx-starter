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
    this.listeners = this.listeners.filter((listener) => listener);
  }

  public unsubscribe(handler?: Function) {
    if (handler) {
      this.listeners = this.listeners.filter((listener) => listener !== handler);
      this.listeners = this.listeners.filter((listener) => listener);
    } else {
      this.listeners.pop();
    }
  }

  public trigger(...args: any[]) {
    this.log && console.log('event ' + this.name + ' triggered with Props: ', ...args);
    this.listeners.forEach((listener) => {
      listener && listener(...args);
    });
    this.listeners = this.listeners.filter((listener) => listener);
  }

  public clearAllListeners() {
    this.listeners = [];
  }
}

// usage
let e = new EventBus('test ');
e.subscribe(() => {});
e.trigger();
e.unsubscribe();
