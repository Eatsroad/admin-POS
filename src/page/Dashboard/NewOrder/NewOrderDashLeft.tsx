import { Buckets, NewOrders, Orders, Receipt } from '@redux/reducers/OrderReducer';
import numberWithCommas from '@util/addCommaFunc';
import { renderArray } from '@util/renderArr';
import ArrowR from '@util/image/icon/icon_arrow_right_white_x3.png';
import ArrowL from '@util/image/icon/icon_arrow_left_white_x3.png';
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
    const checkListLength = () => {
        let lCount = 0;
        orders.forEach((order) => {
            if(checkState(order)) lCount++;
        })
        if(lCount === 0) {
            return false;
        } else {
            return true;
        };

    };
    const receiptCount = (order:Buckets[]) => {
        let count = 0;
        order.forEach((doc) => {
            if(doc.state === '주문 완료') count++;
        });
        return count;
    };
    const filter = (order:Buckets[]) => {
        let tmpArr:Buckets[] = [];
        order.forEach((doc) => {
            if(doc.state === "주문 완료") {
                tmpArr.push(doc);
            }
        });
        return tmpArr;
    };
    return (
        <div className="left">
          <div className="leftOrders">
            {
                orders.length === 0 || !checkListLength()
                ? <div className="NoneNew">새로운 주문이 없습니다.</div> 
                : 
                    pageArray().map((order:NewOrders) => {
                        if(checkState(order)) {
                            return (
                                <div className="NewOrder" onClick={() => setSelectedOrder(order)} key={order.order_time}>
                                    <div className="NewOrderTable">
                                    <div>Table {order.table_number}</div>
                                    <div>{order.order_time}</div>
                                    </div>
                                    <div className="NewOrderContent">
                                    {filter(order.receipts)[0].name}
                                    {
                                        receiptCount(order.receipts) === 1 
                                        ?` ${filter(order.receipts)[0].count}개`
                                        :`외 ${receiptCount(order.receipts)-1}개`
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
                        }
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