import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@redux';

import './Header.scss';

interface props {}

const Header: React.FC<props> = (props) => {
  const [date, setDate] = useState(new Date());
  const storeName = useSelector(
    (state: RootState) => state.Store.information.name
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  });

  const tick = () => {
    setDate(new Date());
  };

  const padNum = (num: number) => {
    const str = num < 10 ? `0${num}` : num;
    return str;
  };

  const formatTime = (date: Date) => {
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const datestr = `${date.getFullYear()}.${
      date.getMonth() + 1
    }.${date.getDate()} (${dayOfWeek[date.getDay()]}) `;

    const timestr = `${padNum(date.getHours())}:${padNum(
      date.getMinutes()
    )}:${padNum(date.getSeconds())}`;
    return (
      <>
        <span style={{ fontSize: '11px' }}>{datestr}</span>
        <span style={{ fontSize: '15px', marginLeft: '5px' }}>{timestr}</span>
      </>
    );
  };

  return (
    <div className="Header">
      <h1>{`POS_${storeName}`}</h1>
      <h1>{formatTime(date)}</h1>
    </div>
  );
};

export default Header;
