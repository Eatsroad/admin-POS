import React from 'react';
import './index.scss';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux';
import AddCategoryModal from './AddCategoryModal';
import {useState} from 'react';
import './index.scss';
import {StoreAction} from "../../../../@redux/actions";

interface props {}

interface CategoryProps {
  name: string;
  description: string;
  index:number;
}

// const Category = (props: CategoryProps) => {
//   return (
//     <div className="CategoryTile">
//       <h3>{props.name}</h3>
//       <p>{props.description}</p>
//     </div>
//   );
// };

// const Categories: React.FC<props> = (props) => {
//   const categories = useSelector(
//     (state: RootState) => state.Store.menu.categories
//   );

//   return (
//     <div className="CategoryPreference">
//       <div className="header">
//         <h3>카테고리 설정</h3>
//         <AddCategoryModal />
//       </div>
//       <div className="CategoryList">
//         {categories.map((e) => {
//           return (
//             <Category name={e.name} description={e.description} key={e.name} />
//           );
//         })}
//       </div>
//     </div>
//   );

const Categories: React.FC<props> = (props) => {

    const Category = (props: CategoryProps) => {
        const [modifyState, setModifyState]=useState(false);
        const [propsName, setPropsName]=useState('');
        const [propsDescription, setPropsDescription]=useState('');
        const [propsIndex, setPropsIndex]=useState(props.index);
        const dispatch = useDispatch();

        const handleOnClickModifyCategory = () => {
            dispatch(
                StoreAction.modifyCategoryFireBase(propsName, propsDescription,propsIndex)
            );
            setPropsName('');
            setPropsDescription('');
        };
        const handleOnClickDeleteCategory = () => {
            dispatch(
                StoreAction.deleteCategoryFireBase(propsName, propsDescription,propsIndex)
            );
            setPropsName('');
            setPropsDescription('');
        };
        return (
            <div className="CategoryTile">
                {
                    (modifyState && props.index === propsIndex)?
                        <div className="modifyState">
                            <input
                                type="text"
                                placeholder="카테고리명"
                                onChange={(e)=>{setPropsName(e.target.value)}}
                                value={propsName}
                            />
                            <input
                                type="text"
                                placeholder="설명"
                                onChange={(e)=>{setPropsDescription(e.target.value)}}
                                value={propsDescription}
                            />
                            <button onClick={()=>{
                                handleOnClickModifyCategory();
                                setModifyState(false);
                            }}>수정 완료</button>
                            <button onClick={()=>{setModifyState(false);}}>취소</button>
                        </div>:
                        <div className="UsualState">
                            <div>
                                <h3>{props.name}</h3>
                                <p>{props.description}</p>
                            </div>
                            <div>
                                <button onClick={()=>{
                                    setModifyState(true);
                                    setPropsIndex(props.index);
                                }}>수정하기</button>
                                <button onClick={()=>{
                                    setPropsIndex(props.index);
                                    handleOnClickDeleteCategory();
                                }}>삭제하기</button>
                            </div>
                        </div>
                }
            </div>
        );
    };
    const categories = useSelector(
        (state: RootState) => state.Store.menu.categories
    );
    return (
        <div className="CategoryPreference">
            <div className="header">
                <h3>카테고리 설정</h3>
                <AddCategoryModal />
            </div>
            <div className="CategoryList">
                {categories.map((e,index) => {
                    return (
                        <Category name={e.name} description={e.description} key={e.name} index={index} />
                    );
                })}
            </div>
        </div>
    );
};

export default Categories;
