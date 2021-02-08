import React, { useEffect, useState } from 'react';
import './index.scss';

import { useDispatch } from 'react-redux';
import { StoreAction } from '@redux/actions';
import Categories from './Category';
import Items from './Item';
import OptionGroups from './OptionGroup';

interface props {}

const PreferenceMenuPage: React.FC<props> = (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState('categories');

  useEffect(() => {
    dispatch(StoreAction.loadStoreFirebase());
  }, [dispatch]);

  const handleOnClickNavBar = (page: string) => () => {
    setPage(page);
  };

  const NavBar = () => {
    return (
      <div className="NavBar">
        <div className="btn" onClick={handleOnClickNavBar('categories')}>
          카테고리 설정
        </div>
        <div className="btn" onClick={handleOnClickNavBar('optionGroups')}>
          옵션그룹 설정
        </div>
        <div className="btn" onClick={handleOnClickNavBar('items')}>
          메뉴 설정
        </div>
      </div>
    );
  };

  return (
    <div className="PreferenceMenuPage">
      <NavBar />
      {(() => {
        switch (page) {
          case 'categories':
            return <Categories />;
          case 'optionGroups':
            return <OptionGroups />;
          case 'items':
            return <Items />;
        }
      })()}
    </div>
  );
};

export default PreferenceMenuPage;
