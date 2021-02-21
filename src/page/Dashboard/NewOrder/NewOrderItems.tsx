import { NewOrders } from '@redux/reducers/OrderReducer';
import React, { useState } from 'react';
import NewOrderItem from './NewOrderItem';
interface Props {
    selectedOrder: NewOrders | undefined;
}

const NewOrderItmes = ({selectedOrder }:Props) => {
    
    return(
        <div className="NewOrderItems">
            {
                selectedOrder?.receipts.map((item:any) => {
                    if(item.state === "주문 완료"){
                        return (
                            <NewOrderItem 
                                name={item.name} 
                                id={item.id}
                                options={item.options} 
                                itemTotalPrice={item.item_total_price} 
                                count={item.count}
                            />
                        );
                    }
                })
            }
        </div>
    );
};

export default NewOrderItmes;