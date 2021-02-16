/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { OrderAction } from '@redux/actions';
import { setOrders } from '@redux/actions/OrderAction';
import { Orders } from '@redux/reducers/OrderReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './NewOrderPage.scss';

interface props {
  orders: Orders[]
}

const NewOrder: React.FC<props> = ({orders}:props) => {
  
  const [selectedOrder, setSelectedOrder] = useState<Orders|undefined>(orders[0]);
  const dispatch = useDispatch();
  
  const filter = (order:any) => {
    let newOrders:any[] = [];
    order.forEach((item:any) => {
      if(!item.state) {
        newOrders.push(item)
      }
    })
    console.log(newOrders)
    return newOrders;
  }
  const count = () => {
    let count = 0;
    orders.forEach((order) => {
      if(!order.state && order.order_state) count++;
    })
    return count;
  }
  const itemPrice = (order:any) => {
    let price = 0;
      order.forEach((item:any) => {
        price += item.item_total_price;
      })
    return price;
  }
  const checkOrders = () => {
    dispatch(OrderAction.checkOrders(0,0,selectedOrder?.table_number));
    setSelectedOrder(orders[0]);
  }
  useEffect(() => {
    if(selectedOrder === undefined) {
      setSelectedOrder(orders[0]);
    };
    if(count() === 0) {
      setSelectedOrder(undefined)
    };
  }, [selectedOrder,orders]);
  return (
    <div className="NewOrderPage">
      <div className="config">header</div>
      <div className="container">
        <div className="left">

          {
            count() === 0 ? 
              <div className="NoneNew">새로운 주문이 없습니다.</div> 
            : 
              orders.map((order:Orders) => {
                const newOrders = filter(order.receipt);
                return (
                  <div className="NewOrder" onClick={()=>setSelectedOrder(order)}>
                    <div>Table {order.table_number}</div>
                    <div>{newOrders[0].name} {newOrders.length === 1 ? '':`외 ${newOrders.length-1}개`}</div>
                    <div>{itemPrice(newOrders)}원</div>
                  </div>
                );
              })
          }
          {/* <div className="NewOrderPage">
            gkeks
          </div> */}

        </div>
        <div className="NewOrderPage">
          dfsdf
        </div>
        <div className="right">
          {
            selectedOrder === undefined 
            ? <div></div>
            : <>
                <div>{selectedOrder?.table_number}</div>
                  {
                  
                  selectedOrder?.receipt.map((item) => {
                    if(!item.state){
                      return(
                        <div>
                          <div>{item.name}</div>
                          <div>X{item.count}</div>
                          <div>{item.options}</div>
                          {/* redering options */}
                          <div>{item.item_total_price}원</div>
                        </div>
                      );
                  }})
                }
                <button>주문 거부</button>
                <button onClick={checkOrders}>주문 접수</button>
              </>
          }
        </div>
      </div>
    </div>
  );
};

export default NewOrder;

