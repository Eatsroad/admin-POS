import React, { useEffect } from 'react';
import './index.scss';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux';
import { StoreAction } from '@redux/actions';

interface props {}

const PreferenceStorePage: React.FC<props> = (props) => {
  const storeInfo = useSelector((state: RootState) => state.Store.information);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(StoreAction.loadStoreFirebase());
  }, [dispatch]);

  return (
    <div className="PreferenceStorePage">
      <div className="block">
        <h2>가게 이름</h2>
        <p>{storeInfo.name}</p>
      </div>
      <div className="block">
        <h2>주소</h2>
        <p>{storeInfo.address}</p>
      </div>
      <div className="block">
        <h2>전화번호</h2>
        <p>{storeInfo.phone}</p>
      </div>
    </div>
  );
};

export default PreferenceStorePage;
