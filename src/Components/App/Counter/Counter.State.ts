import { makeAutoObservable } from 'mobx';
import { events } from '../../../events';

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

export class C_AppState {
  userInfo = { num_age: 3, email_: '' };
  num_count = 1;
  constructor() {
    makeAutoObservable(this);
  }

  get num_ageBy10() {
    console.log('age by 10');
    return this.userInfo?.num_age * 10;
  }
  set_count(v: number) {
    this.num_count = v;
    events.count.trigger('new count is' + this.num_count);
  }
  set_age(v: number) {
    this.userInfo.num_age = v;
  }
  increment_age() {
    console.log('incr age');
    this.set_age(this.userInfo.num_age + 1);
  }
  increment() {
    this.set_count(this.num_count + 1);
    this.increment_age();
  }
}
export const appState = new C_AppState();
// naming conventions

// Objects
const userItem = {};

// array
const _a = [1, 3, 4];

// string
const b_ = 'string';

// interface
interface IUsers {}

// class
class CUser {}
class C_User {}

// enum
enum EUser {}
enum E_User {}

// number
const num_age = 10;

// boolean
const isAdmin = true;

//type
type TUser = {};
type T_User = {};

// React props
// <Test PUser = {user} />
// <Test p_user = {user} />

// Function
function add_user() {}

// React Component
function NewComponent() {
  // title case
}

// HTML Guidelines:
// Holders or Containers (id: feature+"Holder") "users-holder"
// elements : users-holder-form
// element: users-holder-form-submit-button
// modifiers: users-holder-form-button-hover
