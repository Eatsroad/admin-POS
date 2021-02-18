import { OrderAction } from '@redux/actions';
import { Orders } from '@redux/reducers/OrderReducer';
import numberWithCommas from '@util/addCommaFunc';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './TableViewPage.scss';

interface props {
  orders:Orders[]
};
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

const TableViewPage: React.FC<props> = ({orders}:props) => {
  const dispatch = useDispatch();
  const [page, setPage ] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [modalState, setModalState] = useState<boolean>(false);
  const [curOrder, setCurOrder ] = useState<any>();
  
  const renderArray = () => {
    orders.sort(function (a:any, b:any) {
      return a.table_number - b.table_number;
    });
    const rederArr:any[] = [];
    for(let i= page*9 ; i<page + 9 ; i++) {
      rederArr.push(orders[i]);
    }
    return rederArr;
  };
  const orderItemCount = (receipt:any[]) => {
    let count = 0;
    receipt.forEach((item)=> {
      count += item.count
    });

    return count;
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
  const blockClickDe = () => {
    if(page !== 0 ) {
      setPage(page - 1);
    } 
  };
  const modal = (curOrder:any[]) => {
    setCurOrder(curOrder);
    setModalState(true);

  };
  const modalClose = () => {
    dispatch(OrderAction.checkOrders(1,0,curOrder.table_number));
    setModalState(false);
  }
  const blockClickIn = () => {
    if(page !== totalPage - 1){
      setPage(page + 1);
    }
  };
  useEffect(() => {
    if(orders.length%9 === 0) {
      setTotalPage(Math.floor(orders.length/9));
    } else {
      setTotalPage(Math.floor(orders.length/9) + 1);
    }
  }, []);
  return(
    <div className="TableViewPage">
      {
        modalState
        ? 
          <div className="TableViewModal">
            <div className="ModalContent">
              <div className="TableViewModalTitle">
                <button onClick={()=>setModalState(false)}></button>
                <div>Table {curOrder.table_number}</div>
              </div>
              <div className="TableViewModalContent">
                {
                  curOrder.receipt.map((doc:any) => {
                    return(
                      doc.receipts.map((item:any) => {
                        if(!item.state){
                          return(
                            <div className="NewOrderItem" key={item.name}>
                              <div>{doc.order_time}</div>
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
                    );
                  })
                }
              </div>
              <div className="TableViewModalPageButton">

              </div>
              <div className="TableViewModalButton">
                <button>주문 취소</button>
                <button onClick={modalClose}>결제 완료</button>
              </div>
            </div>
          </div>
        :<></>
      }
      <div className="Tables">
        <div className="TableBox">
          {
            renderArray().map((order) => {
              if(order.order_state && order.state) {
                return (
                  <div className='Table' key={order.table_number}>
                    <div className="TableHeader">
                      <div className="TableHeaderTable">Table {order.table_number}</div>
                      <div className="TableHeaderCount">{receiptCount(order.receipt)}개</div>
                      <div className="TableHeaderTime">{order.orderAt}</div>
                    </div>
                    <div className="TableContent">
                      {order.receipt[0].receipts[0].name} 
                      {
                        receiptCount(order.receipt) === 1 
                        ? `${order.receipt[0].receipts[0].count}개`
                        :`외 ${receiptCount(order.receipt)-1}개`
                      }
                    </div>
                    <div className="TableButton">
                      <button onClick={() => modal(order)}>결제대기</button>
                      <div className="TableButtonPrice">{numberWithCommas(order.receipt_total_price)}원</div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="CleanTable">
                    <div>
                      <div>Table {order.table_number}</div>
                    </div>
                  </div>
                );
              }
            })
          }
        </div>
        <div className="PageButton">
          <div className="Button">
            <button onClick={blockClickDe}></button>
            <div>{page + 1}/{totalPage}</div>
            <button onClick={blockClickIn}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableViewPage;
