import { makeAutoObservable } from "mobx";

type UserInfo = {
  username?: string;
  email?: string;
  phone?: number;
  address?: UserAddress;
  age: number;
};

type UserAddress = {
  stree1: string;
  stree2: string;
  pincode: number;
  state: string;
  country: string;
};

export class AppState {
  userInfo = { age: 3, email: "" };
  validationErrors = {
    email: "",
  };
  count = 0;
  constructor() {
    makeAutoObservable(this);
  }

  get ageBy10() {
    console.log("age by 10");
    return this.userInfo.age * 10;
  }
  incrementAge() {
    console.log("incr age");
    this.userInfo.age++;
  }
  increment() {
    this.count++;
  }
}
export const appState = new AppState();