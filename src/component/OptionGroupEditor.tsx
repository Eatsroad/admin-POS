import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../@redux";
import "./OptionGroupEditor.scss"
import {StoreAction} from "../@redux/actions";
interface props {
    setIsModalOpen:(state:boolean) => void
}
interface OptionsType{
    name:string,
    price:number
};
interface newOptionGroup {
    name:string,
    max_select:number,
    options: OptionsType[],
}
const OptionGroupEditor: React.FC<props> = (props) => {
    const { optionGroups, } = useSelector((state: RootState) => ({
        optionGroups: state.Store.menu.optionGroups
    }));
    const [ options, setOptions ] = useState<OptionsType[]>([]);
    const [ newOptionGroupName, setNewOptionGroupName ] = useState<string>('');
    const [ newMaxSelect, setNewMaxSelect ] = useState<number>(0);
    const [ newOptionName, setNewOptionName ] = useState<string>('');
    const [ newOptionPrice, setNewOptionPrice ] = useState<number>(0);

    const dispatch = useDispatch();

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

    const onClickAddNewOption = () => {
        const newOption:OptionsType = {
            name: newOptionName,
            price: newOptionPrice
        };
        setOptions((prev:OptionsType[]) => [...prev, newOption]);
        setNewOptionName('');
        setNewOptionPrice(0);
    };

    const onSubmitOptionGroup=()=>{
        props.setIsModalOpen(false);
        const optionGroupObj:newOptionGroup = {
            name: newOptionGroupName,
            max_select: newMaxSelect,
            options: options
        }
        dispatch(
            StoreAction.addOptionGroupFirebase(optionGroupObj)
        )
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
                        <input minLength={options?.length} onChange={onChangeName}/>
                        <h1>옵션 가격</h1>
                        <input onChange={onChangePrice}/>
                        <button onClick={onClickAddNewOption}>
                            옵션 추가
                        </button>
                    </div>
                </div>
            </div>
            <div className="AddedOptionsDiv">
                <h2>추가된 세부 옵션 목록</h2>
                {
                    options?.map((option) => {
                        return(
                            <div key={option.name}>
                                <div>{option.name}{option.price}</div>
                                {/* <div></div> */}
                            </div>
                        )
                    })
                }
            </div>

            <div className="ButtonDiv">
                <button onClick={()=>{onSubmitOptionGroup()}}>저장</button>
            </div>

        </div>
    );
};

export default OptionGroupEditor;
