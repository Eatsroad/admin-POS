import React from 'react';
import './index.scss';

import { Route } from 'react-router-dom';
import { PreferenceSideBar } from 'component';
import PreferenceMenuPage from 'page/Preference/Menu';
import PreferenceStorePage from 'page/Preference/Store';

interface props {}

const PreferenceRouter: React.FC<props> = (props) => {

  return (
    <div className="PreferencePage">
      <PreferenceSideBar />
      <Route
        exact
        path="/preference/store"
        component={() => <PreferenceStorePage />}
      />
      <Route
        exact
        path="/preference/menu"
        component={() => <PreferenceMenuPage />}
      />
    </div>
  );
};

export default PreferenceRouter;
