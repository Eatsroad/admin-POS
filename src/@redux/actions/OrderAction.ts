import { ActionCreator } from '../Types';

export enum Types {
    S_SET_ORDERS = '[Orders] set orders',
    C_LOAD_ORDERS = '[Orders] commend load orders',
    C_CHECK_ORDER = '[Orders] commend check orders',
    C_DENY_ORDER_ITEM = '[Orders] commend denu order item',
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

export const checkOrders:ActionCreator = (mode:number, tableId:string, table_number:string, order_time:string) => {
    return {
        type:Types.C_CHECK_ORDER,
        payload:{
            mode:mode,
            tableId:tableId,
            table_number:table_number,
            order_time:order_time
        }
    }
};

export const denyOrderItem:ActionCreator = (cancelList:string[], orderTime:string, table_number:string,) => {
    return {
        type:Types.C_DENY_ORDER_ITEM,
        payload: {
            cancelList:cancelList,
            orderTime:orderTime,
            table_number:table_number,
        }
    };
};
