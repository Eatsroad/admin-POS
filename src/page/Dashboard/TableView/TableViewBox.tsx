import { Orders, Receipt } from '@redux/reducers/OrderReducer';
import numberWithCommas from '@util/addCommaFunc';
import React from 'react';
interface Props {
    list: Orders[];
    modal: (curOrder:Orders)=>void;
}

const TableViewBox = ({list, modal, }:Props) => {
    const checkState = (order:Orders) => {
        let tCount  = 0;
        order.receipt.forEach((receipts) => {
            receipts.receipts.forEach((item) => {
            if(item.state === "접수 완료") tCount++;
            })
        });
        if(tCount === 0) {
            return false;
        } else {
            return true;
        }
    };
    const receiptCount = (order:Receipt[]) => {
        let count = 0;
        order.forEach((doc) => {
            doc.receipts.map((item:any) => {
            if(item.state === '접수 완료') count++;
            })
        });
        return count;
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
    };
    return (
        <>
            {
                list.map((order) => {
                if(order.order_state && checkState(order)) {
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
        </>
    );
};

export default TableViewBox;