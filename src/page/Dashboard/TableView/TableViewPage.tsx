import { CancelMenuAction, OrderAction, UIAction } from '@redux/actions';
import { Orders } from '@redux/reducers/OrderReducer';
import numberWithCommas from '@util/addCommaFunc';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TableViewPage.scss';
import TableViewModal from './TableViewModal';
import TableViewBox from './TableViewBox';
import { RootState } from '@redux';
import CancelModal from '../CancelModal';

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
  const { checkedTableItem } = useSelector((state:RootState) => ({
    checkedTableItem:state.CancelMenu.checkedTableItem
  }))
  
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
  const blockClickDe = () => {
    if(page !== 0 ) {
      setPage(page - 1);
    } 
  };
  const denyButton = () => {
    console.log(checkedTableItem);
    dispatch(CancelMenuAction.updateTableReceipt(curOrder?.table_number));
    dispatch(UIAction.cancleDeny());
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
  console.log(checkedTableItem);
  return(
    <div className="TableViewPage">
      <CancelModal denyButton={denyButton}/>
      <TableViewModal
        modalClose={modalClose}
        setModalState={setModalState}
        curOrder={curOrder}
        modalState={modalState}
      />
      <div className="Tables">
        <TableViewBox
          list={renderArray()}
          modal={modal}
        />
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
