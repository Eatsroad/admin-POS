import { CancelMenuAction } from '../actions';
import { Action } from '../Types';

export interface CheckedItem {
    checkedItem:string[],
};
const initialState: CheckedItem = {
    checkedItem: []
};
const CancelMenuReducer = (state:CheckedItem = initialState, action:Action) => {
    switch(action.type) {
        case CancelMenuAction.Types.S_CANCEL_ITEM_ADD:
            return {
                checkedItem:[...state.checkedItem, action.payload.id],
            }
        case CancelMenuAction.Types.S_CANCEL_ITEM_DELETE:
            const tmpObj = state.checkedItem.filter((id) => id !== action.payload.id);
            return {
                checkedItem:tmpObj
            }
        case CancelMenuAction.Types.S_INIT_CHECKED_ITEM:
            return {
                checkedItem:[]
            }
        default :
            return state;
    }
};

export default CancelMenuReducer;