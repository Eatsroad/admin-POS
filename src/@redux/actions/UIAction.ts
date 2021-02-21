export enum Types {
  SET_GLOBAL_LOADING = '[UI] set global loading',
  S_CANCEL_MODAL = '[UI] set show cancel modal',
  S_COMFIRM_MODAL = '[UI] set show comfirm modal',
  C_CANCEL_DENY  = '[UI] commend cancel deny process',

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
  console.log(comfirmModalState,'dfsfasgegsadfa')
  return {
    type: Types.S_COMFIRM_MODAL,
    payload: {
      comfirmModalState:comfirmModalState
    },
  };
};
