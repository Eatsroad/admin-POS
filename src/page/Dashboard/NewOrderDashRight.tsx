import { NewOrders } from '@redux/reducers/OrderReducer';
import numberWithCommas from '@util/addCommaFunc';
import { itemPrice } from '@util/itemPrice';
import React from 'react';
import NewOrderItmes from './NewOrderItems';
interface Props {
    selectedOrder: NewOrders | undefined;
    cancleButton: boolean;
    setCancleButton: (state:boolean) => void
    checkOrders: ()=> void;
    setCancleModalState:(state:boolean)=>void
}

const NewOrderDashRight = ({selectedOrder, cancleButton, setCancleButton, checkOrders, setCancleModalState}:Props) => {
    return (
        <div className="right">
          {
            selectedOrder === undefined 
            ? <div></div>
            : <div className="rightContent">
                <div className="rightContentSp">
                    <div className="rightContentTableTime">
                        <div>Table {selectedOrder.table_number}</div>
                        <div>{selectedOrder.order_time}</div>
                    </div>
                    <NewOrderItmes 
                        selectedOrder={selectedOrder} 
                        cancleButton={cancleButton} 
                    />
                  <div className="NewOrderSpecificPrice">
                    <div className="">총 금액</div>
                    <div  className="">{numberWithCommas(itemPrice(selectedOrder))}원</div>
                  </div>
                </div>
                <div className="NewOrderSpecificButton">
                  { 
                    !cancleButton 
                    ?<button className="deniedOrderButton" onClick={()=>setCancleButton(true)}>주문 거부</button>
                    :<button className="deniedOrderButton_S" onClick={()=>setCancleModalState(true)} >주문 거부</button>
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
    );
};
export default NewOrderDashRight;