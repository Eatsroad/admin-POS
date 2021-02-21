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
  state: string,
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
  const [curOrder, setCurOrder ] = useState<Orders>();
  
  const renderArray = () => {
    orders.sort(function (a:any, b:any) {
      return a.table_number - b.table_number;
    });
    const rederArr:Orders[] = [];
    for(let i= page*9 ; i<page + 9 ; i++) {
      rederArr.push(orders[i]);
    }
    return rederArr;
  };
  const receiptCount = (order:Receipt[]) => {
    let count = 0;
    order.forEach((doc) => {
      doc.receipts.map((item:any) => {
        if(item.state)count++;
      })
    });
    return count;
  };
  const blockClickDe = () => {
    if(page !== 0 ) {
      setPage(page - 1);
    } 
  };
  const checkState = (order:Orders) => {
    let tCount  = 0;
    
    order.receipt.forEach((receipts) => {
      receipts.receipts.forEach((item) => {
        if(item.state === "접수 완료") tCount++;
      })
    });
    console.log(tCount)
    if(tCount === 0) {
      return false;
    } else {
      return true;
    }
  };
  const receiptPrice = (order:Orders) => {
    let price = 0;
    order.receipt.forEach((receipts) => {
      if(receipts.state === "접수 완료") {
        receipts.receipts.forEach((item) => {
            if(item.state === "접수 완료")price += item.item_total_price;
        })
      }
    });
    return price;
  }
  const checkedItemTotalPrice = () => {
    let totalPrice = 0;
    curOrder?.receipt.map((doc) => {
      if(doc.state === "접수 완료") {
        doc.receipts.map((item) => {
          totalPrice += item.item_total_price;
        })
      }
    });
    return totalPrice;
  }
  const modal = (curOrder:Orders) => {
    setCurOrder(curOrder);
    setModalState(true);

  };
  const modalClose = () => {
    dispatch(OrderAction.checkOrders(1,0,curOrder?.table_number));
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
                <button  className="CloseModalButton" onClick={() => setModalState(false)}></button>
                <div>결제 대기</div>
              </div>
              <div className="TableViewModalContent">
                <div className="TableViewModalContentInfo">
                  <div>Table {curOrder?.table_number}</div>
                  <div>{numberWithCommas(checkedItemTotalPrice())}원</div>
                </div>
                <div className="TableViewModalInnerContentCon">
                  {
                    curOrder?.receipt.map((doc:Receipt) => {
                      if(doc.state === "접수 완료"){
                        return(
                          <div className="TableViewModalInnerContent">
                            <div className="TableViewModalTime">{doc.order_time}</div>
                            {
                              doc.receipts.map((item:Buckets, index:number) => {
                                if(item.state){
                                  return(
                                    <div className="TableViewModalContentItem" key={item.name}>
                                      <div className="TableViewModalContentName">
                                        <div>{item.name}</div>
                                        <div>{numberWithCommas(item.item_total_price)}원</div>
                                      </div>
                                      <div className="TableViewModalContentCount">
                                        <div>수량 : {item.count}개</div>
                                        <div>{numberWithCommas(item.price)}원</div>
                                      </div>
                                      <div className="TableViewModalContentOptions">
                                        <div>{item.options}</div>
                                      </div>
                                      {
                                        index === doc.receipts.length -1? <></>:<div className="TableLine"/>
                                      }
                                    </div>
                                  );
                                }
                              })
                            }
                          </div>
                        );
                    }})
                  }
                </div>
              </div>
              <div className="TableViewModalPageButton">

              </div>
              <div className="TableViewModalButton">
                <button className="TableViewModalCancel">주문 취소</button>
                <button onClick={modalClose} className="TableViewModalCheck">결제 완료</button>
              </div>
            </div>
          </div>
        :<></>
      }
      <div className="Tables">
        <div className="TableBox">
          {
            renderArray().map((order) => {
              if(order.order_state && checkState(order)) {
                return (
                  <div className='Table' key={order.table_number}>
                    <div className="TableHeader">
                      <div className="TableHeaderTable">Table {order.table_number}</div>
                      <div className="TableHeaderCount">{receiptCount(order.receipt)}개</div>
                      <div className="TableHeaderTime">{order.orderAt}</div>
                    </div>
                    <div className="TableContent">
                      {/* {
                        order.receipt.map((receipt) => {
                          receipt.receipts.map((item) => {
                            
                          });
                        })
                      } */}
                      {order.receipt[0].receipts[0].name} 
                      {
                        receiptCount(order.receipt) === 1 
                        ? `${order.receipt[0].receipts[0].count}개`
                        :`외 ${receiptCount(order.receipt)-1}개`
                      }
                    </div>
                    <div className="TableButton">
                      <button onClick={() => modal(order)}>결제대기</button>
                      <div className="TableButtonPrice">{numberWithCommas(receiptPrice(order))}원</div>
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
