import { useState } from 'react';

interface CachedItem {
  [key: string]: any;
}

export class Cache {
  // copiesList: { [key: string]: CachedItem };
  state: CachedItem | null = null;

  constructor(initialState?: CachedItem) {
    //   this.copiesList = {};
    if (initialState) {
      this.state = JSON.parse(JSON.stringify(initialState));
    }
  }

  setState(newState: CachedItem): void {
    this.state = JSON.parse(JSON.stringify(newState));
  }

  reset() {
    this.state = null;
  }
  // copy(): CachedItem {
  //   const copy = JSON.parse(JSON.stringify(this.stateCopy));
  //   this.setRenderCount();
  //   return copy;
  // }

  // saveCopy(label?: string): void {
  //   const key = label ?? Math.random().toString(36).substring(7);
  //   this.copiesList[key] = JSON.parse(JSON.stringify(this.state));
  //   this.setRenderCount();
  // }

  // deleteCopy(label?: string): void {
  //   const keys = Object.keys(this.copiesList);
  //   const keyToDelete = label ?? keys[keys.length - 1];
  //   if (this.copiesList[keyToDelete]) {
  //     delete this.copiesList[keyToDelete];
  //     this.setRenderCount();
  //   }
  // }

  // getCopies(): { [key: string]: CachedItem } {
  //   return this.copiesList;
  // }

  // getCopy(label?: string): CachedItem | undefined {
  //   const keys = Object.keys(this.copiesList);
  //   const keyToGet = label ?? keys[keys.length - 1];
  //   return this.copiesList[keyToGet];
  // }

  setRenderCount: () => void = () => {};
}

export const useCache = (initialState: CachedItem): Cache => {
  const [renderCount, setRenderCount] = useState(0);

  const cache = new Cache(initialState);

  cache.setRenderCount = () => setRenderCount(renderCount + 1);

  return cache;
};

export default useCache;
