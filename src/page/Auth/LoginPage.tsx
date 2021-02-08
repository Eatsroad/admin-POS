import React, { useState } from 'react';
import './LoginPage.scss';

import { useDispatch, useSelector } from 'react-redux';
import { AuthAction } from '@redux/actions';
import { RootState } from '@redux';
import { Redirect } from 'react-router-dom';

interface props {}

const Auth: React.FC<props> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loggedin = useSelector((state: RootState) => state.Auth.loggedin);
  const dispatch = useDispatch();

  const handleOnClickLogin = () => {
    // console.log('[LoginPage] dispatching login');
    dispatch(AuthAction.initiateLogin(email, password));
  };

  if (loggedin)
    return (
      <Redirect
        to={{
          pathname: '/dashboard',
        }}
      />
    );

  return (
    <div className="LoginPage">
      <div className="container">
        <p className="title">LOGIN</p>
        <input onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleOnClickLogin}>로그인</button>
      </div>
    </div>
  );
};

export default Auth;
