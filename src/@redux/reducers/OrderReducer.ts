import { OrderAction } from '../actions';
import { Action } from '../Types';
export interface Order {
    orders:Orders[]
}
export interface Orders {
    table_number:string,
    receipt: Buckets[],
    total_price: number,
    receipt_total_price: number,
    state: boolean,
    order_state: boolean,
}
export interface Buckets{
    name: string,
    price: number,
    id: string,
    count: number,
    options:Options_B[],
    item_total_price: number,
    state: boolean,
}
interface Options_B{
    option_groups: Option_B[]
}
interface Option_B{
    option_group_name: string,
    option_list:OptionList[]
}
interface OptionList{
    name: string,
    price: number,
    state: boolean,
};
const initialState:Order ={
    orders:[],
}
const OrderReducer = (state:Order = initialState, action:Action) => {
    switch(action.type) {
        case OrderAction.Types.S_SET_ORDERS:
            return {
                orders:action.payload.orders
            };
        default:
            return state;
    }
};

export default OrderReducer;