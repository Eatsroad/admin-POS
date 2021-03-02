import { OrderAction } from '../actions';
import { Action } from '../Types';
export interface Order {
    orders:Orders[],
    newOrders:NewOrders[]
}
export interface Orders {
    table_number:string,
    table_id:string,
    receipt: Receipt[],
    total_price: number,
    receipt_total_price: number,
    state: boolean,
    order_state: boolean,
    orderAt:string,
}
export interface NewOrders {
    table_number:string,
    table_id:string,
    receipts: Buckets[],
    state: string,
    order_time:string,
}
export interface Receipt {
    order_time:string,
    state:string,
    receipts:Buckets[],
}
export interface Buckets{
    name: string,
    price: number,
    id: string,
    count: number,
    options:Options_B[],
    item_total_price: number,
    state: string,
}
interface Options_B{
    option_groups: Option_B[]
}
interface Option_B{
    name: string,
    maxSelect: number,
    options:OptionList[]
}
interface OptionList{
    name: string,
    price: number,
    state: boolean,
};
const initialState:Order ={
    orders:[],
    newOrders:[],
}
const OrderReducer = (state:Order = initialState, action:Action) => {
    switch(action.type) {
        case OrderAction.Types.S_SET_ORDERS:
            return {
                orders:action.payload.orders,
                newOrders:action.payload.newOrders
            };
        default:
            return state;
    }
};

export default OrderReducer;