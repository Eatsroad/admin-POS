import { OrderAction } from '@redux/actions';
import { Orders } from '@redux/reducers/OrderReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
        {
          renderArray().map((order) => {
            if(order.order_state && order.state) {
              return (
                <div className='Table'>
                  <div>{order.table_number}</div>
                  <button onClick={() => dispatch(OrderAction.checkOrders(1, 0, order.table_number))}>결제대기</button>
                  {order.receipt_total_price}원
                </div>
              );
            } else {
              return (
                <div className="CleanTable">
                  <div>
                    <div>{order.table_number}</div>
                  </div>
                </div>
              );
            }
          })
        }
      </div>
      <div>
        <button onClick={()=>setPage(page - 1)}></button>
        <div>{page + 1}/{totalPage}</div>
        <button onClick={()=>setPage(page + 1)}></button>
      </div>
    </div>
  );
};

export default TableViewPage;
