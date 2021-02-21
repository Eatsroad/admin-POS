import { ActionCreator } from '../Types';

export enum Types {
    C_CEHCK_ALL_ITEM_T = '[Observer] commend for toggle all item state true',
    C_CEHCK_ALL_ITEM_F = '[Observer] commend for toggle all item state false',
    C_INIT_CHECKED_ITEM = '[Observer] commend for init all item state',
    C_CHECK_BUTTON = '[Observer] commend for check button state'
};

export const triggerCheckAll_T:ActionCreator = () => {
    return {
        type:Types.C_CEHCK_ALL_ITEM_T,
        payload: null
    }
};
export const clickCheckButton:ActionCreator = () => {
    return {
        type:Types.C_CHECK_BUTTON,
        payload: null
    }
};
export const triggerCheckAll_F:ActionCreator = () => {
    return {
        type:Types.C_CEHCK_ALL_ITEM_F,
        payload: null
    }
};
export const triggerIntiChecked:ActionCreator = () => {
    return {
        type:Types.C_INIT_CHECKED_ITEM,
        payload: null
    }
};
export const initItemState:ActionCreator = () => {
    return {
        type:Types.C_INIT_CHECKED_ITEM,
        payload: null
    }
};

