import { ActionCreator } from "../Types";

export enum Types {
  SET_GLOBAL_LOADING = '[UI] set global loading',
  S_CANCEL_MODAL = '[UI] set show cancel modal',
  S_COMFIRM_MODAL = '[UI] set show comfirm modal',
  C_CANCEL_DENY  = '[UI] commend cancel deny process',
  S_NEW_ORDER_IN = '[UI] set order count increse',
  S_NEW_ORDER_DE = '[UI] set order count decrese',

}

export const setGlobalLoading = (isLoading: boolean) => {
  return {
    type: Types.SET_GLOBAL_LOADING,
    payload: {
      isLoading: isLoading,
    },
  };
};
export const showCancelModal = (cancelModalState: boolean) => {
  console.log(Types.S_CANCEL_MODAL)
  return {
    type: Types.S_CANCEL_MODAL,
    payload: {
      cancelModalState:cancelModalState
    },
  };
};
export const cancleDeny = () => {
  return {
    type: Types.C_CANCEL_DENY,
    payload: null
  };
};
export const showComfirmModal = (comfirmModalState: boolean) => {
  return {
    type: Types.S_COMFIRM_MODAL,
    payload: {
      comfirmModalState:comfirmModalState
    },
  };
};
export const increseOrderCount: ActionCreator = () => {
  return {
    type:Types.S_NEW_ORDER_IN,
    payload: null
  }
};
export const decreseOrderCount: ActionCreator = () => {
  return {
    type:Types.S_NEW_ORDER_DE,
    payload: null
  }
};
