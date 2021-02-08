import { Action } from '@redux/Types';
import { AuthAction, StoreAction, UIAction } from '@redux/actions';
import { firebaseInstance } from '@firebase';

export const AuthMiddleware = ({ dispatch }: any) => (next: any) => (
  action: Action
) => {
  next(action);

  if (AuthAction.Types.INIT_LOGIN === action.type) {
    console.log('[AuthMW] dispatching authwithfirebaseemail');
    const { email, password } = action.payload;
    dispatch(AuthAction.authenticateWithFirebaseEmail(email, password));
  }

  if (AuthAction.Types.AUTH_FIREBASE_EMAIL === action.type) {
    const { email, password } = action.payload;
    firebaseInstance
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  if (AuthAction.Types.LOGIN_SUCCESS === action.type) {
    dispatch(UIAction.setGlobalLoading(false));
    dispatch(StoreAction.loadStoreFirebase());
  }

  if (AuthAction.Types.LOGOUT_SUCCESS === action.type) {
    dispatch(UIAction.setGlobalLoading(false));
  }
};
