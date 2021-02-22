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
    return (
        <div className="TableViewModalInnerContent">
            <div className="TableViewModalTime">
                <div>{doc.order_time}</div>
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
        </div>
    );
};

export default TableViewItems;