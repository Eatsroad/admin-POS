/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { CancelMenuAction, OrderAction, UIAction } from '@redux/actions';
import { NewOrders } from '@redux/reducers/OrderReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './NewOrderPage.scss';
import { renderArray } from '@util/renderArr';
import NewOrderDashLeft from './NewOrderDashLeft';
import NewOrderDashRight from './NewOrderDashRight';
import NewOrderDashConfig from './NewOrderDashConfig';
import CancelModal from '../CancelModal';


interface props {
  orders: NewOrders[]
};
const NewOrder: React.FC<props> = ({orders}:props) => {
  
  const [selectedOrder, setSelectedOrder] = useState<NewOrders | undefined >(orders[0]);
  const [page, setPage ] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [prvCount, setPrevCount] = useState<number>(0);
  const dispatch = useDispatch();
  
  const pageArray = () => {
    return renderArray(orders, page);
  };
  const checkOrders = () => {
    dispatch(OrderAction.checkOrders(0,selectedOrder?.table_id,selectedOrder?.table_number, selectedOrder?.order_time));
    setSelectedOrder(pageArray()[1]);
  };
  const blockClickDe = () => {
    if(page !== 0 ) {
      setPage(page - 1);
    } 
  };
  const blockClickIn = () => {
    if(page !== totalPage - 1){
      setPage(page + 1);
    }
  };
  const denyButton = () => {
    dispatch(CancelMenuAction.updateReceipt(selectedOrder?.table_id, selectedOrder?.order_time, selectedOrder?.table_number));
    dispatch(UIAction.cancleDeny());
  }
  useEffect(() => {
    if(selectedOrder === undefined) {
      setSelectedOrder(pageArray()[0]);
    };
    if(orders.length%4 === 0) {
      setTotalPage(Math.floor(orders.length/4));
    } else {
      setTotalPage(Math.floor(orders.length/4) + 1);
    }
    if(orders.length === 0) {
      setSelectedOrder(undefined)
      setTotalPage(1);
    };
    if(orders.length === 1) {
      setSelectedOrder(pageArray()[0]);
    };
    if(prvCount === 0) {
      setPrevCount(0);
    };
  }, [selectedOrder, orders, page]);
  return (
    <div className="NewOrderPage">
      <CancelModal denyButton={denyButton}/>
      <NewOrderDashConfig/>
      <div className="container">
        <NewOrderDashLeft 
          orders={orders} 
          page={page} 
          setSelectedOrder={setSelectedOrder} 
          blockClickIn={blockClickIn} 
          blockClickDe={blockClickDe} 
          totalPage={totalPage}
        />
        <NewOrderDashRight
          selectedOrder={selectedOrder}
          checkOrders={checkOrders}
        />
      </div>
    </div>
  );
};

export default NewOrder;

