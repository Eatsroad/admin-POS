import React, { useState } from 'react';
import Modal from 'react-modal';
import OptionGroupEditor from "../../../../component/OptionGroupEditor";

interface props {}

const AddOptionGroup: React.FC<props> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);



    return (
        <>
            <div onClick={() => setIsModalOpen(!isModalOpen)}>옵션그룹 추가</div>
            <Modal
                isOpen={isModalOpen}
                appElement={document.getElementById('root') as HTMLElement}
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => setIsModalOpen(!isModalOpen)}
                className="Modal"
                overlayClassName="Overlay"
            >
                <div>옵션그룹을 추가해보세요</div>
                <div>
                    <OptionGroupEditor onChange={() => {}} />
                </div>
                <div>
                    <button onClick={()=>setIsModalOpen(false)}>닫기</button>
                </div>
            </Modal>
        </>
    );
};

export default AddOptionGroup;
