import React from 'react';
import { Link } from 'react-router-dom';
import './PreferenceSideBar.scss';

interface props {}

const PreferenceSideBar: React.FC<props> = (props) => {
  return (
    <div className="PreferenceSideBar">
      <Link className="btn" to={`/dashboard`}>
        {'< 뒤로 가기'}
      </Link>
      <Link className="btn" to={`/preference/store`}>
        가게 정보 관리
      </Link>
      <Link className="btn" to={`/preference/menu`}>
        메뉴관리
      </Link>
    </div>
  );
};

export default PreferenceSideBar;
