import { ActionCreator } from '../Types';

export enum Types {
    C_CHECK_ITEM = '[Cancel] commend check for cancel menu',
    C_CHECK_ITEM_TABLE = '[Cancel] commend check for cancel table menu',
    S_CANCEL_ITEM_ADD = '[Cancel] set checked item add',
    S_TABLE_CANCEL_ITEM_ADD = '[Cancel] set checked table item add',
    S_CANCEL_ITEM_DELETE = '[Cancel] set checked item delete',
    S_TABLE_CANCEL_ITEM_DELETE = '[Cancel] set checked table item delete',
    Q_CANCEL_ITEM = '[Cancel] query cancel items',
    Q_CANCEL_ITEM_TABLE = '[Cancel] query cancel table items',
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
export const checkForCancelTableItem:ActionCreator = (id:string, state:boolean) => {
    return {
        type:Types.C_CHECK_ITEM_TABLE,
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
            id:id,
            
        }
    }
};
export const setTableCanceledItemAdd:ActionCreator = (id:string, orderTime:string) => {
    console.log(Types.S_TABLE_CANCEL_ITEM_ADD)
    return {
        type:Types.S_TABLE_CANCEL_ITEM_ADD,
        payload: {
            id:id,
            orderTime:orderTime,
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
export const setTableCanceledItemDelete:ActionCreator = (id:string, orderTime:string) => {
    return {
        type:Types.S_TABLE_CANCEL_ITEM_DELETE,
        payload: {
            id:id,
            orderTime:orderTime,
        }
    }
};
export const updateTableReceipt:ActionCreator = (tableId:string, tableNumber:string) => {
    return {
        type:Types.Q_CANCEL_ITEM_TABLE,
        payload: {
            tableId:tableId,
            tableNumber:tableNumber,
        }
    }
};
export const updateReceipt:ActionCreator = (tableId:string, orderTime:string, tableNumber:string) => {
    return {
        type:Types.Q_CANCEL_ITEM,
        payload: {
            tableId:tableId,
            orderTime:orderTime,
            tableNumber:tableNumber,
        }
    }
};
export const initChecked:ActionCreator = () => {
    return {
        type:Types.S_INIT_CHECKED_ITEM,
        payload:null
    }
};