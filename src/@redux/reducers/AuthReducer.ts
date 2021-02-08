import { AuthAction } from '../actions';
import { Action } from '../Types';

export interface Auth {
  loggedin: false;
  uid: string;
}

const initialState: Auth = {
  loggedin: false,
  uid: '',
};

const AuthReducer = (state = initialState, action: Action) => {
  // console.log('[AuthReducer] invoked with type: ' + action.type);
  switch (action.type) {
    case AuthAction.Types.LOGIN_SUCCESS:
      console.log('loggedin true');
      return {
        ...state,
        loggedin: true,
      };
    case AuthAction.Types.LOGOUT_SUCCESS:
      console.log('loggedin false');
      return {
        ...state,
        loggedin: false,
      };
    case AuthAction.Types.SET_UID:
      return {
        ...state,
        uid: action.payload.uid,
      };

    default:
      return state;
  }
};

export default AuthReducer;
