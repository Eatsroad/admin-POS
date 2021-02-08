import { UIAction } from '../actions';
import { Action } from '../Types';

interface Notification {
  title: string;
  content: string;
}

export interface UI {
  isGlobalLoading: boolean;
  notificationQueue: Notification[];
}

const initialState: UI = {
  isGlobalLoading: true,
  notificationQueue: [],
};

const UIReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case UIAction.Types.SET_GLOBAL_LOADING:
      return {
        ...state,
        isGlobalLoading: action.payload.isLoading,
      };

    default:
      return state;
  }
};

export default UIReducer;
