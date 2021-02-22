import { RootState } from '@redux';
import { UIAction } from '@redux/actions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CancelModal.scss';
interface Props {
    denyButton: () => void
}

const CancelModal = ({ denyButton}:Props) => {
    const { showComfirmModal } = useSelector((state:RootState) => ({
        showComfirmModal:state.UI.comfirmModalState,
    }));
    const dispatch = useDispatch();
    return (
        <>
            {
                showComfirmModal
                ? 
                <div className="CancleMenuModal">
                    <div className="CancleMenuModalInnerContent">
                    <div className="CancleMenuModalTitle">
                        <div>주문 거부</div>
                    </div>
                    <div className="CancleMenuModalContent">
                        <div>주문을 거부하시겠습니까?</div>
                    </div>
                    <div className="CancleMenuModalButtons">
                        <button onClick={()=>dispatch(UIAction.cancleDeny())} className="cancel">취소</button>
                        <button className="deny" onClick={denyButton}>주문 거부</button>
                    </div>   
                    </div>
                </div>
                :<></>
            }
        </>

    );
};

export default CancelModal;