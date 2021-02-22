import { RootState } from '@redux';
import { CancelMenuAction } from '@redux/actions';
import { Buckets } from '@redux/reducers/OrderReducer';
import numberWithCommas from '@util/addCommaFunc';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface Props {
    item:Buckets;
    index:number;
    length:number;
    id:string
}

const TableViewItem = ({item, index, length, id, }:Props) => {
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
        };
        if(initCheckedItems !== prevInitState) {
            setCheckedState(false);
            setPrevInitState(initCheckedItems);
        };
    }, [checkItemButtonState, initCheckedItems]);
    
    return (
        <div className="TableViewModalContentItem" key={item.name}>
            <div className="TableViewModalContentName">
                <div className="TableViewModalContentCheckBox">
                    {
                        showModalState
                        ? <div className={checkedState?'checked':'none'} onClick={()=>{onChecked()}}/>
                        : <></>
                    }
                    <div>{item.name}</div>
                </div>
                <div>{numberWithCommas(item.item_total_price)}원</div>
            </div>
            <div className="TableViewModalContentCount">
                <div>수량 : {item.count}개</div>
                <div>{numberWithCommas(item.price)}원</div>
            </div>
            <div className="TableViewModalContentOptions">
                <div>{item.options}</div>
            </div>
            {
                index === length -1? <></>:<div className="TableLine"/>
            }
        </div>
    );
};

export default TableViewItem;