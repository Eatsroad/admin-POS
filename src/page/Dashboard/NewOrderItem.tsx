import numberWithCommas from '@util/addCommaFunc';
import React, { useState } from 'react';
interface Props {
    name: string;
    options:any[];
    itemTotalPrice: number;
    count:number;
    cancleButton:boolean;
}

const NewOrderItem = ({name, options, itemTotalPrice, count, cancleButton}:Props) => {
    const [checkedState, setCheckedState] = useState<boolean>(false);
    return (
            <div className="NewOrderItem" key={name}>
                
                <div className="NewOrderItemName">
                    <div className="NewOrderItemNameCheck">
                        {
                            cancleButton
                            ? 
                                <div className={checkedState?'checked':'none'} onClick={()=>setCheckedState(!checkedState)}>
                                </div>
                            :<></>
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