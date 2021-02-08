export enum Types {
  SET_GLOBAL_LOADING = '[UI] set global loading',
}

export const setGlobalLoading = (isLoading: boolean) => {
  return {
    type: Types.SET_GLOBAL_LOADING,
    payload: {
      isLoading: isLoading,
    },
  };
};
