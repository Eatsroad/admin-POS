import { OrderAction } from '@redux/actions';
import { Orders } from '@redux/reducers/OrderReducer';
import numberWithCommas from '@util/addCommaFunc';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { idText } from 'typescript';
import './TableViewPage.scss';

interface props {
  orders:Orders[]
};

const TableViewPage: React.FC<props> = ({orders}:props) => {
  const dispatch = useDispatch();
  const [page, setPage ] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  
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
  const blockClickDe = () => {
    if(page !== 0 ) {
      setPage(page - 1);
    } 
  };
  const blockClickIn = () => {
    if(page !== totalPage - 1){
      setPage(page + 1);
    }
  }
  useEffect(() => {
    if(orders.length%9 === 0) {
      setTotalPage(Math.floor(orders.length/9));
    } else {
      setTotalPage(Math.floor(orders.length/9) + 1);
    }
  }, []);
  return(
    <div className="TableViewPage">
      <div className="Tables">
        <div className="TableBox">
          {
            renderArray().map((order) => {
              if(order.order_state && order.state) {
                return (
                  <div className='Table'>
                    <div className="TableHeader">
                      <div>Table {order.table_number}</div>
                      <div>{orderItemCount(order.receipt)}개</div>
                      <div>time</div>
                    </div>
                    <div></div>
                    <div className="TableButton">
                      <button onClick={() => dispatch(OrderAction.checkOrders(1, 0, order.table_number))}>결제대기</button>
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
