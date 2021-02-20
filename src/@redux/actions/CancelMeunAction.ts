import { ActionCreator } from '../Types';

export enum Types {
    C_CHECK_ITEM = '[Cancel] commend check for cancel menu',
    S_CANCEL_ITEM_ADD = '[Cancel] set checked item add',
    S_CANCEL_ITEM_DELETE = '[Cancel] set checked item delete',
    Q_CANCEL_ITEM = '[Cancel] query cancel items',
    S_INIT_CHECKED_ITEM = '[Cancel] init checked items',

};

export const checkForCancelItem:ActionCreator = (id:string, state:boolean) => {
    return {
        type:Types.C_CHECK_ITEM,
        payload: {
            id:id,
            state:state
        }
    }
};
export const setCanceledItemAdd:ActionCreator = (id:string) => {
    return {
        type:Types.S_CANCEL_ITEM_ADD,
        payload: {
            id:id
        }
    }
};
export const setCanceledItemDelete:ActionCreator = (id:string) => {
    return {
        type:Types.S_CANCEL_ITEM_DELETE,
        payload: {
            id:id
        }
    }
};
export const updateReceipt:ActionCreator = (tableNumber:string, orderTime:string) => {
    return {
        type:Types.Q_CANCEL_ITEM,
        payload: {
            tableNumber:tableNumber,
            orderTime:orderTime
        }
    }
};
export const initChecked:ActionCreator = () => {
    return {
        type:Types.S_INIT_CHECKED_ITEM,
        payload:null
    }
};