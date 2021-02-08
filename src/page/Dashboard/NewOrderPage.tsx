import React from 'react';
import './NewOrderPage.scss';

interface props {}

const NewOrder: React.FC<props> = (props) => {
  return (
    <div className="NewOrderPage">
      <div className="config">header</div>
      <div className="container">
        <div className="left">새로운 주문이 없습니다.</div>
        <div className="right">right</div>
      </div>
    </div>
  );
};

export default NewOrder;
