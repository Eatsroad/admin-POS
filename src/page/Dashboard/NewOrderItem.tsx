import { CancelMenuAction } from '@redux/actions';
import numberWithCommas from '@util/addCommaFunc';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
interface Props {
    name: string;
    id:string
    options:any[];
    itemTotalPrice: number;
    count:number;
    cancleButton:boolean;
}

const NewOrderItem = ({name, id,  options, itemTotalPrice, count, cancleButton}:Props) => {
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

    
    return (
            <div className="NewOrderItem" key={name}>
                <div className="NewOrderItemName">
                    <div className="NewOrderItemNameCheck">
                        {
                            cancleButton
                            ? <div className={checkedState?'checked':'none'} onClick={()=>{onChecked()}}/>
                            : <></>
                        }
                        <div>{name}</div>
                    </div>
                    <div>{options}</div>
                </div>
                <div className="NewOrderCountPrice">
                    <div>X{count}</div>
                    <div>{numberWithCommas(itemTotalPrice)}원</div>
                </div>
            </div>
    );
};

export default NewOrderItem;