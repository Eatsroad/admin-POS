import { ActionCreator } from '../Types';

export enum Types {
  INIT_LOGIN = '[Auth] Initiated Login',
  INIT_LOGOUT = '[Auth] Initiated Logout',
  LOGIN_SUCCESS = '[Auth] Login Succeeded', // set loggedin true
  LOGOUT_SUCCESS = '[Auth] Logout Succeeded', // set loggedin true
  AUTH_FIREBASE_EMAIL = '[Auth] Authenticate with firebase email',
  SET_UID = '[Auth] set uid',
}

export const initiateLogin: ActionCreator = (
  email: string,
  password: string
) => {
  return {
    type: Types.INIT_LOGIN,
    payload: {
      email: email,
      password: password,
    },
  };
};

export const loginSuccess: ActionCreator = () => {
  console.log('[AuthAction] generating loginSuccess Action');
  return {
    type: Types.LOGIN_SUCCESS,
    payload: null,
  };
};

export const initiateLogout: ActionCreator = () => {
  return {
    type: Types.INIT_LOGOUT,
    payload: null,
  };
};

export const logoutSuccess: ActionCreator = () => {
  return {
    type: Types.LOGOUT_SUCCESS,
    payload: null,
  };
};

export const authenticateWithFirebaseEmail: ActionCreator = (
  email: string,
  password: string
) => {
  return {
    type: Types.AUTH_FIREBASE_EMAIL,
    payload: { email: email, password: password },
  };
};

export const setUid: ActionCreator = (uid: string) => {
  return {
    type: Types.SET_UID,
    payload: {
      uid: uid,
    },
  };
};
