import React, { useState } from 'react';
import './AddCategoryModal.scss';

import { useDispatch } from 'react-redux';
import { StoreAction } from '@redux/actions';
import Modal from 'react-modal';

interface props {}

const AddCategoryModal: React.FC<props> = (props) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOnClickAddCategory = () => {
    dispatch(
      StoreAction.addCategoryFireBase(newCategoryName, newCategoryDescription)
    );
    setNewCategoryName('');
    setNewCategoryDescription('');
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>추가</div>
      <Modal
        isOpen={isModalOpen}
        className="AddCategoryModal"
        overlayClassName="Overlay"
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsModalOpen(false)}
        appElement={document.getElementById('root') as HTMLElement}
      >
        <div>
          <input
            placeholder="이름"
            onChange={(e) => setNewCategoryName(e.target.value)}
            value={newCategoryName}
          />
        </div>
        <div>
          <input
            placeholder="설명 "
            onChange={(e) => {
              setNewCategoryDescription(e.target.value);
            }}
            value={newCategoryDescription}
          />
        </div>
        <div onClick={handleOnClickAddCategory}>추가</div>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
