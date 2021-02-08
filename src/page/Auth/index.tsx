import React from 'react';

import { Redirect } from 'react-router-dom';

interface props {}

const AuthRouter: React.FC<props> = (props) => {
  return (
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  );
};

export default AuthRouter;
