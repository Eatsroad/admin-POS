import { UIAction } from '@redux/actions';
import { Buckets, Orders, Receipt } from '@redux/reducers/OrderReducer';
import numberWithCommas from '@util/addCommaFunc';
import Arrow from '@util/image/icon/icon_arrow_back_white_x3.png'
import React from 'react';
import { useDispatch } from 'react-redux';
import TableViewItems from './TableViewItems';

interface Props {
    modalClose:()=>void;
    setModalState:(state:boolean)=>void
    curOrder:Orders | undefined;
    modalState:boolean;

}
const TableViewModal = ({modalClose, setModalState, curOrder, modalState }:Props) => {
    const dispatch = useDispatch();
    const checkedItemTotalPrice = () => {
        let totalPrice = 0;
        curOrder?.receipt.map((doc) => {
          if(doc.state === "접수 완료") {
            doc.receipts.map((item) => {
              if(item.state === "접수 완료")totalPrice += item.item_total_price;
            })
          }
        });
        return totalPrice;
    };    
    return (
        <>
            {
                modalState
                ? 
                    <div className="TableViewModal">
                        <div className="ModalContent">
                            <div className="TableViewModalTitle">
                                <button className="CloseModalButton" onClick={() => setModalState(false)}>
                                    <img src={Arrow} alt="back_arrow"/>
                                </button>
                                <div>결제 대기</div>
                            </div>
                            <div className="TableViewModalContent">
                                <div className="TableViewModalContentInfo">
                                    <div>Table {curOrder?.table_number}</div>
                                    <div>{numberWithCommas(checkedItemTotalPrice())}원</div>
                                </div>
                                <div className="TableViewModalInnerContentCon">
                                    {
                                        curOrder?.receipt.map((doc:Receipt) => {
                                        if(doc.state === "접수 완료"){
                                            return(
                                                <TableViewItems
                                                    doc={doc}
                                                />
                                            );
                                        }})
                                    }
                                </div>
                            </div>
                            <div className="TableViewModalPageButton"></div>
                            <div className="TableViewModalButton">
                                <button className="TableViewModalCancel" onClick={()=>dispatch(UIAction.showCancelModal(true))}>주문 취소</button>
                                <button onClick={modalClose} className="TableViewModalCheck">결제 완료</button>
                            </div>
                        </div>
                    </div>
                :   <></>
            }
        </>
    );
};

export default TableViewModal;