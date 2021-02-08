import React, { useState } from 'react';
import './AddItem.scss';

import Modal from 'react-modal';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux';
import { StoreAction } from '@redux/actions';

interface props {
  currentCategory: string;
}

const AddItem: React.FC<props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState(8000);
  const [newMenuDescription, setNewMenuDescription] = useState('');
  const [newMenuCategories, setNewMenuCategories] = useState([]);
  const menu = useSelector((state: RootState) => state.Store.menu);
  const dispatch = useDispatch();

  const handleOnClickAddBtn = () => {
    setIsModalOpen(true);
  };

  const handleOnCancel = () => {
    setIsModalOpen(false);
  };

  const handleOnAdd = () => {
    dispatch(
      StoreAction.addMenuFirebase(
        newMenuName,
        newMenuPrice,
        newMenuDescription,
        newMenuCategories
      )
    );
    setNewMenuName('');
    setNewMenuPrice(0);
    setNewMenuDescription('');
    setIsModalOpen(false);
  };

  const handleOnSelectCategories = (data: any) => {
    setNewMenuCategories(data.map((cat: any) => cat.value));
  };

  return (
    <>
      <div className="AddBtn" onClick={handleOnClickAddBtn}>
        추가
      </div>

      <Modal
        isOpen={isModalOpen}
        className="Modal"
        overlayClassName="Overlay"
        appElement={document.getElementById('root') as HTMLElement}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <h4>메뉴 추가</h4>
        <div className="FormContainer">
          <input
            placeholder="메뉴 이름"
            onChange={(e) => setNewMenuName(e.target.value)}
            value={newMenuName}
          />
          <input
            placeholder="가격"
            type="number"
            onChange={(e) => setNewMenuPrice(parseInt(e.target.value))}
            value={newMenuPrice}
          />
          <input
            placeholder="설명"
            onChange={(e) => setNewMenuDescription(e.target.value)}
            value={newMenuDescription}
          />
          <Select
            isMulti={true}
            options={menu.categories.map((cat) => {
              return { value: cat.name, label: cat.name };
            })}
            placeholder="카테고리를 모두 선택해주세요"
            defaultValue={
              props.currentCategory === '전체보기' ||
              props.currentCategory === '카테고리 미지정'
                ? null
                : { value: props.currentCategory, label: props.currentCategory }
            }
            onChange={handleOnSelectCategories}
          />
          <Select
            isMulti={true}
            placeholder="(준비중) 옵션그룹을 모두 선택해주세요"
          />
        </div>
        <div className="ModalBtnContainer">
          <div className="btn" onClick={handleOnCancel}>
            취소
          </div>
          <div className="btn" onClick={handleOnAdd}>
            추가
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddItem;
