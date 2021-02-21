import { RootState } from '@redux';
import { ObserverAction, UIAction } from '@redux/actions';
import { NewOrders } from '@redux/reducers/OrderReducer';
import numberWithCommas from '@util/addCommaFunc';
import { itemPrice } from '@util/itemPrice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewOrderItmes from './NewOrderItems';

interface Props {
    selectedOrder: NewOrders | undefined;
    checkOrders: ()=> void;
}

const NewOrderDashRight = ({selectedOrder, checkOrders, }:Props) => {
    const checkState = (order:NewOrders) => {
      let tCount  = 0;
      
      order.receipts.forEach((item) => {
          if(item.state === "주문 완료") tCount++;
      });
      if(tCount === 0) {
        return false;
      } else {
        return true;
      }
  };
  const dispatch = useDispatch();
  const { checkItemButtonState, showModalState } = useSelector((state:RootState) => ({
    checkItemButtonState:state.Observer.checkItemButtonState,
    showModalState:state.UI.cancelModalState,
  }));
  console.log(showModalState,"right");
  return (
      <div className="right">
        {
          selectedOrder === undefined || !checkState(selectedOrder)
          ? <div></div>
          : <div className="rightContent">
              <div className="rightContentSp">
                  <div className="rightContentTable">
                      <div>Table {selectedOrder.table_number}</div>
                  </div>
                  <div className="rightContentTimeButton">
                    <div className="rightContentTime">{selectedOrder.order_time}</div>
                    {
                      showModalState 
                      ? !checkItemButtonState
                        ? <button className="rightContentButton" onClick={() => {dispatch(ObserverAction.triggerCheckAll_T());dispatch(ObserverAction.clickCheckButton())}}>전체 선택</button>
                        : <button className="rightContentButton" onClick={() => {dispatch(ObserverAction.triggerCheckAll_F());dispatch(ObserverAction.clickCheckButton())}}>전체 선택 취소</button>
                      : <></>
                    }
                  </div>
                  <NewOrderItmes 
                      selectedOrder={selectedOrder}
                  />
                <div className="NewOrderSpecificPrice">
                  <div className="NewOrderSpecificTotal">총 금액</div>
                  <div className="NewOrderSpecificTotalPrice">{numberWithCommas(itemPrice(selectedOrder))}원</div>
                </div>
              </div>
              <div className="NewOrderSpecificButton">
                { 
                  !showModalState 
                  ?<button className="deniedOrderButton" onClick={()=>dispatch(UIAction.showCancelModal(true))}>주문 거부</button>
                  :<button className="deniedOrderButton_S" onClick={()=>dispatch(UIAction.showComfirmModal(true))} >주문 거부</button>
                }
                {
                  !showModalState
                  ?<button className="checkOrderButton" onClick={checkOrders}>주문 접수</button>
                  :<button className="checkOrderButton_S" onClick={()=>dispatch(UIAction.cancleDeny())}>취소</button>
                }
              </div>
            </div>
        }
      </div>
  );
};
export default NewOrderDashRight;