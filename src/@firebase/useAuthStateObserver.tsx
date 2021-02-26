import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthAction } from '@redux/actions';
import firebase from 'firebase';

function useAuthStateObserver() {
  const dispatch = useDispatch();
  useEffect(() => {
    let unregisterAuthObserver: any;
    unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if (!!user) {
        dispatch(AuthAction.setUid(user.uid));
        dispatch(AuthAction.loginSuccess());
      } else {
        dispatch(AuthAction.logoutSuccess());
      }
    });
    return () => {
      unregisterAuthObserver();
    };
  });
}
export default useAuthStateObserver;
