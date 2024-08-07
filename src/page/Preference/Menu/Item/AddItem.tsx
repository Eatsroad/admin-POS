import React, { useState } from 'react';
import './AddItem.scss';
import Modal from 'react-modal';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux';
import { StoreAction } from '@redux/actions';
import Resizer from 'react-image-file-resizer';
interface props {
  currentCategory: string;
};

const AddItem: React.FC<props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState(0);
  const [newMenuDescription, setNewMenuDescription] = useState('');
  const [newMenuCategories, setNewMenuCategories] = useState([]);
  const [attachement, setAttachment] = useState<any>(null);
  const { menu } = useSelector((state: RootState) => ({
    menu: state.Store.menu
  }));
  const dispatch = useDispatch();

  const handleOnClickAddBtn = () => {
    setIsModalOpen(true);
  };

  const handleOnCancel = () => {
    setIsModalOpen(false);
    setNewMenuName('');
    setNewMenuPrice(0);
    setNewMenuDescription('');
    setAttachment(null);
  };
  const handleOnAdd = async () => { 
    setNewMenuName('');
    setNewMenuPrice(0);
    setNewMenuDescription('');
    setIsModalOpen(false);
    setAttachment(null);
    dispatch(
      StoreAction.addMenuFirebase(
        newMenuName,
        newMenuPrice,
        newMenuDescription,
        newMenuCategories,
        attachement
      )
    );
  };
  const onFileChange = (event: any) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    const maxWidth = 375;
    const maxHeight = 375;
    const compressFormat = 'JPEG';
    const quality = 100;
    const rotation = 0;
    const reader = new FileReader();
    
    reader.onload = (finishedEvent:any) => {
      const { 
        currentTarget: { result },
      } = finishedEvent;
      if(result) {
        try{
          Resizer.imageFileResizer(
            theFile,
            maxWidth, 
            maxHeight, 
            compressFormat, 
            quality, 
            rotation,
            uri => {
              console.log(uri)
              setAttachment(uri);
            },
            'base64'
          );
        }
        catch(err) {
        }
      }
    }
    reader.readAsDataURL(theFile);
  }
  const handleOnSelectCategories = (data: any) => {
    setNewMenuCategories(data.map((cat: any) => cat.value));
  };
  const onClearAttachment = () => setAttachment(null);
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange(e)}
          />
          { attachement && 
            <div>
              <img src={attachement} style={{width:"100px", height:"100px"}}  alt="menuImg"/>
              <button onClick={onClearAttachment}>취소</button>
            </div>
          }
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
