/* eslint-disable react-hooks/exhaustive-deps */
import { RootState } from '@redux';
import { CancelMenuAction } from '@redux/actions';
import numberWithCommas from '@util/addCommaFunc';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface Props {
    name: string;
    id:string
    options:any[];
    itemTotalPrice: number;
    count:number;
}

const NewOrderItem = ({name, id,  options, itemTotalPrice, count}:Props) => {
    const { checkItemTrigger, checkItemButtonState, showModalState, initCheckedItems } = useSelector((state:RootState) => ({
        checkItemTrigger:state.Observer.checkItemTrigger,
        checkItemButtonState:state.Observer.checkItemButtonState,
        showModalState:state.UI.cancelModalState,
        initCheckedItems:state.Observer.initCheckedItems
    }));
    const [prevTriggerState, setPrevTriggerState] = useState<boolean>(false);
    const [prevInitState, setPrevInitState] = useState<boolean>(false);
    const [checkedState, setCheckedState] = useState<boolean>(false);
    const dispatch = useDispatch();
    const onChecked = () => {
        if(checkedState) {
            setCheckedState(false);
            dispatch(CancelMenuAction.checkForCancelItem(id, !checkedState));
        } else { 
            setCheckedState(true);
            dispatch(CancelMenuAction.checkForCancelItem(id, !checkedState));
        }
    };
   
    useEffect(() => {
        if(checkItemButtonState !== prevTriggerState) {
            setCheckedState(checkItemTrigger);
            setPrevTriggerState(checkItemTrigger);
            onChecked();
        };
        if(initCheckedItems !== prevInitState) {
            setCheckedState(false);
            setPrevInitState(initCheckedItems);
        };
    }, [checkItemButtonState, initCheckedItems]);
    return (
            <div className="NewOrderItem" key={name}>
                <div className="NewOrderItemName">
                    <div className="NewOrderItemNameCheck">
                        {
                            showModalState
                            ? <div className={checkedState?'checked':'none'} onClick={()=>{onChecked()}}/>
                            : <></>
                        }
                        <div>{name}</div>
                    </div>
                    {/* <div>{options}</div> */}
                </div>
                <div className="NewOrderCountPrice">
                    <div>X{count}</div>
                    <div>{numberWithCommas(itemTotalPrice)}원</div>
                </div>
            </div>
    );
};

export default NewOrderItem;