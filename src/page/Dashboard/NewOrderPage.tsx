/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { OrderAction } from '@redux/actions';
import { Orders } from '@redux/reducers/OrderReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './NewOrderPage.scss';

interface props {
  orders: Orders[]
}

const NewOrder: React.FC<props> = ({orders}:props) => {
  
  const [selectedOrder, setSelectedOrder] = useState<Orders|undefined>(orders[0]);
  const [page, setPage ] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const dispatch = useDispatch();
  
  const filter = (order:any) => {
    let newOrders:any[] = [];
    order.forEach((item:any) => {
      if(!item.state) {
        newOrders.push(item);
      }
    })
    console.log(newOrders)
    return newOrders;
  }
  const renderArray = (newOrders:any[]) => {
    const rederArr:any[] = [];
    for(let i= page*4 ; i<page + 4 ; i++) {
      if(newOrders[i] !== undefined) rederArr.push(newOrders[i]);
    }
    return rederArr;
  };
  const count = () => {
    let count = 0;
    orders.forEach((order) => {
      if(!order.state && order.order_state) count++;
    })
    console.log(count)
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
    setSelectedOrder(renderArray(orders)[0]);
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
  useEffect(() => {
    if(selectedOrder === undefined) {
      setSelectedOrder(renderArray(orders)[0]);
    };
    if(orders.length%4 === 0) {
      setTotalPage(Math.floor(orders.length/4));
    } else {
      setTotalPage(Math.floor(orders.length/4) + 1);
    }
    if(count() === 0) {
      setSelectedOrder(undefined)
      setTotalPage(1);
    };
    if(count() === 1) {
      setSelectedOrder(renderArray(orders)[0]);
    }
  }, [selectedOrder,orders]);
  return (
    <div className="NewOrderPage">
      <div className="config">
        <div className="OrderRadio">주문순</div>
        <div className="SpecificOrder">상세주문</div>
      </div>
      <div className="container">
        <div className="left">

          {
            count() === 0 ? 
              <div className="NoneNew">새로운 주문이 없습니다.</div> 
            : 
              renderArray(orders).map((order:Orders) => {
                const newOrders = filter(order.receipt);
                return (
                  <div className="NewOrder" onClick={()=>setSelectedOrder(order)}>
                    <div className="NewOrderTable">
                      <div>Table {order.table_number}</div>
                      <div>시간</div>
                    </div>
                    <div className="NewOrderContent">{newOrders[0].name} {newOrders.length === 1 ? '':`외 ${newOrders.length-1}개`}</div>
                    <div className="NewOrderPrice">
                      <div className="NewOrderSp">
                        <div>주문 보기</div>
                      </div>
                      <div className="NewOrderItemPrice">
                        <div>{itemPrice(newOrders)}원</div>
                      </div>
                    </div>
                  </div>
                );
              })
          }
        </div>
        <div className="OrderPage">
          <div className="OrderPageButton">
            <button onClick={blockClickDe}></button>
            <div>{page + 1}/{totalPage}</div>
            <button onClick={blockClickIn}></button>
          </div>
        </div>

        <div className="right">
          {
            selectedOrder === undefined 
            ? <div></div>
            : <>
                <div>Table {selectedOrder?.table_number}</div>
                  {
                  
                  selectedOrder?.receipt.map((item) => {
                    if(!item.state){
                      return(
                        <div className="NewOrderSpecific">
                          <div>{item.name}</div>
                          <div>X{item.count}</div>
                          <div>{item.options}</div>
                          {/* redering options */}
                          <div>{item.item_total_price}원</div>
                        </div>
                      );
                  }})
                }
                <div className="NewOrderSpecificPrice">
                  <div className="">총 금액</div>
                  <div  className="">{itemPrice(selectedOrder.receipt)}원</div>
                </div>
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

