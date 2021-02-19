import React, { useState } from 'react';
import './index.scss';
import { DashboardSideBar } from '../../component';
import NewOrder from './NewOrderPage';
import TableViewPage from './TableViewPage';
import { useSelector } from 'react-redux';
import { RootState } from '@redux';

const DashbaordRouter = () => {
  const [state, setState] = useState<number>(0);
  const {orders, newOrder} = useSelector((state:RootState) => ({
    orders:state.Order.orders,
    newOrder:state.Order.newOrders

  }));

  return (
      <div className="main">
        <DashboardSideBar
          onClickNewMenu={() => {
            setState(0);
          }}
          onClickCompleted={() => {
            setState(1);
          }}
        />
        {state === 0 ? <NewOrder orders={newOrder}/> : <TableViewPage orders={orders}/>}
      </div>
  );
};

export default DashbaordRouter;
