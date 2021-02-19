import { ActionCreator } from '../Types';

export enum Types {
    S_SET_ORDERS = '[Orders] set orders',
    C_LOAD_ORDERS = '[Orders] commend load orders',
    C_CHECK_ORDER = '[Orders] commens check orders',
};

export const loadOrders: ActionCreator = (storeId: string) => {
    return {
        type:Types.C_LOAD_ORDERS,
        payload:{
            storeId:storeId
        }
    }
};
export const setOrders: ActionCreator = (orders, newOrders) => {
    return {
        type:Types.S_SET_ORDERS,
        payload:{
            orders:orders,
            newOrders:newOrders
        }
    }
};

export const checkOrders:ActionCreator = (mode:number, orderId:string, table_number:string, order_time:string) => {
    return {
        type:Types.C_CHECK_ORDER,
        payload:{
            mode:mode,
            orderId:orderId,
            table_number:table_number,
            order_time:order_time
        }
    }
};