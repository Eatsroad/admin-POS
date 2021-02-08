import React from 'react';
import './index.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashbaordRouter from 'page/Dashboard';
import LoginPage from 'page/Auth/LoginPage';
import { useSelector } from 'react-redux';
import useAuthStateObserver from '@firebase/useAuthStateObserver';
import { RootState } from '@redux';
import { Header, Loading } from 'component';
import PreferenceRouter from 'page/Preference';
import HomeRouter from 'page/Home';
import AuthRouter from 'page/Auth';

const RootRouter = () => {
  useAuthStateObserver();

  const loggedin = useSelector((state: RootState) => state.Auth.loggedin);
  const isGlobalLoading = useSelector(
    (state: RootState) => state.UI.isGlobalLoading
  );

  const AuthFlowRouter = () => {
    return (
      <Router>
        {loggedin ? (
          <>
            <Header />
            <Route exact path="/" component={() => <HomeRouter />} />
            <Route path="/dashboard" component={() => <DashbaordRouter />} />
            <Route path="/preference" component={() => <PreferenceRouter />} />
            <Route path="/login" component={() => <LoginPage />} />
          </>
        ) : (
          <>
            <Route path="/" component={(props: any) => <AuthRouter />} />
            <Route exact path="/login" component={() => <LoginPage />} />
          </>
        )}
      </Router>
    );
  };

  return (
    <div id="appContainer">
      {isGlobalLoading ? <Loading.GlobalLoading /> : <AuthFlowRouter />}
    </div>
  );
};

export default RootRouter;
