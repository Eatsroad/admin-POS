import React from 'react';
import { Redirect } from 'react-router-dom';

interface props {}

const HomeRouter: React.FC<props> = (props) => {
  return (
    <Redirect
      to={{
        pathname: '/dashboard',
      }}
    />
  );
};

export default HomeRouter;
