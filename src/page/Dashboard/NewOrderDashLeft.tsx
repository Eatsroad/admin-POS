import { NewOrders } from '@redux/reducers/OrderReducer';
import numberWithCommas from '@util/addCommaFunc';
import { renderArray } from '@util/renderArr';
import ArrowR from '../../@util/image/icon/icon_arrow_right_white_x3.png';
import ArrowL from '../../@util/image/icon/icon_arrow_left_white_x3.png';
import React from 'react';
import { itemPrice } from '@util/itemPrice';
interface Props {
    orders: NewOrders[];
    page:number;
    setSelectedOrder: (orders:NewOrders) => void;
    blockClickDe: () => void;
    blockClickIn: () => void;
    totalPage:number;
}
const NewOrderDashLeft = ({orders, page, setSelectedOrder, blockClickDe, blockClickIn, totalPage}:Props) => {
    const pageArray = () => {
        return renderArray(orders, page);
    };
    return (
        <div className="left">
          <div className="leftOrders">
            {
                orders.length === 0 ? 
                    <div className="NoneNew">새로운 주문이 없습니다.</div> 
                : 
                    pageArray().map((order:NewOrders) => {
                        return (
                            <div className="NewOrder" onClick={()=>setSelectedOrder(order)} key={order.order_time}>
                                <div className="NewOrderTable">
                                <div>Table {order.table_number}</div>
                                <div>{order.order_time}</div>
                                </div>
                                <div className="NewOrderContent">
                                {order.receipts[0].name}
                                {
                                    order.receipts.length === 1 
                                    ?` ${order.receipts[0].count}개`
                                    :`외 ${order.receipts.length-1}개`
                                }
                                </div>
                                <div className="NewOrderPrice">
                                <div className="NewOrderSp">
                                    <div>주문 보기</div>
                                </div>
                                <div className="NewOrderItemPrice">
                                    <div>{numberWithCommas(itemPrice(order))}원</div>
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
    );
};

export default NewOrderDashLeft;