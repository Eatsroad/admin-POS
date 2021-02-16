import React, { useState } from 'react';
import './index.scss';
import { DashboardSideBar } from '../../component';
import NewOrder from './NewOrderPage';
import TableViewPage from './TableViewPage';
import { useSelector } from 'react-redux';
import { RootState } from '@redux';
import { Orders } from '@redux/reducers/OrderReducer';

const DashbaordRouter = () => {
  const [state, setState] = useState<number>(0);
  const {orders} = useSelector((state:RootState) => ({
    orders:state.Order.orders,

  }));
  const newOrders = () => {
    const newOrders:Orders[] = [];
    orders.forEach((order) => {
      if(!order.state && order.order_state) {
        newOrders.push(order);
      }
    });
    return newOrders;
  }

  return (
    <div className="HomePage">
      <div className="main">
        <DashboardSideBar
          onClickNewMenu={() => {
            setState(0);
          }}
          onClickCompleted={() => {
            setState(1);
          }}
        />
        <div className="plane">
          {state === 0 ? <NewOrder orders={newOrders()}/> : <TableViewPage orders={orders}/>}
        </div>
      </div>
    </div>
  );
};

export default DashbaordRouter;
