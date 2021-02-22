import StateManager from 'react-select';
import { CancelMenuAction } from '../actions';
import { Action } from '../Types';

export interface CheckedItem {
    checkedItem:string[],
    checkedTableItem:TableChecked[]
};
interface TableChecked {
    id:string,
    orderTime:string
}
const initialState: CheckedItem = {
    checkedItem: [],
    checkedTableItem: []
};
const CancelMenuReducer = (state:CheckedItem = initialState, action:Action) => {
    switch(action.type) {
        case CancelMenuAction.Types.S_CANCEL_ITEM_ADD:
            return {
                ...state,
                checkedItem:[...state.checkedItem, action.payload.id],
            }
        case CancelMenuAction.Types.S_CANCEL_ITEM_DELETE:
            return {
                ...state,
                checkedItem:state.checkedItem.filter((id) => id !== action.payload.id)
            }
        case CancelMenuAction.Types.S_INIT_CHECKED_ITEM:
            return {
                checkedItem:[],
                checkedTableItem:[]
            }
        case CancelMenuAction.Types.S_TABLE_CANCEL_ITEM_ADD:
            console.log(action.payload)
            return {
                ...state,
                checkedTableItem:[...state.checkedTableItem, action.payload]
            }
        case CancelMenuAction.Types.S_TABLE_CANCEL_ITEM_DELETE:
            return {
                ...state,
                checkedTableItem:state.checkedTableItem.filter((item) => item.id !== action.payload.id && item.orderTime !== action.payload.orderTime)
            }
        default :
            return state;
    }
};

export default CancelMenuReducer;