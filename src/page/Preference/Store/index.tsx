import React, { useEffect,  } from 'react';
import './index.scss';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux';
import { StoreAction } from '@redux/actions';

interface props {}

const PreferenceStorePage: React.FC<props> = (props) => {
  const storeInfo = useSelector((state: RootState) => state.Store.information);
  // const [attachment, setAttachment] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(StoreAction.loadStoreFirebase());
  }, [dispatch]);
  // const onClearAttachment = () => setAttachment('');
  // const onFileChange = (event: any) => {
  //   const {
  //     target: { files },
  //   } = event;
  //   const theFile = files[0];
  //   const reader = new FileReader();
  //   reader.onload = (finishedEvent:any) => {
  //     const { 
  //       currentTarget: { result },
  //     } = finishedEvent;
  //     setAttachment(result);
  //   }
  //   reader.readAsDataURL(theFile);
  // }
  return (
    <div className="PreferenceStorePage">
      <div className="block">
        <h2>가게 이름</h2>
        <p>{storeInfo.name}</p>
      </div>
      <div className="block">
        <h2>주소</h2>
        <p>{storeInfo.address}</p>
      </div>
      <div className="block">
        <h2>전화번호</h2>
        <p>{storeInfo.phone}</p>
      </div>
      <div className="block">
        <h2>테이블 수</h2>
        <p>{storeInfo.table}</p>
      </div>
      {/* <div>
        <h2>가게 대표 사진</h2>
        {
          storeInfo.store_photo_url === ''
          ?<div></div>
          :<div>
            대표사진이 없습니다. 추가해주세요.
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onFileChange(e)}
            />
            { attachment && 
            <div>
              <img src={attachment} style={{width:"100px", height:"100px"}} alt="menuImg"/>
              <button onClick={onClearAttachment}>취소</button>
            </div>
          }
          </div>
        }
      </div> */}
    </div>
  );
};

export default PreferenceStorePage;
