import { RootState } from '@redux';
import { ObserverAction, UIAction } from '@redux/actions';
import { Action } from '@redux/Types';

interface param {
    dispatch: any;
    getState: () => RootState;
};

export const UIMiddleware = ({dispatch, getState}:param) => (
    next:any
) => (action:Action) => {
    next(action);

    if(UIAction.Types.C_CANCEL_DENY === action.type) {
        dispatch(UIAction.showCancelModal(false));
        dispatch(UIAction.showComfirmModal(false));
        dispatch(ObserverAction.initItemState());
    };
};

export default UIMiddleware;