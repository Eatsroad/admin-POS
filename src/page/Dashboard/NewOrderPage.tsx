/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { OrderAction } from '@redux/actions';
import { Orders } from '@redux/reducers/OrderReducer';
import numberWithCommas from '@util/addCommaFunc';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './NewOrderPage.scss';
import ArrowR from '../../@util/image/icon/icon_arrow_right_white_x3.png';
import ArrowL from '../../@util/image/icon/icon_arrow_left_white_x3.png';

interface props {
  orders: Orders[]
}
interface Receipt {
  order_time:string,
  state:string,
  receipts:Buckets[],
}
interface Buckets{
  name: string,
  price: number,
  id: string,
  count: number,
  options:Options_B[],
  item_total_price: number,
  state: boolean,
}
interface Options_B{
  option_groups: Option_B[]
}
interface Option_B{
  option_group_name: string,
  option_list:OptionList[]
}
interface OptionList{
  name: string,
  price: number,
  state: boolean,
};

const NewOrder: React.FC<props> = ({orders}:props) => {
  
  const [selectedOrder, setSelectedOrder] = useState<Orders|undefined>(orders[0]);
  const [page, setPage ] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [cancleButton, setCancleButton] = useState<boolean>(false);
  const dispatch = useDispatch();
  
  const filter = (order:Receipt[]) => {
    let newOrders:Receipt[] = [];
    order.forEach((doc) => {
      if(doc.state === '주문 완료') {
        newOrders.push(doc);
      }
      // doc.receipts.map((item:any) => {
      //   if(!item.state) {
      //     newOrders.push(doc);
      //   }
      // })
    });
    return newOrders;
  };
  const receiptCount = (order:Receipt[]) => {
    let count = 0;
    order.forEach((doc) => {
      doc.receipts.map((item:any) => {
        count++;
      })
    });
    return count;
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
    });
    return count;
  };
  const itemPrice = (order:Receipt[]) => {
    let price = 0;
    order.forEach((doc) => {
      doc.receipts.map((item) => {
        price += item.item_total_price;
      })
    });
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
          <div className="leftOrders">
          {
            count() === 0 ? 
              <div className="NoneNew">새로운 주문이 없습니다.</div> 
            : 
              renderArray(orders).map((order:Orders) => {
                const newOrders = filter(order.receipt);
                return (
                  <div className="NewOrder" onClick={()=>setSelectedOrder(order)} key={order.table_number}>
                    <div className="NewOrderTable">
                      <div>Table {order.table_number}</div>
                      <div>{order.orderAt}</div>
                    </div>
                    <div className="NewOrderContent">
                      {newOrders[0]?.receipts[0].name} 
                      {
                        receiptCount(newOrders) === 1 
                        ?`${newOrders[0].receipts[0].count}개`
                        :`외 ${receiptCount(newOrders)-1}개`
                      }
                    </div>
                    <div className="NewOrderPrice">
                      <div className="NewOrderSp">
                        <div>주문 보기</div>
                      </div>
                      <div className="NewOrderItemPrice">
                        <div>{numberWithCommas(itemPrice(newOrders))}원</div>
                      </div>
                    </div>
                  </div>
                );
              })
          }
          </div>
          <div className="OrderPage">
          <div className="OrderPageButton">
            <button onClick={blockClickDe}><img src={ArrowR} alt="arrow"/></button>
            <div className="NewOrderPage">{page + 1}/{totalPage}</div>
            <button onClick={blockClickIn}><img src={ArrowL} alt="arrow"/></button>
          </div>
        </div>
        </div>
        <div className="right">
          {
            selectedOrder === undefined 
            ? <div></div>
            : <div className="rightContent">
                <div className="rightContentSp">
                  <div className="rightContentTableTime">
                    <div>Table {selectedOrder.table_number}</div>
                    <div>{selectedOrder.orderAt}</div>
                  </div>
                  <div className="NewOrderItems">
                    {
                      selectedOrder?.receipt.map((doc) => {
                        return (
                          doc.receipts.map((item) => {
                            if(!item.state){
                              return(
                                <div className="NewOrderItem" key={item.name}>
                                  <div>
                                    <div>{item.name}</div>
                                    <div>{item.options}</div>
                                  </div>
                                  <div className="NewOrderCountPrice">
                                    <div>X{item.count}</div>
                                    <div>{numberWithCommas(item.item_total_price)}원</div>
                                  </div>
                                </div>
                              );
                            }
                          })
                        )
                      })
                    }
                  </div>
                  <div className="NewOrderSpecificPrice">
                    <div className="">총 금액</div>
                    <div  className="">{numberWithCommas(itemPrice(selectedOrder.receipt))}원</div>
                  </div>
                </div>
                <div className="NewOrderSpecificButton">
                  { 
                    !cancleButton 
                    ?<button className="deniedOrderButton" onClick={()=>setCancleButton(true)}>주문 거부</button>
                    :<button className="deniedOrderButton_S" >주문 거부</button>
                  }
                  {
                    !cancleButton
                    ?<button className="checkOrderButton" onClick={checkOrders}>주문 접수</button>
                    :<button className="checkOrderButton_S" >전체 주문 거부</button>
                  }
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default NewOrder;

