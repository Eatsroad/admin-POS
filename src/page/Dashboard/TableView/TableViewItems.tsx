/* eslint-disable array-callback-return */
import { RootState } from '@redux';
import { ObserverAction } from '@redux/actions';
import { Buckets, Receipt } from '@redux/reducers/OrderReducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableViewItem from './TableViewItem';
interface Props {
    doc:Receipt
}

const TableViewItems = ({doc, }:Props) => {
    const { checkItemButtonState, showModalState } = useSelector((state:RootState) => ({
        checkItemButtonState:state.Observer.checkItemButtonState,
        showModalState:state.UI.cancelModalState,
    }));
    const dispatch = useDispatch();
    const checkState = () => {
        let count = 0;
        doc.receipts.forEach((item) => {
            if(item.state === "접수 완료") count++;
        });
        if( count === 0) {
            return false
        } else {
            return true
        }
    }
    return (
        <>
            {
                checkState()
                ?<div className="TableViewModalInnerContent">
                    <div className="TableViewModalTime">
                        <div>{doc.order_time}</div>
                        <div className="payment">{doc.payment[0]}{doc.payment[1]}</div>
                        {
                            showModalState 
                            ? !checkItemButtonState
                                ? <button className="TableViewModalButton" onClick={() => {dispatch(ObserverAction.triggerCheckAll_T());dispatch(ObserverAction.clickCheckButton())}}>전체 선택</button>
                                : <button className="TableViewModalButton" onClick={() => {dispatch(ObserverAction.triggerCheckAll_F());dispatch(ObserverAction.clickCheckButton())}}>전체 선택 취소</button>
                            : <></>
                        }
                    </div>
                    {
                        doc.receipts.map((item:Buckets, index:number) => {
                            if(item.state === '접수 완료'){
                                return(
                                    <TableViewItem
                                        item={item}
                                        index={index}
                                        length={doc.receipts.length}
                                        id={item.id}
                                        orderTime={doc.order_time}
                                    />
                                );
                            }
                        })
                    }
                    <div>
                        <div>요청 사항 : {doc.request ? `${doc.request}`:'없음'}</div>
                    </div>
                </div>
                :<></>
            }
        </>
        
    );
};

export default TableViewItems;