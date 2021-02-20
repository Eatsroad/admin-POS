import { NewOrders } from '@redux/reducers/OrderReducer';
import React, { useState } from 'react';
import NewOrderItem from './NewOrderItem';
interface Props {
    selectedOrder: NewOrders | undefined;
    cancleButton: boolean;
}

const NewOrderItmes = ({selectedOrder, cancleButton }:Props) => {
    return(
        <div className="NewOrderItems">
            {
                selectedOrder?.receipts.map((item:any) => {
                    if(!item.state){
                        return (
                            <NewOrderItem 
                                name={item.name} 
                                id={item.id}
                                options={item.options} 
                                itemTotalPrice={item.item_total_price} 
                                count={item.count}
                                cancleButton={cancleButton}
                            />
                        );
                    }
                })
            }
        </div>
    );
};

export default NewOrderItmes;