import { Action } from '@redux/Types';
import { ObserverAction } from '../actions';
export interface Observer {
    checkItemTrigger:boolean;
    initCheckedItems:boolean;
    checkItemButtonState:boolean;
}
const initialState:Observer = {
    checkItemTrigger: false,
    initCheckedItems: false,
    checkItemButtonState: false,
}

const ObserverReducer = (state:Observer = initialState, action:Action) => {
    switch(action.type) {
        case ObserverAction.Types.C_CEHCK_ALL_ITEM_T:
            return {
                ...state,
                checkItemTrigger:true
            }
        case ObserverAction.Types.C_CEHCK_ALL_ITEM_F:
            return {
                ...state,
                checkItemTrigger:false
            }
        case ObserverAction.Types.C_CHECK_BUTTON:
            console.log('click')
            return {
                ...state,
                checkItemButtonState:!state.checkItemButtonState
            }
        case ObserverAction.Types.C_INIT_CHECKED_ITEM:
            return {
                ...state,
                initCheckedItems: !state.initCheckedItems,
            }
        default:
            return state
    }
};
export default ObserverReducer;