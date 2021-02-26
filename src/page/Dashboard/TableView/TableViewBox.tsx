/* eslint-disable array-callback-return */
import { Buckets, Orders, Receipt } from '@redux/reducers/OrderReducer';
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
            if(item.state === '접수 완료') count ++;
            })
        });
        return count;
    };
    const orderCount = (order:Receipt[]) => {
        let count = 0;
        order.forEach((doc) => {
            doc.receipts.map((item:any) => {
            if(item.state === '접수 완료') count += item.count;
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
    const filter = (receipt:Receipt[]) => {
        let tmpArr:Buckets[] = [];
        receipt.forEach((receipts) => {
            if(receipts.state === "접수 완료") {
                receipts.receipts.forEach((item) => {
                    if(item.state === "접수 완료") tmpArr.push(item);
                })
            }
            
        })
        return tmpArr;
    };
    return (
        <div className="TableBox">
            {
                list.map((order) => {
                    if(order.order_state && checkState(order)) {
                        return (
                            <div className='Table' key={order.table_id}>
                                <div className="TableHeader">
                                    <div className="TableHeaderTable">Table {order.table_number}</div>
                                    <div className="TableHeaderCount">{orderCount(order.receipt)}개</div>
                                    <div className="TableHeaderTime">{order.orderAt}</div>
                                </div>
                                <div className="TableContent">
                                    {filter(order.receipt)[0].name} 
                                    {
                                        receiptCount(order.receipt) === 1 
                                        ? ` ${filter(order.receipt)[0].count}개`
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
                        )
                    }
                })
            }
        </div>
    );
};

export default TableViewBox;