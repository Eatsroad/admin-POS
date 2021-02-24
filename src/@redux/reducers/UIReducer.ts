import { UIAction } from '../actions';
import { Action } from '../Types';

interface Notification {
  title: string;
  content: string;
}

export interface UI {
  isGlobalLoading: boolean;
  notificationQueue: Notification[];
  comfirmModalState:boolean
  cancelModalState:boolean
  orderCount:number
}

const initialState: UI = {
  isGlobalLoading: true,
  notificationQueue: [],
  comfirmModalState: false,
  cancelModalState: false,
  orderCount:0
};

const UIReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case UIAction.Types.SET_GLOBAL_LOADING:
      return {
        ...state,
        isGlobalLoading: action.payload.isLoading,
      };
    case UIAction.Types.S_CANCEL_MODAL:
      return {
        ...state,
        cancelModalState:action.payload.cancelModalState
      }
    case UIAction.Types.S_COMFIRM_MODAL:
      console.log(UIAction.Types.S_COMFIRM_MODAL);
      return {
        ...state,
        comfirmModalState:action.payload.comfirmModalState
      }
    default:
      return state;
  }
};

export default UIReducer;
