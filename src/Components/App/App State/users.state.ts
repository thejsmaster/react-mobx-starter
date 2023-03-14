import { makeAutoObservable } from 'mobx';
import { ROLES } from '../../../Router/config';
type TUserInfo = {
  username_: string;
  email_: string;
  _userRoles: string[] | [];
};
export class CLoggedInUserDetails {
  userInfo: TUserInfo = {
    username_: '',
    email_: '',
    _userRoles: [],
  };

  constructor() {
    makeAutoObservable(this);
  }
  set_userInfo(userInfo: TUserInfo) {
    this.userInfo = userInfo;
  }
}

export const loggedInUserDetails = new CLoggedInUserDetails();
