import { useEffect, useState } from "react";
import { makeAutoObservable, makeObservable, observable, observe } from "mobx";

export function useSubscribe<T>(objects: T[]): T[] {
  const [state, setState] = useState(0);
  console.log("in observable");
  useEffect(() => {
    const cancels = objects.map((object: any) => {
      return observe(object, () => {
        setState(state + 1);
        console.log("changed");
      });
    });
    return () => {
      console.log("cancelled");
      cancels.length && cancels.forEach((cancel: any) => cancel());
    };
  }, [state]);
  return objects;
}

interface ClassifyResult {
  getters: string[];
  properties: string[];
  methods: string[];
  setters: string[];
}

export function getKeys(obj: Record<string, any>): ClassifyResult {
  const getters: string[] = [];
  const properties: string[] = [];
  const methods: string[] = [];
  const setters: string[] = [];

  for (const key of Object.keys(obj)) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor?.get) {
      getters.push(key);
    } else if (descriptor?.set) {
      setters.push(key);
    } else if (typeof obj[key] === "function") {
      methods.push(key);
    } else {
      properties.push(key);
    }
  }

  return { getters, properties, methods, setters };
}

export function createState<T>(obj: T): T {
  const keysToSpecify: any = {};
  const { getters, properties, methods, setters } = getKeys(obj as object);
  properties.forEach((p: any) => {
    keysToSpecify[p] = "observable";
  });
  getters.forEach((getter: any) => {
    keysToSpecify[getter] = "computed";
  });

  methods.forEach((m: any) => {
    keysToSpecify[m] = "action";
  });
  console.log(obj, keysToSpecify, getters, properties, methods, setters);
  //@ts-ignore
  return makeAutoObservable(obj);
}
