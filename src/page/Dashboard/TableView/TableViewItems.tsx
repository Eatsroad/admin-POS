import { Buckets, Receipt } from '@redux/reducers/OrderReducer';
import React from 'react';
import TableViewItem from './TableViewItem';
interface Props {
    doc:Receipt
}

const TableViewItems = ({doc, }:Props) => {
    return (
        <div className="TableViewModalInnerContent">
            <div className="TableViewModalTime">{doc.order_time}</div>
            {
                doc.receipts.map((item:Buckets, index:number) => {
                    if(item.state === '접수 완료'){
                        return(
                            <TableViewItem
                                item={item}
                                index={index}
                                length={doc.receipts.length}
                                id={item.id}
                            />
                        );
                    }
                })
            }
        </div>
    );
};

export default TableViewItems;