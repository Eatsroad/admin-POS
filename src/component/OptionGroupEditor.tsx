import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../@redux";
import "./OptionGroupEditor.scss"
import {StoreAction} from "../@redux/actions";
interface props {
    onChange: () => any;
}

const OptionGroupEditor: React.FC<props> = (props) => {
    const menu = useSelector((state: RootState) => state.Store.menu.optionGroups);
    const [options,setOptions]=useState([{name:'name',price:0}]);
    const [newOptionGroupName,setNewOptionGroupName]=useState('');
    const [newMaxSelect,setNewMaxSelect]= useState(0);
    const dispatch = useDispatch();

    const [newOptionName,setNewOptionName]=useState('');
    const [newOptionPrice,setNewOptionPrice]= useState(0);
    useEffect(()=>{

    },[options])

    const onChangeName = (e: any) => {
        const name = e.target.value;
        setNewOptionName(name);
    };

    const onChangePrice = (e: any) => {
        const newPrice = e.target.value;
        setNewOptionPrice( parseInt(newPrice) );
    };
    const onChangeGroupName = (e: any) => {
        const name = e.target.value;
        setNewOptionGroupName(name);
    };
    const onChangeMaxSelect = (e: any) => {
        const newMaxSelect = e.target.value;
        setNewMaxSelect( parseInt(newMaxSelect) );
    };


    const onSubmitOptionGroup=()=>{
        menu.push({
            name: newOptionGroupName, max_select: newMaxSelect, options: [...options]
        });
        console.log(menu);
        dispatch(
            StoreAction.addOptionGroupFirebase(newOptionGroupName,newMaxSelect,options)
        )
        console.log(menu);
        setNewOptionGroupName('');
        setNewMaxSelect(0);

    }
    return (
        <div className="OptionGroupEditor">
            <div className="OptionGroupDiv">
                <h1>옵션 그룹 이름:</h1>
                <input onChange={onChangeGroupName}/>
                <h1>옵션 최대 수량: </h1>
                <input
                    type="text"
                    onChange={onChangeMaxSelect}
                />
            </div>
            <div className="OptionDiv">
                세부 옵션 입력
                <div>
                    <div className="OptionGroupDiv">
                        <h1>옵션 이름</h1>
                        <input minLength={options.length} onChange={onChangeName}/>
                        <h1>옵션 가격</h1>
                        <input onChange={onChangePrice}/>
                        <button onClick={(e:any)=>{
                            let optionList =options;
                            optionList.push({
                                name:newOptionName,
                                price:newOptionPrice
                            });
                            setOptions(optionList);
                            console.log(options);
                        }}>
                            옵션 추가
                        </button>
                    </div>
                </div>
            </div>
            <div className="AddedOptionsDiv">
                <h2>추가된 세부 옵션 목록</h2>
                {
                    console.log(options)
                }
                {/*

                 options.map 들어갈 곳  ${options.map(name=> {return(<div>{name.name}</div>)})
                */}
            </div>

            <div className="ButtonDiv">
                <button onClick={()=>{onSubmitOptionGroup()}}>저장</button>
            </div>

        </div>
    );
};

export default OptionGroupEditor;
